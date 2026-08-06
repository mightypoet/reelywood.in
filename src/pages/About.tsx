import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FinalCTA from '../components/sections/FinalCTA';
import { MapPin, Users, Zap, TrendingUp, Sparkles, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 flex flex-col justify-between bg-background text-foreground font-sans selection:bg-primary selection:text-background">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full flex-grow px-6 md:px-12 mb-24 mt-12 md:mt-24">
        
        <div className="max-w-4xl mb-24 md:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-primary uppercase tracking-widest text-sm mb-6"
          >
            [ The Studio ]
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-extrabold text-5xl md:text-7xl lg:text-8xl font-heading tracking-tighter text-foreground mb-8 leading-[0.95]"
          >
            Rooted in reality. <br/>
            <span className="italic text-muted-foreground">Built for the future.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-2xl"
          >
            We started Reelywood with a simple belief: growing businesses deserve the same high-end creative production and intelligent automation tools as global enterprises. We combine art, technology, and strategy to build brands that matter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-extrabold text-3xl md:text-4xl font-heading tracking-tight mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed mb-12">
              To democratize high-performing creative and automation. By uniting human-led design with AI-generated content (AIGC) and scalable systems, we reduce friction and elevate brand resonance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-card border border-border p-8 rounded-sm">
                <Users className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
                <div className="font-heading text-xl tracking-tight mb-2">Human-Led</div>
                <div className="text-foreground/70 font-light">Creative direction by world-class experts and strategists.</div>
              </div>
              <div className="bg-card border border-border p-8 rounded-sm">
                <Sparkles className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
                <div className="font-heading text-xl tracking-tight mb-2">AI-Powered</div>
                <div className="text-foreground/70 font-light">Flawless execution and content generation at unprecedented scale.</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary text-primary-foreground p-10 md:p-16 flex flex-col justify-center rounded-sm"
          >
            <h3 className="font-extrabold text-3xl md:text-4xl font-heading tracking-tight mb-12 text-primary-foreground">What We Do</h3>
            <ul className="space-y-10">
              <li className="flex items-start gap-6">
                <div className="mt-1">
                  <TrendingUp className="w-6 h-6 opacity-70" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-heading text-xl tracking-tight mb-2">Performance Marketing</div>
                  <div className="text-primary-foreground/70 font-light">Data-driven ROAS optimization across all digital channels.</div>
                </div>
              </li>
              <li className="flex items-start gap-6">
                <div className="mt-1">
                  <Code2 className="w-6 h-6 opacity-70" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-heading text-xl tracking-tight mb-2">Business Automation</div>
                  <div className="text-primary-foreground/70 font-light">Custom CRM workflows, AI agents, and frictionless integrations.</div>
                </div>
              </li>
              <li className="flex items-start gap-6">
                <div className="mt-1">
                  <MapPin className="w-6 h-6 opacity-70" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-heading text-xl tracking-tight mb-2">Local SEO & GEO</div>
                  <div className="text-primary-foreground/70 font-light">Dominating search visibility with generative AI strategies.</div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      <FinalCTA />
      <Footer />
    </div>
  );
}
