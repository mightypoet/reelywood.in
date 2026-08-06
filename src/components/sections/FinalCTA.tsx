import React from 'react';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="py-32 bg-cream text-ink border-t border-ink/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gold/10 via-cream to-cream pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-extrabold text-5xl md:text-7xl font-heading mb-8 leading-tight"
        >
          Ready to scale <br/>
          <span className="italic font-light">your brand?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg font-sans font-light text-ink/70 mb-12"
        >
          Let's build a tailored performance engine that drives revenue while you sleep.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a href="#contact" className="inline-block bg-ink text-cream px-10 py-5 text-sm font-sans font-medium hover:bg-gold hover:text-ink transition-colors rounded-sm shadow-xl">
            Book a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
