'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = time * 0.1;
    }
    
    // Make it react slightly to mouse
    if (materialRef.current) {
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        0.4 + (Math.abs(mouseX) + Math.abs(mouseY)) * 0.2,
        0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#1e1b4b" // Deep indigo base
          emissive="#8a2be2" // Vivid purple glow
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00f0ff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#ff007f" />
        <Blob />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
