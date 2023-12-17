import React, { useRef } from 'react'
import * as THREE from 'three'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

const Diary = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/low_poly_bookdiary.glb')
    useFrame((state, delta) => easing.dampC(materials['Cover'].color, snap.color, 0.25, delta))
    useFrame((state, delta) => easing.dampC(materials['Join'].color, snap.color, 0.25, delta))
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    return (
        <group dispose={null}>
            <group rotation={[-1.571, 0, 0]} scale={0.1}>
                <group rotation={[Math.PI / 2, 1.5, -1.5]} scale={0.015}>
                    <group position={[0, -11.5, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <group>
                            <mesh
                                geometry={nodes.Cover_Cover_0.geometry}
                                material={materials.Cover}
                            >
                                {snap.isFullTexture && (
                                    <Decal
                                        position={[0, 0, 0]}
                                        rotation={[0, 1, 0]}
                                        scale={3.5}
                                        map={fullTexture}
                                        depthTest={true} // or false, depending on your needs
                                        depthWrite={true} // or false, depending on your needs
                                    />
                                )}
                                {snap.isLogoTexture && (
                                    <Decal
                                        position={[-1, 0.5, -0.01]}
                                        rotation={[0, 0, 1.5]}
                                        scale={[0.7, 0.7, 0.1]} // 0.1 to scaleZ is to prevent overlapping
                                        map={logoTexture}
                                        mapAnisotropy={16}
                                        depthTest={false}
                                        depthWrite={true}
                                    />
                                )}
                            </mesh>
                        </group>
                        <mesh geometry={nodes.Cover_Join_0.geometry} material={materials.Join} >
                            {snap.isFullTexture && (
                                <Decal
                                    position={[0, 0, 0]}
                                    rotation={[0, 1, 0]}
                                    scale={3}
                                    map={fullTexture}
                                    depthTest={true} // or false, depending on your needs
                                    depthWrite={true} // or false, depending on your needs
                                />
                            )}
                        </mesh>
                    </group>
                    <mesh geometry={nodes.Pages_Material_0.geometry} material={materials.Material} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                </group>
            </group>
        </group>
    )
}

export default Diary