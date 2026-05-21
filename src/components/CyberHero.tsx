'use client';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --- WebGL Particle System ---
function ParticleMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create 5000 random particles
  const count = 5000;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPrimary = new THREE.Color('#00ffff'); // cyan
    const colorSecondary = new THREE.Color('#ff00ff'); // magenta
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const mixColor = Math.random() > 0.5 ? colorPrimary : colorSecondary;
      col[i * 3] = mixColor.r;
      col[i * 3 + 1] = mixColor.g;
      col[i * 3 + 2] = mixColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 2;
    const mouseY = state.pointer.y * 2;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;

    // Mouse attraction on position
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouseX, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouseY, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- Component ---
export default function CyberHero() {
  const [booting, setBooting] = useState(true);
  const [terminalText, setTerminalText] = useState('> INIT SYSTEM...');

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600));
      setTerminalText('> LOAD KERNEL [OK]');
      await new Promise(r => setTimeout(r, 400));
      setTerminalText('> MOUNT SHADERS [OK]');
      await new Promise(r => setTimeout(r, 300));
      setTerminalText('> EXECUTE FIVOX.EXE');
      await new Promise(r => setTimeout(r, 500));
      setBooting(false);
    };
    sequence();
  }, []);

  return (
    <section className="relative h-screen w-full bg-cyber-obsidian overflow-hidden">
      
      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {booting && (
          <motion.div 
            key="booting"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <p className="font-mono text-cyber-green text-xl md:text-2xl animate-pulse">
              {terminalText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ParticleMesh />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: booting ? 0 : 1, y: booting ? 20 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4"
      >
        <div className="terminal-window p-8 md:p-12 max-w-4xl w-full flex flex-col items-center text-center pointer-events-auto">
          <div className="w-full flex items-center gap-2 mb-8 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 font-mono text-xs text-cyber-cyan">FIVOX_CORE_V1.0.0</div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase leading-tight mb-6 tracking-tighter">
            Five on the team,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-green glitch-hover inline-block">
              Coding the Dream.
            </span>
          </h1>
          
          <button className="mt-8 font-mono text-lg md:text-xl px-8 py-4 bg-transparent border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-colors duration-200 group relative">
            <span className="relative z-10">Initialize_Project [Enter]</span>
            <span className="animate-ping absolute inset-0 border border-cyber-green opacity-0 group-hover:opacity-50"></span>
          </button>
        </div>
      </motion.div>

    </section>
  );
}
