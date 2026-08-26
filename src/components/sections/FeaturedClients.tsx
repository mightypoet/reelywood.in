import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  "PUMA", "boAt", "zepto", "mamaearth", "CRED", "Jio", "lenskart"
];

export default function FeaturedClients() {
  return (
    <section className="py-12 bg-background relative z-10 -mt-16 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto bg-[#4a2484] rounded-full p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[inset_0_-4px_0_rgba(0,0,0,0.15),_0_10px_20px_rgba(0,0,0,0.2)] text-white">
        
        <div className="flex-shrink-0 flex items-center gap-4 px-6 md:border-r border-white/20">
          <p className="text-sm font-medium leading-tight text-white/90">
            Trusted by<br/>forward-thinking brands
          </p>
        </div>

        {/* Marquee for brands */}
        <div className="relative flex overflow-x-hidden py-2 flex-1">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="whitespace-nowrap flex items-center gap-12 px-6 min-w-max"
          >
            {clients.concat(clients, clients).map((client, i) => (
              <div key={i} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl md:text-2xl font-bold tracking-tight">{client}</span>
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
