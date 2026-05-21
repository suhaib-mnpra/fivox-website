'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const text = textRef.current;

    if (!footer || !text) return;

    const ctx = gsap.context(() => {
      // Animate the stroke-width or a clip-path mask to "fill" the text
      gsap.to(text, {
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
        className: 'text-[12vw] font-display font-black leading-none text-stroke-fill',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative h-screen bg-black flex flex-col justify-end pb-10 overflow-hidden z-10 border-t border-white/10">
      
      <div className="px-10 md:px-20 mb-20 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">Ready to break<br/>the speed limit?</h3>
          <p className="text-gray-400 font-sans max-w-sm mb-8">Join the waitlist and let's build the future together.</p>
          <a href="mailto:hello@fivoxlabs.com" data-cursor-text="EMAIL US" className="text-white border-b-2 border-neon-cyan pb-1 text-xl font-bold uppercase tracking-widest hover:text-neon-cyan transition-colors">
            hello@fivoxlabs.com
          </a>
        </div>
        
        <div className="flex gap-8">
          {['Twitter', 'GitHub', 'Discord', 'LinkedIn'].map((social) => (
            <a key={social} href="#" data-cursor-text="OPEN" className="text-gray-500 hover:text-white transition-colors font-mono text-sm uppercase">
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* Massive Stroke Text */}
      <div className="w-full flex justify-center px-4 overflow-hidden select-none">
        <h1 
          ref={textRef} 
          className="text-[12vw] font-display font-black leading-none text-stroke whitespace-nowrap"
        >
          LET'S BUILD
        </h1>
      </div>
      
    </footer>
  );
}
