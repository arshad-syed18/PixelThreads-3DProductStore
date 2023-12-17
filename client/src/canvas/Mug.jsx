import React, { useRef } from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export function Mug() {

  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/mug.glb')
  useFrame((state, delta) => easing.dampC(materials['Material.001'].color, snap.color, 0.25, delta))
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials['Material.001']}
        rotation={[-Math.PI / 2, 0, 1.5]}
        position={[0, -0.2, 0]}
        scale={2}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 1, 0]}
            scale={0.5}
            map={fullTexture}
            depthTest={true} // or false, depending on your needs
            depthWrite={true} // or false, depending on your needs
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[-0.05, 0, 0.08]}
            rotation={[0.08, 1.5, 1.5]}
            scale={0.05}
            map={logoTexture}
            mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

