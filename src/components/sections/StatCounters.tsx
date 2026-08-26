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
    <section className="py-24 relative z-10 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="clay-card flex flex-col items-center justify-center text-center p-8"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-[#FFCC00] mb-4 drop-shadow-md">
              {stat.value}
            </div>
            <div className="text-sm md:text-base font-bold tracking-wide text-white/90">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
