import React from 'react';
import { motion } from 'framer-motion';

export default function AboutStats() {
  const stats = [
    { value: "500+", label: "Reels produced" },
    { value: "3.2x", label: "Avg. reach lift" },
    { value: "120+", label: "Businesses served" },
    { value: "98%", label: "Client satisfaction" }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F3EEE2] text-[#14110C] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#7A2A2A]" />
              <span className="text-[#7A2A2A] font-mono text-sm tracking-widest uppercase font-semibold">Our Mission</span>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-heading leading-tight mb-8"
            >
              We engineer predictable growth through AIGC and automated systems.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#8C877A] text-lg md:text-xl leading-relaxed"
            >
              Rooted in Kolkata, West Bengal, we saw a gap between global creative standards and the tools available to regional businesses. Reelywood bridges that gap. By combining high-end editorial storytelling with scalable AI production and business automation SaaS, we transform how D2C brands, restaurants, and retail shops scale.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="border-l border-[#8C877A]/30 pl-6"
              >
                <div className="text-4xl md:text-5xl font-mono text-[#7A2A2A] mb-3">{stat.value}</div>
                <div className="text-sm font-mono text-[#8C877A] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
