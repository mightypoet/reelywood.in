import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import LiquidReveal from '../ui/LiquidReveal';

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const lineVariants = {
    hidden: { y: '100%' },
    visible: (i: number) => ({
      y: 0,
      transition: {
        delay: 0.25 + i * 0.12,
        duration: 0.9,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], // easeOutCubic approx
      }
    })
  };

  return (
    <section 
      id="home" 
      className="relative isolate overflow-hidden rounded-b-[2rem] bg-[#c9c9c9]"
    >
      <LiquidReveal 
        baseSrc="https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68/hero/after.jpg"
        revealSrc="https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68/hero/before.jpg"
      />

      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,.35), transparent, rgba(255,255,255,.35))'
        }}
      />

      <motion.div 
        className="pointer-events-none absolute inset-x-0 bottom-[7rem] z-[1] text-center select-none font-bold leading-none text-[13rem] text-white/40"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 120, damping: 30, delay: 0.3 }}
      >
        LUMORA
      </motion.div>

      <div className="shell relative z-20 flex flex-col gap-8 pt-[7rem] px-[1.25rem] pb-[5rem] sm:px-[2rem] lg:grid lg:min-h-[100lvh] lg:grid-cols-12 lg:gap-10 lg:pt-[9rem] lg:px-[2rem] lg:pb-[7rem]">
        
        <div className="flex flex-col gap-7 lg:col-span-7">
          <h1 className="max-w-[18ch] text-[2.25rem] font-semibold leading-[.98] tracking-[-.02em] sm:text-[3rem] md:text-[3.75rem]">
            {["Bold ideas,", "shipped with", "quiet precision."].map((line, i) => (
              <span key={i} className="block overflow-clip">
                <motion.span
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.65 }}
          >
            <span className="flex text-[#b15f2c]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-[.875rem] font-medium text-[#111111]/70">
              200+ brands shipped
            </span>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.75 }}
          >
            <button 
              className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-[.875rem] font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              onClick={() => {/* opens request modal */}}
            >
              Let's Talk <ArrowRight size={16} />
            </button>
            <button 
              className="px-5 py-2.5 rounded-full border border-[#111111]/20 text-[#111111] text-[.875rem] font-medium hover:bg-[#111111]/5 transition-colors"
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Work
            </button>
          </motion.div>
        </div>

      </div>

      <motion.div 
        className="shell flex items-center justify-between gap-3 border-t border-[#111111]/10 px-[1.25rem] py-5 sm:px-[2rem] text-[.75rem] font-medium uppercase tracking-[.025em] text-[#111111]/60"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div>Working since 2014</div>
        <div className="hidden sm:block">Remote-first, worldwide</div>
        <div className="inline-flex items-center gap-2">
          Scroll to explore <span className="rotate-90"><ArrowRight size={14} /></span>
        </div>
      </motion.div>
    </section>
  );
}
