import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Discovery & Data",
    desc: "We analyze your audience, audit your current content, and define clear performance KPIs."
  },
  {
    num: "02",
    title: "AI-Assisted Strategy",
    desc: "Leveraging our proprietary AI tools to identify trends and map out a high-impact content strategy."
  },
  {
    num: "03",
    title: "Creative Production",
    desc: "Our in-house studio shoots, edits, and produces premium assets tailored to each platform."
  },
  {
    num: "04",
    title: "Distribution & Scale",
    desc: "We deploy content across organic and paid channels, scaling what works in real-time."
  }
];

export default function HowWeWork() {
  return (
    <section className="py-24 bg-background text-foreground relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">How We Work</h2>
          <p className="font-mono text-sm tracking-widest uppercase text-foreground/60">[ Our Process ]</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative"
            >
              <div className="text-primary font-mono text-sm mb-4 border-b border-maroon/50 pb-4 inline-block">{step.num}</div>
              <h3 className="text-xl font-heading mb-3">{step.title}</h3>
              <p className="font-sans font-light text-foreground/70 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
