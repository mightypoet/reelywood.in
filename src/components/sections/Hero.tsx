import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  const videos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  ];

  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <p className="font-mono text-primary uppercase tracking-widest text-sm">
            [ Reelywood AI ]
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-foreground tracking-tighter leading-[0.95] max-w-5xl">
            AI-first <br />
            <span className="italic text-muted">360° marketing.</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-foreground/80 max-w-2xl font-sans font-light">
            We are a creative studio, AI lab, marketing agency, and performance partner for modern brands.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <a href="#contact" className="bg-primary text-primary-foreground px-8 py-4 text-sm font-sans font-medium hover:bg-foreground hover:text-background transition-colors rounded-sm text-center">
              Start a Project
            </a>
            <a href="#work" className="bg-transparent text-foreground px-8 py-4 text-sm font-sans font-medium border border-border hover:border-primary hover:text-primary transition-colors rounded-sm text-center">
              View Our Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative w-full cursor-grab active:cursor-grabbing pl-6 md:pl-12 mt-20">
        <motion.div ref={containerRef} className="overflow-hidden">
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            className="flex gap-4 md:gap-8 w-max pr-6 md:pr-12"
          >
            {videos.map((src, idx) => (
              <motion.div 
                key={idx}
                className="w-[280px] md:w-[400px] lg:w-[500px] aspect-[16/9] bg-muted overflow-hidden flex-shrink-0 relative group rounded-sm"
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <video 
                  src={src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
