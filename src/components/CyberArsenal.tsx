'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const services = [
  {
    id: '01',
    title: 'Next-gen Web & App',
    desc: 'Cutting-edge frontend architectures and native mobile applications built for extreme speed and fluid interactions.',
    code: `import { createServer } from 'node:http';\nimport { cluster } from 'cluster';\n\nif (cluster.isPrimary) {\n  for (let i = 0; i < cpus; i++) cluster.fork();\n} else {\n  createServer((req, res) => {\n    res.writeHead(200);\n    res.end('SYSTEM_ONLINE');\n  }).listen(8000);\n}`,
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    color: 'border-cyan-400 text-cyan-400'
  },
  {
    id: '02',
    title: 'Scalable SaaS Products',
    desc: 'Robust cloud-native backends that scale globally from day one, powered by serverless and microservices.',
    code: `import torch\nimport torch.nn as nn\n\nclass Predictor(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.engine = nn.Sequential(\n            nn.Linear(512, 1024),\n            nn.GELU(),\n            nn.Linear(1024, 256)\n        )\n\n    def forward(self, x):\n        return self.engine(x)`,
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    color: 'border-blue-600 text-blue-600'
  },
  {
    id: '03',
    title: 'Elite Tech Workshops',
    desc: 'Intensive, hands-on training for modern stacks. We upgrade your developers to 10x engineering squads.',
    code: `{\n  "manifest_version": 3,\n  "name": "Fivox Core",\n  "version": "1.0",\n  "permissions": [\n    "activeTab",\n    "storage",\n    "scripting"\n  ],\n  "background": {\n    "service_worker": "bg.js"\n  }\n}`,
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    color: 'border-blue-400 text-blue-400'
  }
];

export default function CyberArsenal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const scroll = scrollRef.current;
    if (!section || !scroll) return;

    let ctx = gsap.context(() => {
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
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="h-screen w-full bg-cyber-obsidian overflow-hidden border-t border-b border-white/5 relative z-10">
      
      <div className="absolute top-10 md:top-20 left-10 md:left-20 z-20">
        <h2 className="text-sm font-mono text-cyber-gray mb-2">// CAPABILITIES</h2>
        <h3 className="text-4xl md:text-6xl font-display font-bold uppercase text-white">The Tech Arsenal</h3>
      </div>

      <div ref={scrollRef} className="flex gap-10 md:gap-20 px-[10vw] md:px-[20vw] items-center h-full pt-20">
        {services.map((svc) => (
          <ServiceCard key={svc.id} svc={svc} />
        ))}
      </div>

    </section>
  );
}

function ServiceCard({ svc }: { svc: typeof services[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative w-[85vw] md:w-[50vw] lg:w-[40vw] h-[60vh] flex-shrink-0 border border-white/10 bg-black/80 backdrop-blur-md overflow-hidden group transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image Layer */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${hovered ? 'scale-110 opacity-60' : 'scale-100 opacity-20 filter grayscale blur-sm'}`}
        style={{ backgroundImage: `url(${svc.img})` }}
      />

      {/* Background Code Scroller Overlay */}
      <div className={`absolute inset-0 p-8 font-mono text-xs opacity-0 transition-opacity duration-500 z-[5] mix-blend-overlay ${hovered ? 'opacity-20' : ''}`}>
        <pre className={`${svc.color.split(' ')[1]} overflow-hidden h-full`}>
          {svc.code.repeat(10)}
        </pre>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between z-10 bg-gradient-to-t from-black via-black/60 to-transparent">
        <div className={`font-mono text-4xl ${svc.color.split(' ')[1]}`}>
          {svc.id}
        </div>
        
        <div>
          <h4 className="text-3xl font-display font-bold uppercase mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-white transition-all">
            {svc.title}
          </h4>
          <p className="font-mono text-sm text-gray-200 mt-2">
            {svc.desc}
          </p>
        </div>
      </div>
      
      {/* Top Border Accent */}
      <div className={`absolute top-0 left-0 w-full h-1 border-t ${svc.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
}
