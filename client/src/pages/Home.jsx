import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import {
    headContainerAnimation,
    headTextAnimation,
    headContentAnimation,
    slideAnimation
} from '../config/motion'
import state from '../store'
import { CustomButton } from '../components'
import { logo } from '../assets'

const Home = () => {
    // test commit check
    const snap = useSnapshot(state)
    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header className='flex' {...slideAnimation('down')}>
                        <img src={logo} alt='logo' className='w-8 h-8 object-contain mr-4' />
                        <div className='flex flex-col gap-1 mt-[-5px]'>
                            <h1 className='font-bold tracking-wider text-4xl text-gray-800 '>PixelThreads</h1>
                        </div>
                    </motion.header>
                    <motion.div className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                CREATE <br className='xl:block hidden' /> MAGIC.
                            </h1>
                        </motion.div>
                        <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                            <p className='max-w-md font-normal text-gray-600 text-base'>
                                <strong className='text-gray-700 text-center'>Design. Express. Impress. </strong>{" "}
                                Discover endless possibilities with our new 3D Customization tool.
                                Unleash your imagination and tailor your fashion to reflect your individuality."
                            </p>

                            <CustomButton
                                type="filled"
                                title="Customize"
                                handleClick={() => state.intro = false}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm "
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home