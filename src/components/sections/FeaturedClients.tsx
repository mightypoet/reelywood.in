import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%206.58.49%20PM.jpeg",
  "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/eyfuweyuweewiuuiew.jpeg",
  "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/hagadhfgdahfgdhfgdh.jpeg",
  "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/jkbfkfbhfhfhjfdhfdhf.jpeg",
  "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/kuagfgdafgdaufuefuweufik.jpeg",
  "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/wefwrfwrfwrfwfw.jpeg",
  "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%206.58.49%20PMdd.jpeg"
];

const scaleIndices = [3, 4, 6];

export default function FeaturedClients() {
  return (
    <section className="py-20 bg-cream text-ink relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="font-extrabold text-3xl md:font-heading text-4xl font-heading">Worked With</h2>
        <p className="font-mono text-sm tracking-widest uppercase text-ink/60">[ Selected Partners ]</p>
      </div>
      
      {/* Infinite Marquee with Framer Motion */}
      <div className="relative flex overflow-x-hidden border-y border-ink/10 py-10 group">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          className="flex items-center w-max min-w-max flex-shrink-0 hover:[animation-play-state:paused]"
        >
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {clients.map((client, idx) => {
                const isScaled = scaleIndices.includes(idx);
                return (
                  <div key={idx} className="flex items-center justify-center flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <img 
                      src={client} 
                      alt="Client Logo" 
                      className={`w-auto object-contain transition-all duration-300 ${isScaled ? 'h-[72px] md:h-24' : 'h-12 md:h-16'}`} 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Fades for Marquee */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent"></div>
      </div>
    </section>
  );
}