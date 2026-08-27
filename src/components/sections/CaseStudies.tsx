import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const creativeCases = [
  {
    id: 1,
    client: "StyleVeda",
    title: "D2C Brand AIGC Campaign",
    description: "Replaced their traditional expensive photoshoots with fully AI-generated commercial reels. The result was a premium editorial look produced at 20% of the usual cost, tailored for fast-scrolling Instagram audiences.",
    stat: "4.5x ROAS",
    mediaUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  },
  {
    id: 2,
    client: "Nilesh Stores",
    title: "Local Retail Automation",
    description: "Combined hyper-local targeted AI Reels with our custom WhatsApp CRM integration. Every comment and ad click was instantly answered, turning casual inquiries into offline store footfall.",
    stat: "3x Footfall",
    mediaUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  },
  {
    id: 3,
    client: "Spice Route",
    title: "Restaurant Booking Flow",
    description: "Captured their new menu with high-end editorial videography, pairing it with an automated reservation chatbot. We handled the creative while the SaaS handled the tables.",
    stat: "+120 Bookings/wk",
    mediaUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  },
  {
    id: 4,
    client: "Sharma Real Estate",
    title: "Property Lead Qualification",
    description: "Created cinematic property tour reels and integrated an AI chatbot to instantly qualify leads based on budget and location before passing them to the sales team.",
    stat: "40% Lead quality lift",
    mediaUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  }
];

const techCases = [
  {
    id: 1,
    client: "Global Logistics Co.",
    title: "AI Supply Chain Agent",
    description: "Deployed a custom LLM-powered agent to parse shipping documents and automatically update database records, eliminating manual data entry and reducing errors.",
    stat: "-80% Data Entry Time",
    mediaUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c663be?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  },
  {
    id: 2,
    client: "TechFlow SaaS",
    title: "Custom CRM & n8n Sync",
    description: "Built a bespoke dashboard synced with n8n to automate onboarding emails, provisioning, and Stripe billing lifecycle events for new SaaS users.",
    stat: "100% Automated Onboarding",
    mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  },
  {
    id: 3,
    client: "Alpha Finance",
    title: "Dorky AI Knowledge Retrieval",
    description: "Integrated our proprietary Dorky AI engine with their internal confluence and google drive, allowing advisors to instantly retrieve policy details securely via chat.",
    stat: "24/7 Instant Answers",
    mediaUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  },
  {
    id: 4,
    client: "Urban Retail Chain",
    title: "Bill Karo POS Deployment",
    description: "Replaced legacy point-of-sale systems across 12 locations with our lightweight Bill Karo POS, integrated directly into their existing inventory systems via Make.com.",
    stat: "12 Locations Upgraded",
    mediaUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    mediaType: "image"
  }
];

