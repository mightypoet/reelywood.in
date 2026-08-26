import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-12 px-4 md:px-6 relative bg-background">
      <div className="max-w-[1400px] mx-auto bg-card rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden text-white flex flex-col min-h-[85vh] shadow-[inset_0_-8px_0_rgba(0,0,0,0.15),_0_10px_20px_rgba(0,0,0,0.2)]">
        
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
          <img 
            src="https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2026%2C%202026%2C%2004_24_27%20PM.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center h-full flex-1 pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-[#5e389e] text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-8 shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]">
                AI-Powered Marketing. <span className="text-[#FFCC00]">Real Impact.</span>
              </div>
              <h1 className="font-extrabold text-[12vw] sm:text-6xl md:text-7xl lg:text-[100px] font-heading leading-[0.9] tracking-tight text-white mb-6" style={{ textShadow: '0 4px 0 rgba(0,0,0,0.1)' }}>
                WE BUILD BRANDS<br/>
                <span className="text-[#FFCC00]">THAT GROW</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10">
                Reelywood is your all-in-one growth partner for digital marketing, influencer collaborations, performance campaigns and more.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="#services" 
                  className="clay-btn text-black px-8 py-4 text-lg flex items-center gap-2"
                >
                  Explore Services <ArrowRight size={20} />
                </a>
                <a 
                  href="#work" 
                  className="clay-btn-purple px-8 py-4 text-lg flex items-center gap-2"
                >
                  See Our Work <div className="bg-white text-[#6842B8] rounded-full p-1"><Play size={16} fill="currentColor" /></div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
