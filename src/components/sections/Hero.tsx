import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-12 px-4 md:px-6 relative bg-background">
      <div className="max-w-[1400px] mx-auto bg-[#1a1a1a] rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden text-white flex flex-col min-h-[85vh]">
        
        {/* Background Image/Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Gold Texture" 
            className="w-full h-full object-cover scale-110"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-sm">
              <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
                We partner with ambitious teams to craft brands, build digital products, and design AI-powered marketing strategy that scale with the future.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-right">
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">$50M+</p>
                <p className="text-white/60 text-xs mt-1 max-w-[160px] ml-auto leading-tight">Client Revenue Influenced Through Product Design</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">120M+</p>
                <p className="text-white/60 text-xs mt-1 max-w-[160px] ml-auto leading-tight">Users Impacted By Products We Designed</p>
              </div>
            </div>
          </div>

          <div className="mt-24 mb-16 md:mt-32">
            <h1 className="text-5xl md:text-7xl lg:text-[110px] font-heading font-bold leading-[0.95] tracking-tighter text-white max-w-4xl">
              AI-Powered Brand<br />to Market
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-auto">
            <div className="flex flex-col gap-6 items-start">
              <p className="text-white/80 font-medium text-sm md:text-base max-w-[180px] leading-tight">
                Over <span className="text-white font-bold">250+</span> products designed and launched
              </p>
              <a 
                href="#contact" 
                className="bg-[#f9572a] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#e04a20] transition-colors flex items-center gap-2"
              >
                Start a Project <ArrowRight size={16} />
              </a>
            </div>
            <div className="text-white/50 text-xs font-medium">
              &copy; 2026 goldenflitch™ Studios
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
