import React from 'react';
import { motion } from 'framer-motion';

export default function PerformanceSection() {
  return (
    <section className="py-24 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="font-mono text-sm tracking-widest uppercase text-foreground/60 mb-6">[ Performance ]</p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-extrabold text-4xl md:text-5xl lg:text-6xl font-heading mb-8"
        >
          Built for <span className="italic">ROI</span>.
        </motion.h2>
        <p className="font-sans font-light text-foreground/70 text-lg max-w-2xl mx-auto mb-12">
          We don't just optimize for likes. We build full-funnel systems that convert attention into measurable revenue.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 border border-border rounded-sm hover:border-primary transition-colors bg-background">
            <h3 className="font-extrabold font-heading text-xl mb-3 text-primary">Paid Social</h3>
            <p className="font-sans font-light text-sm text-foreground/70">Data-backed media buying across Meta, TikTok, and YouTube designed to scale your CPA profitably.</p>
          </div>
          <div className="p-8 border border-border rounded-sm hover:border-primary transition-colors bg-background">
            <h3 className="font-extrabold font-heading text-xl mb-3 text-primary">SEO & Search</h3>
            <p className="font-sans font-light text-sm text-foreground/70">Capturing high-intent demand through programmatic SEO and AI-optimized search campaigns.</p>
          </div>
          <div className="p-8 border border-border rounded-sm hover:border-primary transition-colors bg-background">
            <h3 className="font-extrabold font-heading text-xl mb-3 text-primary">CRO</h3>
            <p className="font-sans font-light text-sm text-foreground/70">Continuous A/B testing and landing page optimization to squeeze maximum value from every click.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
