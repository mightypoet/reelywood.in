import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, BarChart3, TrendingUp, Cpu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Hero() {
  const { mode } = useTheme();
  const isTech = mode === 'tech';

  return (
    <section id="home" className={`pt-[160px] pb-12 px-4 md:px-6 relative bg-background transition-colors duration-300`}>
      <div className={`max-w-[1400px] mx-auto rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col min-h-[85vh] transition-all duration-300 ${
        isTech 
          ? 'bg-card border border-border shadow-sm text-foreground' 
          : 'bg-card shadow-[inset_0_-8px_0_rgba(0,0,0,0.15),_0_10px_20px_rgba(0,0,0,0.2)] text-white'
      }`}>
        
        {/* Visual Background / Scene */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
          {!isTech ? (
            <>
              <img 
                src="https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2026%2C%202026%2C%2004_24_27%20PM.png" 
                alt="Hero Background" 
                className="w-full h-full object-cover"
              />
            </>
          ) : (
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none flex justify-end items-center opacity-40 md:opacity-100">
              <svg className="absolute w-[800px] h-[800px] -right-40 -top-20 text-primary/10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
              <div className="hidden md:flex relative z-10 w-[500px] h-[500px] mr-12 bg-white border border-border shadow-2xl rounded-2xl p-6 flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">reelywood_engine_v2.0</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4 flex flex-col gap-2">
                    <BarChart3 className="text-primary" size={20} />
                    <div className="text-2xl font-bold">1.2M</div>
                    <div className="text-xs text-muted-foreground">Total Impressions</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 flex flex-col gap-2">
                    <TrendingUp className="text-emerald-500" size={20} />
                    <div className="text-2xl font-bold">+45%</div>
                    <div className="text-xs text-muted-foreground">Conversion Lift</div>
                  </div>
                </div>
                <div className="flex-1 bg-muted rounded-lg p-4 mt-2 relative overflow-hidden">
                  <svg className="absolute bottom-0 w-full h-full text-primary/20" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M0 50 L0 30 Q25 40 50 20 T100 10 L100 50 Z" fill="currentColor" />
                    <path d="M0 30 Q25 40 50 20 T100 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-col justify-center h-full flex-1 pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {!isTech ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-md text-sm font-semibold tracking-wide uppercase mb-8 border border-primary/20">
                    <Cpu size={16} /> Enterprise Grade Solution
                  </div>
                  <h1 className="font-extrabold text-[11vw] sm:text-5xl md:text-6xl lg:text-7xl font-heading leading-[1.1] tracking-tight text-foreground mb-6">
                    Data-Driven <br/>
                    <span className="text-primary">Marketing Automation.</span>
                  </h1>
                  <p className="text-foreground/70 text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-10">
                    Accelerate your digital growth with our proprietary AI infrastructure. We optimize ROI and scale your brand securely and efficiently.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a 
                      href="#services" 
                      className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      Explore Platform <ArrowRight size={18} />
                    </a>
                    <a 
                      href="#work" 
                      className="bg-white text-foreground border border-border px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-colors flex items-center gap-2 shadow-sm"
                    >
                      View Case Studies <Play size={16} className="text-primary" />
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
