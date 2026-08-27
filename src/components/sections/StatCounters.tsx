import React from 'react';
import { motion } from 'framer-motion';

export default function StatCounters() {
  const stats = [
    { label: "Videos Produced", value: "500+" },
    { label: "Reach Generated", value: "50M+" },
    { label: "Businesses Served", value: "100+" },
    { label: "Avg. Turnaround Time", value: "5 Days" }
  ];

  return (
    <section className="py-24 relative z-10 bg-background text-foreground border-y border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x divide-border">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="text-4xl md:text-5xl font-mono text-primary mb-4"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm md:text-base font-sans font-light tracking-wide text-foreground/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
