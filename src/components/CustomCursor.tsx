'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Smooth spring physics for cursor
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look for a specific data attribute to expand cursor
      const projectHover = target.closest('[data-cursor-text]');
      if (projectHover) {
        setHoverText(projectHover.getAttribute('data-cursor-text') || '');
      } else {
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return <div className="hidden" />;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
      }}
      animate={{
        width: hoverText ? 80 : 32,
        height: hoverText ? 80 : 32,
        backgroundColor: hoverText ? 'white' : 'transparent',
        border: hoverText ? 'none' : '1px solid rgba(255,255,255,0.8)',
        x: hoverText ? '-24px' : '0px',
        y: hoverText ? '-24px' : '0px',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="rounded-full w-full h-full flex items-center justify-center"
        animate={{ opacity: hoverText ? 1 : 0 }}
      >
        <span className="text-black text-[10px] font-bold uppercase tracking-wider text-center leading-tight px-2 mix-blend-normal">
          {hoverText}
        </span>
      </motion.div>
      {!hoverText && (
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full mix-blend-difference" />
      )}
    </motion.div>
  );
}
