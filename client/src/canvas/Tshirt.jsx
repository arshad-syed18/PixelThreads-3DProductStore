import React, { useRef } from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

export function Tshirt() {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/tshirt/source/tshirt.glb')
  materials['Polo Shirt'].map = null;
  materials['Button'].color = { r: 0, g: 0, b: 0 };

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => easing.dampC(materials['Polo Shirt'].color, snap.color, 0.25, delta));

  return (
    <group position={[0, 0.04, -0.0024]} key="poloShirt">
      <mesh
        castShadow
        geometry={nodes.default002.geometry}
        material={materials['Polo Shirt']}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
            opacity={0}
            depthTest={true} // or false, depending on your needs
            depthWrite={true} // or false, depending on your needs
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0.09, 0.14, 0.1]}
            rotation={[0, 0, 0]}
            scale={0.05}
            map={logoTexture}
            mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
      <mesh geometry={nodes.default002_1.geometry} material={materials.Button} />
    </group>
  )
}


