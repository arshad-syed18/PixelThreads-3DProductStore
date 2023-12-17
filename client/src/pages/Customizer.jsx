import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes, modelTabs } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, MouseMovement, Tab } from '../components';


const Customizer = ({ mouseMovement, handleMouseMove }) => {
    const snap = useSnapshot(state);
    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });
    // Use same key name as set in modelTabs in constants
    const [activeModelTab, setActiveModelTab] = useState({
        tshirt: true,
        poloShirt: false,
    });

    //show tab content based on active tab
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />;
            case "aipicker":
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />;
            case "mouseMovement":
                return <MouseMovement
                    mouseMovement={mouseMovement}
                    handleMouseSubmit={handleMouseSubmit}
                />;
            default:
                return null;
        }
    }
    const handleMouseSubmit = () => {
        handleMouseMove();
        setActiveEditorTab("");
    }
    const handleSubmit = async (type) => {
        if (prompt === '') return alert('Please enter a prompt');

        try {
            setGeneratingImg(true);

            const response = await fetch(config.production.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            })

            if (response) {
                const data = await response.json();
                const imageData = data.photo.images[0];
                handleDecals(type, `data:image/png;base64,${imageData}`)
            }

        } catch (error) {
            alert(error)
        } finally {
            setGeneratingImg(false)
            setActiveEditorTab("")
        }
    }
    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        // set decal type
        state[decalType.stateProperty] = result

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }
    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName]
                break;
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName]
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }
        // set active filter tab 
        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }
    const readFile = (type) => {
        reader(file)
            .then((res) => {
                handleDecals(type, res)
                setActiveEditorTab("")
            })
    }

    const handleChangeModel = (model) => {
        setActiveModelTab({
            ...Object.fromEntries(Object.keys(activeModelTab).map(name => [name, name === model])),
        });
        state.model = model; // set model in canvas index
    }

    const handleFeedbackClick = () => {
        window.open("https://forms.gle/Uod1AUuB53vWhpqH6", "_blank")
    }

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className='absolute top-0 left-0 z-10'
                        {...slideAnimation("left")}
                    >
                        <div className='flex items-center min-h-screen'>
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map((tab, index) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => {
                                            if (activeEditorTab === tab.name) return setActiveEditorTab("")
                                            else setActiveEditorTab(tab.name)
                                        }}
                                        helperText={tab.helperText}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className='absolute z-10 top-5 left-5' {...fadeAnimation}>
                        <CustomButton
                            type="filled"
                            title="Feedback"
                            handleClick={handleFeedbackClick}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                    <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                        <CustomButton
                            type="filled"
                            title="Go Back"
                            handleClick={() => state.intro = true}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                    <motion.div className='filtertabs-container' {...slideAnimation("up")}>
                        {FilterTabs.map((tab, index) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                                helperText={tab.helperText}
                            />
                        ))}
                        <button className='download-btn' onClick={downloadCanvasToImage}>
                            <img src={download} alt="download" className='w-3/5 h-3/5 object-contain' />
                        </button>
                    </motion.div>
                    <motion.div
                        key="modelsAI"
                        className='absolute top-0 right-0 z-10'
                        {...slideAnimation("right")}
                    >
                        <div className='flex items-center min-h-screen'>
                            <div className='modeltabs-container tabs'>
                                <p className='text-sm text-gray-500 my-[-5px]'>Models</p>
                                {modelTabs.map((tab, index) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => handleChangeModel(tab.name)}
                                        helperText={tab.helperText}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer