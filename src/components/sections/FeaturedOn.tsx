import React from 'react';

export default function FeaturedOn() {
  return (
    <section className="py-16 border-b border-border bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-foreground/50 mb-8">[ Recognized By ]</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-all duration-500">
          <div className="text-xl md:text-2xl font-heading text-foreground">Meta Business</div>
          <div className="text-xl md:text-2xl font-heading text-foreground">Google Partners</div>
          <div className="text-xl md:text-2xl font-heading text-foreground">Shopify Experts</div>
          <div className="text-xl md:text-2xl font-heading text-foreground">HubSpot</div>
        </div>
      </div>
    </section>
  );
}
