import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-24 bg-cream text-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-mono text-sm tracking-widest uppercase text-maroon mb-6">[ About Reelywood ]</p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-extrabold text-4xl md:text-5xl lg:text-6xl font-heading mb-6"
          >
            Rooted in <span className="italic">Kolkata.</span> <br/>
            Built for the <span className="italic">World.</span>
          </motion.h2>
          <p className="font-sans font-light text-ink/80 text-lg leading-relaxed mb-6">
            We started with a simple belief: local businesses and D2C brands deserve the same level of creative excellence and technical sophistication as Fortune 500 companies.
          </p>
          <p className="font-sans font-light text-ink/80 text-lg leading-relaxed">
            Today, Reelywood is an AI-first marketing agency bridging the gap between high-end production and automated scale. We build the systems that help you grow, so you can focus on what you do best.
          </p>
        </div>
        <div className="relative aspect-square md:aspect-[4/3] bg-ink rounded-sm overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
            alt="Reelywood Team" 
            className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}
