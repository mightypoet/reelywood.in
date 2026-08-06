import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Video } from 'lucide-react';

export default function AIAndCreative() {
  return (
    <section className="py-24 bg-cream text-ink border-y border-ink/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-sm tracking-widest uppercase text-maroon mb-6">[ The Edge ]</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-heading mb-6 leading-tight">
              Human Taste. <br/>
              <span className="italic font-light">Machine Scale.</span>
            </h2>
            <p className="font-sans font-light text-ink/70 text-lg mb-8 leading-relaxed max-w-lg">
              We augment our creative directors with custom AI workflows. From script generation to automated editing, we deliver agency-quality work at the speed of the feed.
            </p>
            
            <ul className="space-y-6">
              {[
                { icon: Brain, text: "Predictive trend analysis & content planning" },
                { icon: Sparkles, text: "AI-assisted copywriting and storyboarding" },
                { icon: Video, text: "Automated format adaptation and localization" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 text-maroon"><item.icon size={20} /></div>
                  <span className="font-sans font-medium text-ink/90">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full bg-ink rounded-sm overflow-hidden flex items-center justify-center p-8"
          >
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-ink to-ink"></div>
             
             {/* Abstract AI/Creative visualization placeholder */}
             <div className="relative z-10 w-full h-full border border-border/20 rounded-sm flex flex-col items-center justify-center p-12 text-center">
                <Brain size={48} className="text-gold mb-6" />
                <h3 className="font-heading text-2xl text-cream mb-2">Proprietary Engine</h3>
                <p className="font-mono text-xs text-cream/50 uppercase tracking-widest">Processing Creative Variables</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
