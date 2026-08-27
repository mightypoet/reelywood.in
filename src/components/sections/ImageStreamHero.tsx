import React from 'react';
import { motion } from 'framer-motion';

export default function ImageStreamHero() {
  const images = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
  ];

  return (
    <section className="relative w-full h-[95vh] min-h-[600px] overflow-hidden bg-background text-foreground flex items-center justify-center border-b border-border">
      {/* Background Streams */}
      <div className="absolute inset-0 flex gap-4 md:gap-6 opacity-[0.15] pointer-events-none origin-center rotate-[-8deg] scale-[1.3] md:scale-110 justify-center">
        <div className="flex flex-col gap-4 md:gap-6 animate-[scroll-y_30s_linear_infinite] w-32 md:w-48 lg:w-64 flex-shrink-0">
          {[...images, ...images, ...images].map((img, i) => (
             <img key={i} src={img} alt="" className="rounded-2xl w-full h-40 md:h-64 object-cover" />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-6 animate-[scroll-y-reverse_35s_linear_infinite] w-32 md:w-48 lg:w-64 flex-shrink-0 pt-12">
          {[...images, ...images, ...images].reverse().map((img, i) => (
             <img key={i} src={img} alt="" className="rounded-2xl w-full h-40 md:h-64 object-cover" />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-6 animate-[scroll-y_40s_linear_infinite] w-32 md:w-48 lg:w-64 flex-shrink-0 pt-24 hidden md:flex">
          {[...images, ...images, ...images].map((img, i) => (
             <img key={i} src={img} alt="" className="rounded-2xl w-full h-40 md:h-64 object-cover" />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-6 animate-[scroll-y-reverse_45s_linear_infinite] w-32 md:w-48 lg:w-64 flex-shrink-0 pt-8 hidden lg:flex">
          {[...images, ...images, ...images].reverse().map((img, i) => (
             <img key={i} src={img} alt="" className="rounded-2xl w-full h-40 md:h-64 object-cover" />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[130px] font-extrabold font-heading tracking-tighter uppercase leading-[0.85] text-foreground mix-blend-normal">
            Brand <br className="hidden md:block"/> to Market
          </h1>
          <p className="mt-8 text-lg md:text-xl font-bold max-w-2xl mx-auto text-foreground/80">
            We design AI-powered marketing strategy and digital products that scale with the future.
          </p>
          <div className="mt-10">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors rounded-none border border-primary">
              Start a Project
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Gradients to fade out top and bottom */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
