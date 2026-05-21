'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Lightweight WebGL Data Wave
function DataWave() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1500;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
  }

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      // Create a fluid wave motion
      positions[i * 3 + 1] = Math.sin(time * 0.5 + x) * 0.5 + Math.cos(time * 0.3 + z) * 0.5;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#1d4ed8" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// 2. Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } }
};

// 3. Main Hero Component
export default function EnterpriseHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 border-b border-white/5">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
          <DataWave />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-5xl px-6 text-center mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-block">
          <span className="px-5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-widest uppercase text-gray-300">
            Fivox Labs Enterprise
          </span>
        </motion.div>

        <motion.div 
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } }
          }}
          className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[1.1] mb-8 flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center gap-[0.25em] text-white">
            {"FIVE ON THE TEAM,".split(' ').map((word, i) => (
              <motion.span 
                key={`line1-${i}`} 
                variants={{
                  hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-[0.25em] text-blue-500 mt-1 md:mt-3">
            {"CODING THE DREAM.".split(' ').map((word, i) => (
              <motion.span 
                key={`line2-${i}`} 
                variants={{
                  hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          We engineer scalable web applications, robust SaaS platforms, and elite technical training for forward-thinking enterprises.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#services" className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(29,78,216,0.3)]">
            Explore Services
          </a>
          <a href="#leadership" className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors w-full sm:w-auto">
            Meet the Squad
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
