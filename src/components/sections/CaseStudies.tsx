import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const cases = [
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

const CaseBlock: React.FC<{ data: typeof cases[0], onInView: (id: number) => void }> = ({ data, onInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(data.id);
    }
  }, [isInView, data.id, onInView]);

  return (
    <div ref={ref} className="min-h-[70vh] flex flex-col justify-center py-20 border-b border-[#8C877A]/20 last:border-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-[#E8A33D]" />
        <span className="font-mono text-sm uppercase tracking-widest text-[#8C877A]">{data.client}</span>
      </div>
      <h3 className="text-4xl md:text-5xl font-heading text-[#F3EEE2] mb-6 leading-tight">
        {data.title}
      </h3>
      <p className="text-lg text-[#8C877A] leading-relaxed mb-8 max-w-xl">
        {data.description}
      </p>
      <div className="inline-block border border-[#7A2A2A] px-6 py-3 rounded text-[#E8A33D] font-mono text-lg">
        {data.stat}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [activeId, setActiveId] = useState(cases[0].id);

  const activeCase = cases.find(c => c.id === activeId) || cases[0];

  return (
    <section id="work" className="bg-[#14110C] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Mobile View (Stacked) */}
        <div className="md:hidden py-24 space-y-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#7A2A2A]" />
            <h2 className="text-[#7A2A2A] font-mono text-sm tracking-widest uppercase font-semibold">Selected Work</h2>
          </div>
          {cases.map((c) => (
            <div key={c.id} className="flex flex-col gap-6">
              <div className="aspect-[4/5] bg-[#8C877A]/10 rounded overflow-hidden">
                <img src={c.mediaUrl} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-mono text-sm uppercase tracking-widest text-[#E8A33D] mb-4">{c.client}</div>
                <h3 className="text-3xl font-heading text-[#F3EEE2] mb-4">{c.title}</h3>
                <p className="text-[#8C877A] mb-6">{c.description}</p>
                <div className="inline-block border border-[#7A2A2A] px-4 py-2 rounded text-[#F3EEE2] font-mono text-sm">
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
              <div className="h-px w-12 bg-[#7A2A2A]" />
              <h2 className="text-[#7A2A2A] font-mono text-sm tracking-widest uppercase font-semibold">Selected Work</h2>
            </div>
            
            <div className="pb-32">
              {cases.map(c => (
                <CaseBlock key={c.id} data={c} onInView={setActiveId} />
              ))}
            </div>
          </div>

          {/* Right: Pinned Media */}
          <div className="w-1/2 sticky top-0 h-screen flex items-center pl-8">
            <div className="w-full aspect-[4/5] rounded overflow-hidden relative bg-[#8C877A]/10 border border-[#8C877A]/20 shadow-2xl">
              {cases.map(c => (
                <motion.div
                  key={c.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeId === c.id ? 1 : 0, scale: activeId === c.id ? 1 : 1.05 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ zIndex: activeId === c.id ? 10 : 0, pointerEvents: activeId === c.id ? 'auto' : 'none' }}
                >
                  <img src={c.mediaUrl} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
