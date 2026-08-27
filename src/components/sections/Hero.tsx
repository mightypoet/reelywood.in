import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import LiquidReveal from '../ui/LiquidReveal';

const carouselItems = [
  { caption: "Conversion design", title: "Crafted to convert." },
  { caption: "Engineering", title: "Built to scale." },
  { caption: "Brand systems", title: "Designed to last." },
];

const partners = ["Kaido", "Northpeak", "Vellum", "Orbit", "Brightline", "Cobalt", "Mesa"];

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setReady(true);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const lineVariants = {
    hidden: { y: '100%' },
    visible: (i: number) => ({
      y: 0,
      transition: {
        delay: 0.25 + i * 0.12,
        duration: 0.9,
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic approx
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
        transition={{ type: 'spring', tension: 120, friction: 30, delay: 0.3 }}
      >
        LUMORA
      </motion.div>

      <div className="shell relative z-20 flex flex-col gap-8 pt-[7rem] px-[1.25rem] pb-[5rem] sm:px-[2rem] lg:grid lg:min-h-[100lvh] lg:grid-cols-12 lg:gap-10 lg:pt-[9rem] lg:px-[2rem] lg:pb-[7rem]">
        
        <div className="flex flex-col gap-7 lg:col-span-7">
          <motion.div 
            className="text-[.875rem] font-medium text-[#111111]/70 inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/50" />
            Independent Studio
          </motion.div>

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

        <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:items-end">
          <motion.div 
            className="w-full max-w-[24rem] lg:max-w-[19rem] rounded-[1.25rem] bg-white/70 p-2 shadow-sm ring-1 ring-[#e6e5e2]/70 backdrop-blur-[12px]"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', tension: 200, friction: 24, delay: 0.4 }}
          >
            <div 
              className="flex gap-2 cursor-pointer rounded-[.875rem]"
              onClick={handleNext}
            >
              <div className="aspect-square w-[6rem] grid place-items-center rounded-[.875rem] bg-[#0a0a0a] text-white font-bold text-[1.875rem]">
                <span className="text-[#cf8047]">◒</span>
              </div>
              <div className="flex-1 rounded-[.875rem] bg-[#f1f0ee]/70 p-3 flex flex-col justify-between">
                <div className="relative min-h-[3.25rem] overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      initial={(d: number) => ({ y: d > 0 ? 14 : -14, opacity: 0 })}
                      animate={{ y: 0, opacity: 1 }}
                      exit={(d: number) => ({ y: d > 0 ? -14 : 14, opacity: 0 })}
                      transition={{ type: 'spring', tension: 300, friction: 28 }}
                      className="absolute inset-0"
                    >
                      <div className="text-[.65rem] font-medium uppercase tracking-[.05em] text-[#111111]/45 mb-0.5">
                        {carouselItems[activeIndex].caption}
                      </div>
                      <div className="max-w-[8rem] text-[.875rem] font-medium leading-[1.35] text-[#111111]">
                        {carouselItems[activeIndex].title}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    {carouselItems.map((_, i) => (
                      <div 
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-[#111111]/70' : 'w-1.5 bg-[#111111]/20'}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={handlePrev}
                      className="w-7 h-7 grid place-items-center rounded-full bg-white text-[#111111]/70 ring-1 ring-[#e6e5e2] hover:text-[#111111] transition-colors"
                    >
                      <ArrowRight size={14} className="rotate-180" />
                    </button>
                    <button 
                      className="w-7 h-7 grid place-items-center rounded-full bg-white text-[#111111]/70 ring-1 ring-[#e6e5e2] hover:text-[#111111] transition-colors"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full max-w-[24rem] lg:max-w-[19rem]"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ type: 'spring', tension: 200, friction: 24, delay: 0.55 }}
          >
            <div className="mb-3 text-[.75rem] font-medium text-[#111111]/45 text-left lg:text-right">
              Trusted by
            </div>
            <div className="grid grid-cols-4 gap-x-4 gap-y-3">
              {partners.map((partner, i) => (
                <motion.span 
                  key={i}
                  className="flex items-center gap-1.5 text-[.75rem] text-[#111111]/70 cursor-default"
                  whileHover={{ y: -2, opacity: 1 }}
                  initial={{ opacity: 0.7 }}
                  transition={{ type: 'spring', tension: 320, friction: 20 }}
                >
                  <span className="w-1 h-1 rounded-full bg-transparent border-[1.5px] border-[#111111]/40 box-content" />
                  {partner}
                </motion.span>
              ))}
            </div>
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
