import React from 'react'
import CustomButton from './CustomButton'

const MouseMovement = ({ mouseMovement, handleMouseSubmit }) => {

    return (
        <div className='mousemovement-container'>
            <p className='text-sm text-gray-500 my-[-5px]'>Use your mouse to move the product horizontally</p>
            <CustomButton
                type="filled"
                title={mouseMovement ? "Disable" : "Enable"}
                handleClick={handleMouseSubmit}
                customStyles="font-bold text-sm"
            />

        </div>
    )
}

export default MouseMovement