const CaseBlock: React.FC<{ data: typeof creativeCases[0], onInView: (id: number) => void, isTech: boolean }> = ({ data, onInView, isTech }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(data.id);
    }
  }, [isInView, data.id, onInView]);

  return (
    <div ref={ref} className={`min-h-[70vh] flex flex-col justify-center py-20 border-b last:border-0 ${isTech ? 'border-border' : 'border-[#8C877A]/20'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-2 h-2 rounded-full ${isTech ? 'bg-foreground' : 'bg-[#E8A33D]'}`} />
        <span className={`font-mono text-sm uppercase tracking-widest ${isTech ? 'text-muted-foreground' : 'text-[#8C877A]'}`}>{data.client}</span>
      </div>
      <h3 className={`font-extrabold font-heading text-4xl md:text-5xl font-heading mb-6 leading-tight ${isTech ? 'text-foreground' : 'text-[#F3EEE2]'}`}>
        {data.title}
      </h3>
      <p className={`text-lg leading-relaxed mb-8 max-w-xl ${isTech ? 'text-foreground/80' : 'text-[#8C877A]'}`}>
        {data.description}
      </p>
      <div className={`inline-block border px-6 py-3 rounded font-mono text-lg ${isTech ? 'border-border text-foreground bg-card' : 'border-[#7A2A2A] text-[#E8A33D]'}`}>
        {data.stat}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { mode } = useTheme();
  const isTech = mode === 'tech';
  const cases = isTech ? techCases : creativeCases;
  
  const [activeId, setActiveId] = useState(cases[0].id);

  const activeCase = cases.find(c => c.id === activeId) || cases[0];

  return (
    <section id="work" className={`relative ${isTech ? 'bg-background' : 'bg-[#14110C]'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Mobile View (Stacked) */}
        <div className="md:hidden py-24 space-y-24">
          <div className="flex items-center gap-4 mb-8">
            <div className={`h-px w-12 ${isTech ? 'bg-foreground' : 'bg-[#7A2A2A]'}`} />
            <h2 className={`font-extrabold text-sm tracking-widest uppercase font-heading ${isTech ? 'text-foreground' : 'text-[#7A2A2A]'}`}>Selected Work</h2>
          </div>
          {cases.map((c) => (
            <div key={c.id} className="flex flex-col gap-6">
              <div className={`aspect-[4/5] rounded overflow-hidden ${isTech ? 'bg-muted' : 'bg-[#8C877A]/10'}`}>
                <img src={c.mediaUrl} alt={c.title} className="w-full h-full object-cover grayscale opacity-90" />
              </div>
              <div>
                <div className={`font-mono text-sm uppercase tracking-widest mb-4 ${isTech ? 'text-muted-foreground' : 'text-[#E8A33D]'}`}>{c.client}</div>
                <h3 className={`font-extrabold text-3xl font-heading mb-4 ${isTech ? 'text-foreground' : 'text-[#F3EEE2]'}`}>{c.title}</h3>
                <p className={`mb-6 ${isTech ? 'text-foreground/80' : 'text-[#8C877A]'}`}>{c.description}</p>
                <div className={`inline-block border px-4 py-2 rounded font-mono text-sm ${isTech ? 'border-border text-foreground bg-card' : 'border-[#7A2A2A] text-[#F3EEE2]'}`}>
                  {c.stat}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (Pinned) */}
        <div className="hidden md:flex relative items-start pb-32">
          
          {/* Left: Scrolling Content */}
          <div className="w-1/2 pr-16 py-32">
            <div className="flex items-center gap-4 mb-16">
              <div className={`h-px w-12 ${isTech ? 'bg-foreground' : 'bg-[#7A2A2A]'}`} />
              <h2 className={`font-extrabold text-sm tracking-widest uppercase font-heading ${isTech ? 'text-foreground' : 'text-[#7A2A2A]'}`}>Selected Work</h2>
            </div>
            
            <div className="pb-32">
              {cases.map(c => (
                <CaseBlock key={c.id} data={c} onInView={setActiveId} isTech={isTech} />
              ))}
            </div>
          </div>

          {/* Right: Pinned Media */}
          <div className="w-1/2 sticky top-0 h-screen flex items-center pl-8">
            <div className={`w-full aspect-[4/5] rounded overflow-hidden relative shadow-2xl ${isTech ? 'bg-muted border border-border' : 'bg-[#8C877A]/10 border border-[#8C877A]/20'}`}>
              {cases.map(c => (
                <motion.div
                  key={c.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeId === c.id ? 1 : 0, scale: activeId === c.id ? 1 : 1.05 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ zIndex: activeId === c.id ? 10 : 0, pointerEvents: activeId === c.id ? 'auto' : 'none' }}
                >
                  <img src={c.mediaUrl} alt={c.title} className={`w-full h-full object-cover ${isTech ? 'grayscale opacity-90' : ''}`} />
                  <div className={`absolute inset-0 ring-1 ring-inset rounded ${isTech ? 'ring-black/5' : 'ring-white/10'}`} />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
