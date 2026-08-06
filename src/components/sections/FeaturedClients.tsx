import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  "L'ORÉAL", "NIKE", "SPOTIFY", "SAMSUNG", "NETFLIX", "AIRBNB", "VOGUE", "GQ"
];

export default function FeaturedClients() {
  return (
    <section className="py-20 bg-cream text-ink relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-3xl md:font-heading text-4xl font-heading">Worked With</h2>
        <p className="font-mono text-sm tracking-widest uppercase text-ink/60">[ Selected Partners ]</p>
      </div>
      
      {/* Infinite Marquee with Framer Motion */}
      <div className="relative flex overflow-x-hidden border-y border-ink/10 py-10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="whitespace-nowrap flex items-center gap-24 px-12 min-w-max"
        >
          {clients.concat(clients, clients).map((client, i) => (
            <div key={i} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
              <span className="text-3xl md:text-4xl font-heading font-medium tracking-tight">{client}</span>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Fades for Marquee */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent"></div>
      </div>
    </section>
  );
}
