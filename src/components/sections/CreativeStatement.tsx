import React from 'react';
import { motion } from 'framer-motion';

export default function CreativeStatement() {
  return (
    <section className="py-32 bg-cream text-ink flex items-center justify-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-extrabold text-4xl md:text-6xl lg:text-7xl font-heading leading-tight"
        >
          We do not just create content. <br className="hidden md:block"/>
          <span className="italic font-light">We engineer performance.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl font-sans font-light text-ink/70 max-w-2xl mx-auto"
        >
          By bridging the gap between world-class creative and data-driven AI systems, we build campaigns that move culture and drive revenue.
        </motion.p>
      </div>
      
      {/* Decorative structural mark */}
      <div className="absolute top-1/2 left-12 w-px h-32 bg-maroon/30 transform -translate-y-1/2 hidden lg:block"></div>
      <div className="absolute top-1/2 right-12 w-px h-32 bg-maroon/30 transform -translate-y-1/2 hidden lg:block"></div>
    </section>
  );
}
