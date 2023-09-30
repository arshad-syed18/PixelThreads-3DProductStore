import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const CustomButton = ({ type, title, customStyles, handleClick }) => {
    const snap = useSnapshot(state)
    const generateStyles = (type) => {
        if (type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: '#fff'
            }
        }
    }

    return (
        <button
            className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
            style={generateStyles(type)}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}


export default CustomButton