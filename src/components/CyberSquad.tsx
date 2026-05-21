'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const crew = [
  {
    name: 'MD SUHAIB',
    role: 'The Mastermind',
    bio: 'Turns chaotic 3 AM ideas into flawless logic.',
    img: '/squad/suhaib.jpeg',
    color: 'var(--color-cyan-400)'
  },
  {
    name: 'MD SAFWAN',
    role: 'The Visionary',
    bio: 'Zero excuses, just 100% execution.',
    img: '/squad/safwan.jpeg',
    color: 'var(--color-blue-600)'
  },
  {
    name: 'MD FAZIL',
    role: 'The Strategist',
    bio: 'The main character of the group chat. Trust the squad, bhai.',
    img: '/squad/fazil.jpeg',
    color: 'var(--color-cyan-400)'
  },
  {
    name: 'MD SAKHIB',
    role: 'The Architect',
    bio: 'Ships massive features before the coffee gets cold.',
    img: '/squad/sakhib.jpeg',
    color: 'var(--color-blue-600)'
  },
  {
    name: 'MD MOMIN NAQEE',
    role: 'The Specialist',
    bio: 'You break it, they patch it in three minutes.',
    img: '/squad/momin.jpeg',
    color: 'var(--color-cyan-400)'
  }
];

function TerminalBio({ text, hovered, color }: { text: string, hovered: boolean, color: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!hovered) {
      setDisplayedText('');
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 20); // very fast typing

    return () => clearInterval(interval);
  }, [hovered, text]);

  return (
    <div className="font-mono text-sm mt-4 min-h-[60px]" style={{ color }}>
      <span className="opacity-50 mr-2">{'>'}</span>
      {displayedText}
      {hovered && <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />}
    </div>
  );
}

export default function CyberSquad() {
  return (
    <section id="leadership" className="py-32 px-4 md:px-10 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-cyber-gray mb-2">// PERSONNEL</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold uppercase text-white">The Squad</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {crew.map((member, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [hovered, setHovered] = useState(false);

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="terminal-window p-4 relative group"
              >
                {/* 1:1 Aspect Ratio Profile Image */}
                <div className="w-full aspect-square mb-6 overflow-hidden border border-white/10 relative glitch-hover bg-black">
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${hovered ? 'scale-110 filter grayscale-0' : 'filter grayscale blur-[1px]'}`}
                    style={{ backgroundImage: `url(${member.img})` }}
                  />
                  {/* CSS Glitch overlay triggers on hover via global css */}
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-display font-bold text-xl uppercase tracking-wide text-white mb-1">
                    {member.name}
                  </h4>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: member.color }}>
                    [{member.role}]
                  </div>
                  
                  {/* Typed Bio */}
                  <TerminalBio text={member.bio} hovered={hovered} color={member.color} />
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
