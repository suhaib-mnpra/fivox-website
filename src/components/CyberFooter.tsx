'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CyberFooter() {
  const [executed, setExecuted] = useState(false);

  useEffect(() => {
    const handleOpen = () => setExecuted(true);
    window.addEventListener('open-waitlist', handleOpen);
    return () => window.removeEventListener('open-waitlist', handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const details = formData.get('details');

    const text = `*New Project Request*\n\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company}\n*Details:* ${details}`;
    const encoded = encodeURIComponent(text);
    // User provided number
    window.open(`https://wa.me/918277555410?text=${encoded}`, '_blank');
    setExecuted(false);
  };

  return (
    <footer id="waitlist-footer" className="relative bg-slate-950 border-t border-white/10 pt-24 pb-12 overflow-hidden z-10">
      
      {/* Enterprise Footer Structure */}
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & CTA */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-3xl tracking-widest text-white mb-6">
              FIVOX<span className="text-cyan-400">.</span>
            </h3>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Architecting the future of digital products. We engineer scalable web applications and robust SaaS platforms for forward-thinking enterprises.
            </p>
            <button
              onClick={() => setExecuted(true)}
              className="px-8 py-3 bg-blue-600 text-white font-sans font-semibold text-sm uppercase rounded hover:bg-blue-500 transition-colors duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              Start a Project
            </button>
          </div>

          {/* Links Grid */}
          <div>
            <h4 className="text-white font-semibold mb-6">Solutions</h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Enterprise Web Dev</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">SaaS Engineering</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Tech Workshops</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Cloud Architecture</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Insights</h4>
            <p className="text-gray-400 text-sm mb-4">
              Insights from the engineering frontline.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-black/50 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-600 w-full rounded-l"
              />
              <button className="bg-white text-black px-4 py-2 text-sm font-semibold rounded-r hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex justify-center items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fivox Labs. All rights reserved.</p>
        </div>
      </div>

      {/* Revealed Waitlist Form Modal */}

      {/* Revealed Waitlist Form */}
      <AnimatePresence>
        {executed && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-4 md:p-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
              className="w-full max-w-xl bg-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5),_0_0_40px_rgba(29,78,216,0.2)] relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={() => setExecuted(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-2xl md:text-4xl font-display font-black uppercase mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                System Online
              </h2>
              <p className="font-mono mb-6 text-xs font-semibold text-cyan-400 tracking-wider uppercase">// Initialize your project</p>
              
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all" required />
                  <input type="email" name="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all" required />
                </div>
                
                <input type="text" name="company" placeholder="Company / Project Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all" required />
                
                <textarea name="details" placeholder="Describe your dream project..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none" required></textarea>
                
                <button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-sans font-bold text-base tracking-wide py-3 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all duration-300">
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
