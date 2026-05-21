'use client';
import { motion } from 'framer-motion';

export default function Navbar() {
  const openWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-waitlist'));
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      {/* Left: Logo */}
      <div className="flex-1">
        <div className="font-display font-bold text-2xl tracking-widest text-white cursor-pointer hover:text-gray-300 transition-colors inline-block">
          FIVOX<span className="text-cyan-400">.</span>
        </div>
      </div>
      
      {/* Center: Desktop Navigation Links */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-10 font-sans text-sm font-medium text-gray-300">
        <a href="#services" className="relative hover:text-white transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">Services</a>
        <a href="#leadership" className="relative hover:text-white transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">Leadership</a>
        <a href="#success" className="relative hover:text-white transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">Client Success</a>
      </div>
      
      {/* Right: CTA Button */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <button 
          onClick={openWaitlist}
          className="px-6 py-2.5 bg-blue-600 text-white font-sans font-semibold text-sm rounded hover:bg-blue-500 transition-colors duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] hidden sm:block"
        >
          Start a Project
        </button>
      </div>
    </motion.nav>
  );
}
