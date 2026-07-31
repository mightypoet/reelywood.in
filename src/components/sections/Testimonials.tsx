import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Reelywood helped us increase our local footfall by 3x within just 2 months using AI Reels and WhatsApp automation.",
      author: "Nilesh Patel",
      role: "Owner",
      company: "Nilesh Stores"
    },
    {
      quote: "Their AIGC campaigns gave us a premium look that would have normally cost 10x more. The ROAS has been incredible.",
      author: "Anjali Desai",
      role: "CMO",
      company: "StyleVeda"
    },
    {
      quote: "The combination of their creative production and the CRM automation SaaS completely transformed how we handle leads.",
      author: "Rahul Sharma",
      role: "Director",
      company: "Sharma Real Estate"
    }
  ];

  return (
    <section className="py-24 bg-cream text-ink border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">Client Success</h2>
          <p className="font-mono text-sm tracking-widest uppercase text-ink/60">[ What they say ]</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background text-foreground p-8 rounded-sm shadow-sm border border-border"
            >
              <div className="text-primary font-heading text-6xl leading-none mb-4">"</div>
              <p className="font-sans font-light text-foreground/90 text-lg mb-8 leading-relaxed">{t.quote}</p>
              <div>
                <div className="font-heading text-xl">{t.author}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-foreground/50 mt-1">{t.role}, {t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
