'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { id: 1, title: 'Project Alpha', category: 'SaaS Platform', color: 'from-blue-600 to-cyan-500' },
  { id: 2, title: 'Project Beta', category: 'Web3 Dashboard', color: 'from-purple-600 to-pink-500' },
  { id: 3, title: 'Project Gamma', category: 'E-Commerce', color: 'from-orange-500 to-red-500' },
  { id: 4, title: 'Project Delta', category: 'AI Interface', color: 'from-green-500 to-emerald-400' },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.1;
    const y = (clientY - top - height / 2) * 0.1;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX: useMotionTemplate`${mouseY}deg`,
        rotateY: useMotionTemplate`${mouseX}deg`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="VIEW PROJECT"
      className={`relative w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh] rounded-3xl overflow-hidden flex-shrink-0 cursor-none transform-style-3d bg-gradient-to-br ${project.color} p-10 flex flex-col justify-end glass-panel group`}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-0" />
      <div className="relative z-10 transform translate-z-12 transition-transform duration-500 group-hover:translate-z-20">
        <p className="text-white/70 font-sans font-medium mb-2 uppercase tracking-widest">{project.category}</p>
        <h3 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">{project.title}</h3>
      </div>
    </motion.div>
  );
}

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;

    if (!section || !scroll) return;

    let ctx = gsap.context(() => {
      // Get the width we need to translate by
      const scrollWidth = scroll.scrollWidth - window.innerWidth;

      gsap.to(scroll, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true, // Recalculates on resize
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-black flex items-center overflow-hidden">
      <div className="absolute top-10 left-10 md:top-20 md:left-20 z-10">
        <h2 className="text-4xl md:text-6xl font-display font-bold">Selected<br/><span className="text-neon-cyan">Work.</span></h2>
      </div>
      <div ref={scrollRef} className="flex gap-10 md:gap-20 px-[10vw] md:px-[20vw] items-center h-full pt-20">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
