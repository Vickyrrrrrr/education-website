import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const points = useRef();
  const particleCount = 2000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function RotatingShape() {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2.5, 100, 100]} ref={meshRef}>
        <MeshDistortMaterial
          color="#1e40af"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[3.5, 0.4, 16, 100]} />
        <meshStandardMaterial color="#7c3aed" wireframe />
      </mesh>
    </group>
  );
}

const AnimatedBackgroundPremium = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.8} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
      <ParticleField />
      <RotatingShape />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} enablePan={false} />
    </>
  );
};

export default AnimatedBackgroundPremium;
