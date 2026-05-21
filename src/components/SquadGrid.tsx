'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const squadMembers = [
  {
    name: 'MD SAKHIB',
    role: 'The Speed Demon',
    bio: 'Types faster than you can think. Ships massive features before the coffee even gets cold.',
  },
  {
    name: 'MD MOMIN NAQEE',
    role: 'The Fixer',
    bio: 'You break it, they patch it in three minutes. The literal definition of "it works on my machine"—except they make sure it works everywhere.',
  },
  {
    name: 'MD SUHAIB',
    role: 'The Mastermind',
    bio: 'The big brain of the operation. Turns chaotic 3 AM ideas into flawless reality. Writes pure poetry that computers happen to understand.',
  },
  {
    name: 'MD SAFWAN',
    role: 'The Closer',
    bio: 'The undisputed boss of getting things done. If there\'s a deadline, consider it destroyed. Zero cap, zero excuses, just 100% execution.',
  },
  {
    name: 'MD FAZIL',
    role: 'The Vibe Check',
    bio: 'The main character of the group chat. Keeps the squad energized, teaches the absolute cheat codes to success, and drops wisdom daily.',
  },
];

function TypewriterBio({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isHovered) {
      setDisplayedText('');
      return;
    }

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // Speed of typing

    return () => clearInterval(typingInterval);
  }, [isHovered, text]);

  return (
    <p className="font-mono text-sm md:text-base text-gray-300 min-h-[80px]">
      <span className="text-green-400 mr-2">{'>'}</span>
      {displayedText}
      {isHovered && <span className="animate-pulse bg-white w-2 h-4 inline-block ml-1 align-middle" />}
    </p>
  );
}

export default function SquadGrid() {
  return (
    <section className="min-h-screen py-32 px-4 md:px-10 bg-black relative z-10" id="squad">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase">Meet The<br/><span className="text-vivid-purple">Squad.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {squadMembers.map((member, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isHovered, setIsHovered] = useState(false);
            
            // Make the first 2 cards span exactly as normal, and layout adjust
            // Alternatively, use standard grid. For 5 items, the last 2 will sit nicely on bottom row.
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative rounded-3xl p-[1px] overflow-hidden bg-white/10 hover:bg-gradient-to-r hover:from-neon-cyan hover:to-vivid-purple transition-all duration-500"
              >
                {/* Inner Card content */}
                <div className="h-full w-full rounded-[23px] bg-[#0a0a0a] p-8 flex flex-col justify-between relative z-10 glass-panel">
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-neon-cyan transition-colors duration-300">{member.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300 font-bold">{member.role}</p>
                  </div>
                  
                  <div className="mt-auto bg-black/50 p-4 rounded-xl border border-white/5 h-[140px] md:h-[120px]">
                    {/* Fallback text if not hovered, or just empty space */}
                    {!isHovered ? (
                      <p className="font-mono text-sm text-gray-600"><span className="text-gray-700 mr-2">{'>'}</span>Hover to execute bio.sh...</p>
                    ) : (
                      <TypewriterBio text={member.bio} isHovered={isHovered} />
                    )}
                  </div>
                </div>
                
                {/* Glow effect behind the card */}
                <div className="absolute -inset-10 bg-gradient-to-r from-neon-cyan to-vivid-purple opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
