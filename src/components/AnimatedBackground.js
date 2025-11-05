import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const AnimatedBackground = () => {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005;
      meshRef.current.rotation.y += 0.001;
      meshRef.current.position.z = Math.sin(Date.now() * 0.0005) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 4]} />
        <meshPhongMaterial
          color="#0064c8"
          wireframe={false}
          emissive="#0048a0"
          shininess={100}
        />
      </mesh>
    </>
  );
};

export default AnimatedBackground;
