import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FinalCTA from '../components/sections/FinalCTA';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = [
    {
      name: "Creative Services",
      price: "Custom",
      description: "Project-based pricing for high-quality production, AIGC, and storytelling.",
      features: [
        { name: "Reel Pack (4 videos/mo)", included: true, text: "Starting at ₹50,000" },
        { name: "AIGC Commercials", included: true, text: "Starting at ₹1,50,000" },
        { name: "Custom Production", included: true, text: "By scope" },
        { name: "Dedicated Producer", included: true },
        { name: "SaaS Access", included: false }
      ],
      buttonText: "Get a Custom Quote",
      highlighted: false
    },
    {
      name: "SaaS - Starter",
      price: "₹2,999",
      period: "/mo",
      description: "Perfect for local shops automating basic WhatsApp inquiries.",
      features: [
        { name: "WhatsApp Automation", included: true },
        { name: "Social Media Auto-Posting", included: true },
        { name: "Team Members", included: true, text: "1 User" },
        { name: "CRM Integration", included: false },
        { name: "AI Chatbots", included: false },
        { name: "Priority Support", included: false }
      ],
      buttonText: "Start Free Trial",
      highlighted: false
    },
    {
      name: "SaaS - Growth",
      price: "₹7,999",
      period: "/mo",
      description: "For growing brands needing full CRM and AI chatbot capabilities.",
      features: [
        { name: "WhatsApp Automation", included: true },
        { name: "Social Media Auto-Posting", included: true },
        { name: "Team Members", included: true, text: "5 Users" },
        { name: "CRM Integration", included: true },
        { name: "AI Chatbots", included: true },
        { name: "Priority Support", included: true, text: "Email" }
      ],
      buttonText: "Start Growth Plan",
      highlighted: true
    }
  ];

  return (
    <div className="min-h-screen pt-32 flex flex-col justify-between bg-background text-foreground font-sans selection:bg-primary selection:text-background">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full flex-grow px-6 md:px-12 mb-24 mt-12 md:mt-24">
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-primary uppercase tracking-widest text-sm mb-6"
          >
            [ Investment ]
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-extrabold text-5xl md:text-7xl lg:text-8xl font-heading tracking-tighter text-foreground mb-8 leading-[0.95]"
          >
            Transparent pricing for <br className="hidden md:block"/> creative & software.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 font-light"
          >
            Choose our creative production services, or subscribe to our business automation SaaS. Or both.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={i} 
              className={`relative rounded-sm p-10 flex flex-col border ${tier.highlighted ? 'bg-primary border-primary text-primary-foreground' : 'bg-card border-border text-foreground'}`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-sm">
                  Most Popular
                </div>
              )}
              
              <h3 className={`font-mono text-sm uppercase tracking-widest mb-4 ${tier.highlighted ? 'text-primary-foreground/70' : 'text-foreground/50'}`}>
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-heading tracking-tighter">{tier.price}</span>
                {tier.period && <span className={`font-light text-lg ${tier.highlighted ? 'text-primary-foreground/60' : 'text-foreground/50'}`}>{tier.period}</span>}
              </div>
              <p className={`mb-12 font-light leading-relaxed h-14 ${tier.highlighted ? 'text-primary-foreground/80' : 'text-foreground/70'}`}>
                {tier.description}
              </p>
              
              <ul className="space-y-5 mb-12 flex-grow">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    {feat.included ? (
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.highlighted ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.highlighted ? 'bg-primary-foreground/10 text-primary-foreground/30' : 'bg-foreground/5 text-foreground/20'}`}>
                        <X size={12} strokeWidth={2} />
                      </div>
                    )}
                    <span className={`font-light ${feat.included ? '' : 'opacity-40'}`}>
                      {feat.name} {feat.text && <span className="opacity-60">- {feat.text}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 text-sm font-sans font-medium transition-colors rounded-sm text-center border ${tier.highlighted ? 'bg-primary-foreground text-primary hover:bg-transparent hover:text-primary-foreground hover:border-primary-foreground' : 'bg-primary text-primary-foreground border-primary hover:bg-transparent hover:text-foreground'}`}>
                {tier.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <FinalCTA />
      <Footer />
    </div>
  );
}
