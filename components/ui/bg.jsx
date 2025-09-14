'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function SplineScene() {
  const { scene } = useGLTF('../chess_♟️.gltf'); // Replace with the path to your GLTF file
  return <primitive object={scene} scale={[1, 1, 1]} />;
}

export default function Background3D() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Push it behind other elements
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <SplineScene />
    </Canvas>
  );
}
