'use client';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Chief Technology Officer",
    quote: "Fivox Labs completely overhauled our backend infrastructure. The speed and scalability they delivered is unmatched. Truly elite engineers.",
  },
  {
    name: "Priya Patel",
    role: "Head of Product",
    quote: "Working with this squad was a game-changer for our SaaS platform. Their attention to detail and modern architecture approach is brilliant.",
  },
  {
    name: "Vikram Singh",
    role: "Startup Founder",
    quote: "They took our rough MVP and turned it into an enterprise-ready powerhouse in record time. Zero excuses, 100% execution.",
  }
];

export default function Testimonials() {
  return (
    <section id="success" className="py-32 px-4 md:px-10 bg-slate-900 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono text-cyan-400 mb-2 uppercase tracking-widest">// Client Success</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold uppercase text-white">Trust the Output</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 group"
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className="text-4xl text-blue-500 mb-6 font-display group-hover:text-cyan-400 transition-colors"
              >
                "
              </motion.div>
              <p className="text-gray-300 font-sans leading-relaxed mb-8">
                {test.quote}
              </p>
              <div>
                <h4 className="text-white font-bold uppercase tracking-wider">{test.name}</h4>
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mt-1">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
