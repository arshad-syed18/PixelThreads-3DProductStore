import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import state from '../store'

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);
    // model rotation
    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        //set initial position 

        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        )
    })


    return (
        <group ref={group}>
            {children}
        </group>
    )
}

export default CameraRig