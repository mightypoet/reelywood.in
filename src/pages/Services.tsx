import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FinalCTA from '../components/sections/FinalCTA';
import Portfolio from '../components/sections/Portfolio';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

function ServiceTemplate({ title, description, included, process }: { title: string, description: string, included: string[], process: string[] }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen pt-32 flex flex-col justify-between bg-background text-foreground font-sans selection:bg-primary selection:text-background">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full flex-grow px-6 md:px-12 mt-12 md:mt-24">
        <div className="max-w-4xl mb-24 md:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-primary uppercase tracking-widest text-sm mb-6"
          >
            [ Core Service ]
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-tighter text-foreground mb-8 leading-[0.95]"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-16"
          >
            {description}
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-16 border-t border-border pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-heading tracking-tight mb-8">What's Included</h3>
              <ul className="space-y-6">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-foreground/80 font-light text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-heading tracking-tight mb-8">Our Process</h3>
              <ol className="space-y-8">
                {process.map((step, i) => (
                  <li key={i} className="flex items-start gap-6 group">
                    <div className="font-mono text-sm tracking-widest text-primary/40 pt-1 group-hover:text-primary transition-colors">
                      0{i + 1}
                    </div>
                    <span className="text-foreground/80 font-light text-lg">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="mb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <h3 className="text-3xl md:text-5xl font-heading tracking-tight text-foreground">Relevant Work</h3>
        </div>
        <Portfolio limit={3} />
      </div>
      
      <FinalCTA />
      <Footer />
    </div>
  );
}

function ServiceRouter() {
  const { slug } = useParams();

  const serviceData: Record<string, any> = {
    'ai-reels': {
      title: "AI Reels Production.",
      description: "Reelywood's AI Reels service combines human editorial storytelling with AI-driven voiceovers, visuals, and editing to produce high-performing vertical content at scale.",
      included: [
        "15-45 sec vertical reels",
        "Hinglish or English AI voiceovers",
        "3 revision rounds",
        "5-7 day turnaround",
        "Scriptwriting & Hook generation"
      ],
      process: [
        "Discovery & Scripting: We identify trending formats and draft high-retention hooks.",
        "AI Asset Generation: We generate required visuals, voiceovers, and elements.",
        "Editorial Assembly: Our human editors combine assets with pacing and typography.",
        "Review & Delivery: You get ready-to-post files optimized for IG/TikTok/Shorts."
      ]
    },
    'business-automation-saas': {
      title: "Business Automation SaaS.",
      description: "Stop losing leads. Our automation platform connects your Meta ads directly to WhatsApp, auto-replies to inquiries, and manages your CRM all in one place.",
      included: [
        "WhatsApp API Integration",
        "Custom Chatbot flows",
        "Centralized CRM dashboard",
        "Automated Follow-ups",
        "Team Inbox for multiple agents"
      ],
      process: [
        "Infrastructure Setup: We configure your WhatsApp Business API.",
        "Flow Design: We map out your customer journey and FAQ responses.",
        "Integration: We connect your lead sources (Meta Ads, Website) to the CRM.",
        "Training: We onboard your team on how to manage human hand-offs."
      ]
    }
  };

  const data = serviceData[slug || ''] || {
    title: "Our Services.",
    description: "Explore our creative and technical solutions.",
    included: ["Custom deliverables"],
    process: ["Discovery", "Execution", "Delivery"]
  };

  return <ServiceTemplate {...data} />;
}

export default function Services() {
  return (
    <Routes>
      <Route path=":slug" element={<ServiceRouter />} />
      <Route path="" element={
        <div className="min-h-screen pt-48 pb-24 px-6 md:px-12 flex flex-col justify-between bg-background text-foreground">
          <Navbar />
          <div className="max-w-7xl mx-auto w-full flex-grow text-center">
            <h1 className="text-5xl md:text-7xl font-heading tracking-tighter mb-8">All Services</h1>
            <p className="text-xl text-foreground/70 font-light">Select a service from the homepage to learn more.</p>
          </div>
          <Footer />
        </div>
      } />
    </Routes>
  );
}
