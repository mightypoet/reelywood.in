import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ElectricGaze from '../ui/ElectricGaze';

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-12 px-4 md:px-6 relative bg-white">
      <div className="max-w-[1400px] mx-auto bg-black rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden text-white flex flex-col min-h-[85vh]">
        
        <ElectricGaze imageUrl="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80" />

        <div className="relative z-10 flex flex-col justify-between h-full flex-1 pointer-events-none">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-sm">
              <p className="text-white/80 font-mono text-xs tracking-widest uppercase mb-4 opacity-70">
                [ Interactive Surface ]
              </p>
              <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                We design AI-powered marketing strategy and digital products that scale with the future. Hover around to interact.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-right">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">$50M+</p>
                <p className="text-white/60 text-xs mt-1 max-w-[160px] ml-auto leading-tight font-mono uppercase tracking-wider">Revenue Influenced</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">120M+</p>
                <p className="text-white/60 text-xs mt-1 max-w-[160px] ml-auto leading-tight font-mono uppercase tracking-wider">Users Impacted</p>
              </div>
            </div>
          </div>

          <div className="mt-24 mb-16 md:mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-extrabold text-[12vw] sm:text-6xl md:text-8xl lg:text-[130px] font-heading leading-[0.85] tracking-tighter text-white max-w-5xl uppercase mix-blend-difference">
                Brand<br />to Market.
              </h1>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-auto pointer-events-auto">
            <div className="flex flex-col gap-6 items-start">
              <p className="text-white/60 font-mono text-xs tracking-widest uppercase">
                250+ products designed
              </p>
              <a 
                href="#contact" 
                className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-none font-bold text-xs md:text-sm hover:bg-black hover:text-white border border-white transition-all flex items-center gap-3 uppercase tracking-widest"
              >
                Start a Project <ArrowRight size={18} />
              </a>
            </div>
            <div className="text-white/50 text-xs font-mono uppercase tracking-widest self-start md:self-auto">
              &copy; 2026 Studios
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
