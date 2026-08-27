import React from 'react';

export default function StatsWithText() {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-heading tracking-tighter leading-[1.1] uppercase">
            Numbers <br />
            <span className="text-background/50">speak for <br/>themselves.</span>
          </h2>
          <p className="mt-8 text-lg font-bold text-background/80 max-w-md leading-relaxed">
            We've helped leading brands scale their digital presence through performance marketing and AI-driven products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          <div className="border-t border-background/20 pt-6">
            <p className="text-5xl md:text-6xl font-black font-heading tracking-tighter mb-3">250+</p>
            <p className="text-sm font-bold uppercase tracking-widest text-background/60">Products Launched</p>
          </div>
          <div className="border-t border-background/20 pt-6">
            <p className="text-5xl md:text-6xl font-black font-heading tracking-tighter mb-3">$50M+</p>
            <p className="text-sm font-bold uppercase tracking-widest text-background/60">Revenue Generated</p>
          </div>
          <div className="border-t border-background/20 pt-6">
            <p className="text-5xl md:text-6xl font-black font-heading tracking-tighter mb-3">120M+</p>
            <p className="text-sm font-bold uppercase tracking-widest text-background/60">Users Reached</p>
          </div>
          <div className="border-t border-background/20 pt-6">
            <p className="text-5xl md:text-6xl font-black font-heading tracking-tighter mb-3">98%</p>
            <p className="text-sm font-bold uppercase tracking-widest text-background/60">Client Retention</p>
          </div>
        </div>
      </div>
    </section>
  )
}
