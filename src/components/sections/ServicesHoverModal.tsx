import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: "Brand Strategy",
    description: "Positioning, messaging, and visual identity.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Digital Products",
    description: "Web apps, mobile apps, and enterprise software.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Performance Marketing",
    description: "Data-driven campaigns that scale revenue.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "AI Automation",
    description: "Custom AI workflows and internal tools.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
  }
];

export default function ServicesHoverModal() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="py-24 bg-background text-foreground overflow-hidden border-b border-border" onMouseMove={handleMouseMove}>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-semibold text-foreground mb-4 uppercase tracking-widest">
            Expertise
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">Our Services</h2>
          <p className="text-foreground/70 max-w-xl font-bold text-lg">
            Comprehensive creative and technical capabilities to drive your business forward.
          </p>
        </div>

        <div className="flex flex-col border-t border-border">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="py-12 border-b border-border flex flex-col md:flex-row md:items-center justify-between group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight group-hover:text-primary/70 transition-colors">
                {service.title}
              </h3>
              <p className="text-foreground/60 text-lg md:text-xl font-medium mt-4 md:mt-0 max-w-md md:text-right transition-transform duration-300 md:group-hover:-translate-x-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Image Reveal */}
      <AnimatePresence>
        {hoveredIdx !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed pointer-events-none z-50 w-72 h-96 rounded-2xl overflow-hidden shadow-2xl hidden md:block"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              x: "-50%",
              y: "-50%"
            }}
          >
            <img 
              src={services[hoveredIdx].image} 
              alt={services[hoveredIdx].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
