import React from 'react';
import { Play, Search, Smartphone, Code, Video, Bot, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Play className="w-6 h-6" />,
    title: "AI Reels",
    outcome: "High-retention vertical content at 20% of traditional costs."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "SEO & GEO",
    outcome: "Dominate search engines and AI answer algorithms."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Social Media Management",
    outcome: "Editorial-style grid curation that builds trust."
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Web Development",
    outcome: "Conversion-optimized platforms that drive sales."
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video Production",
    outcome: "Cinematic brand storytelling that commands attention."
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Business Automation SaaS",
    outcome: "WhatsApp CRM integrations that never miss a lead."
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#14110C] border-t border-[#8C877A]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#7A2A2A]" />
              <h2 className="text-[#7A2A2A] font-mono text-sm tracking-widest uppercase font-semibold">Capabilities</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-heading text-[#F3EEE2] leading-tight max-w-2xl">
              Everything you need to capture attention and convert it.
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border border-[#8C877A]/20 rounded bg-[#14110C] hover:bg-[#8C877A]/5 transition-colors group cursor-pointer flex flex-col"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded bg-[#F3EEE2]/5 text-[#E8A33D] mb-8">
                {s.icon}
              </div>
              <h4 className="text-xl font-heading text-[#F3EEE2] mb-3">{s.title}</h4>
              <p className="text-[#8C877A] mb-8 flex-grow">{s.outcome}</p>
              <div className="flex items-center gap-2 text-[#E8A33D] font-mono text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
