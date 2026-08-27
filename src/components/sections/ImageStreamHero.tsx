import React from 'react';
import { motion } from 'framer-motion';
import { ImageStreamHero as ImageStreamHeroBase } from '../ui/image-stream-hero';

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    alt: "Brand Strategy"
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    alt: "Digital Products"
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    alt: "Performance Marketing"
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    alt: "Creative Output"
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    alt: "Team Collaboration"
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    alt: "AI Automation"
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    alt: "Strategy Meeting"
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    alt: "Marketing"
  }
];

export default function ImageStreamHero() {
  return (
    <section className="relative w-full h-[95vh] min-h-[600px] border-b border-border">
      <ImageStreamHeroBase
        images={IMAGES}
        className="h-full w-full bg-background"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center max-w-5xl mx-auto px-6">
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
        
        {/* Gradients to blend content seamlessly */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-background/40 to-background opacity-90" />
      </ImageStreamHeroBase>
    </section>
  )
}
