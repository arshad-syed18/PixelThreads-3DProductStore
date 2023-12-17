import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { easing } from 'maath';
import state from '../store';

const CameraRig = ({ children, rotateWithClick }) => {
    const group = useRef();
    const snap = useSnapshot(state);
    const three = useThree();

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [prevMouseX, setPrevMouseX] = useState(0);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setPrevMouseX(e.clientX);
        updateCursor('grabbing');
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        updateCursor('pointer');
    };

    const handleMouseMove = (e) => {
        if (isMouseDown && rotateWithClick) {
            const deltaX = e.clientX - prevMouseX;
            group.current.rotation.y += deltaX * 0.01;
            setPrevMouseX(e.clientX);
        }
    };

    const updateCursor = (cursor) => {
        three.gl.domElement.style.cursor = cursor;
    };

    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        let targetPosition = [-0.4, 0, 2];
        if (snap.intro) {
            if (isBreakpoint) targetPosition = [0, 0, 2];
            if (isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            if (isMobile) targetPosition = [0, 0, 2.5];
            else targetPosition = [0, 0, 2];
        }

        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    });

    return (
        <group
            ref={group}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
            onClick={() => setIsMouseDown(false)} // Ensure isMouseDown is reset on click
        >
            {children}
        </group>
    );
};

export default CameraRig;
