import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Discovery & Data",
    desc: "We analyze your audience, audit your current content, and define clear performance KPIs.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "02",
    title: "AI-Assisted Strategy",
    desc: "Leveraging our proprietary AI tools to identify trends and map out a high-impact content strategy.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "03",
    title: "Creative Production",
    desc: "Our in-house studio shoots, edits, and produces premium assets tailored to each platform.",
    img: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "04",
    title: "Distribution & Scale",
    desc: "We deploy content across organic and paid channels, scaling what works in real-time.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

export default function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-background text-foreground relative border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground mb-6 uppercase tracking-widest font-mono">
            [ Our Process ]
          </div>
          <h2 className="font-extrabold font-heading text-4xl md:text-5xl mb-6 tracking-tight">
            How we make it work.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            A systematic approach to blending AI-driven insights with world-class creative execution, designed to scale your brand efficiently.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Left Column - Flipper List */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {steps.map((step, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer border-l-4 pl-8 py-8 transition-all duration-300 ${isActive ? 'border-primary bg-muted/30' : 'border-border opacity-60 hover:opacity-100 hover:bg-muted/10'}`}
                >
                  <h3 className={`text-2xl md:text-3xl font-extrabold font-heading mb-2 transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </h3>
                  
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground text-lg leading-relaxed pt-4 pb-2">
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column - Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-32 flex items-center justify-center min-h-[400px]">
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted shadow-xl border border-border">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={steps[activeIndex].img}
                    alt={steps[activeIndex].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
