import React from 'react';
import { motion } from 'framer-motion';

export default function ClientMarquee() {
  const logos = [
    "StyleVeda", "Nilesh Stores", "Spice Route", "Sharma Real Estate", "Oasis Tech", "Luminor", "Urban Craft"
  ];
  
  // Duplicate for seamless loop
  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-24 bg-[#F3EEE2] border-t border-[#8C877A]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#7A2A2A]" />
          <h2 className="text-[#7A2A2A] font-mono text-sm tracking-widest uppercase font-heading font-semibold">Trusted By</h2>
          <div className="h-px w-12 bg-[#7A2A2A]" />
        </div>
      </div>
      
      <div className="relative w-full flex items-center overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1035] }} // Adjust based on content width to loop seamlessly, or just use CSS
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
          style={{ width: "fit-content" }}
        >
          {extendedLogos.map((logo, i) => (
            <div key={i} className="px-12 py-4 flex items-center justify-center">
              <span className="text-3xl md:text-5xl font-heading font-bold text-[#14110C] opacity-20 hover:opacity-100 transition-opacity cursor-default">
                {logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
