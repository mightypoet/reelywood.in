import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Play, Users, TrendingUp, Compass, Share2, Layers, Laptop, ArrowRight, X } from 'lucide-react';

const servicesList = [
  { id: 'creative', title: 'Creative Studio', icon: Palette, color: 'from-pink-500 to-rose-500', bg: 'bg-rose-50', desc: 'Brand creatives, product shoots, and packaging.' },
  { id: 'aigc', title: 'AIGC Production', icon: Play, color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-50', desc: 'AI commercials, brand films, and storytelling.' },
  { id: 'influencer', title: 'Influencer Marketing', icon: Users, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', desc: 'Global campaigns with top-tier creators.' },
  { id: 'performance', title: 'Performance Marketing', icon: TrendingUp, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', desc: 'Data-driven ROAS optimization and media buying.' },
  { id: 'strategy', title: 'Brand Strategy', icon: Compass, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', desc: 'Positioning, research, and go-to-market.' },
  { id: 'social', title: 'Social Media', icon: Share2, color: 'from-fuchsia-500 to-pink-500', bg: 'bg-fuchsia-50', desc: 'Community management and viral content.' },
  { id: 'motion', title: 'Motion Graphics', icon: Layers, color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', desc: '2D/3D animation and VFX.' },
  { id: 'web', title: 'Website Development', icon: Laptop, color: 'from-slate-700 to-slate-900', bg: 'bg-slate-100', desc: 'Premium web apps and digital experiences.' },
];

const impactStudies = [
  {
    id: 'cabin17a',
    title: 'Cabin17A',
    industry: 'Hospitality / Stay & Leisure',
    challenge: 'Low table bookings, high dependency on Swiggy, Zomato platforms with high commission cuts.',
    strategy: 'Meta + Google performance campaigns targeting weekend getaway seekers within a [15 km] radius, retargeting customers who didn\'t book table.',
    execution: 'Instagram Reels showcasing the cabin experience, geo-targeted Google Search ads for "Breakfast near Golpark, South Kolkata", limited-time offer funnels.',
    stats: [
      { value: '+20%', desc: 'Repeat Bookings increased' },
      { value: '40% Repeat Rate', desc: 'Shifting spend toward owned-channel takeaways' }
    ],
    number: '1'
  },
  {
    id: 'realrista',
    title: 'Realrista — Matrimony App',
    industry: 'Matchmaking / Matrimony Tech',
    challenge: 'High app installs but low profile completion and paid subscription conversion.',
    strategy: 'Full-funnel approach — awareness via video ads, consideration via testimonial content, conversion via app deep-link retargeting.',
    execution: 'Meta & Google UAC campaigns, community-trust-driven creatives (success stories), WhatsApp nurture sequences for incomplete profiles.',
    stats: [
      { value: '100+ Users', desc: 'App installs monthly' },
      { value: '-20% CAC', desc: 'CAC down by 20%' }
    ],
    number: '2'
  },
  {
    id: 'auraganic',
    title: 'Auraganic',
    industry: 'D2C Wellness / Ayurveda',
    challenge: 'Crowded ayurvedic FMCG space; needed to build credibility fast.',
    strategy: 'Educational content marketing + performance ads on Meta/Google Shopping, influencer seeding for social proof.',
    execution: 'UGC-style testimonials, ingredient-education carousels, festive-season sale campaigns.',
    stats: [
      { value: '3.2x', desc: 'ROAS' },
      { value: '+20% on Orders', desc: 'Repeat purchase rate' }
    ],
    number: '3'
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);

  const selected = servicesList.find(s => s.id === selectedService);
  const activeStudy = impactStudies[activeStudyIndex];

  return (
    <section id="services" className="pt-16 md:pt-24 pb-12 md:pb-24 relative z-10 bg-background overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground mb-4">
            Capabilities
          </div>
          <h2 className="font-extrabold text-5xl md:text-6xl font-heading tracking-tighter text-foreground mb-6">
            End-to-End <br/> <span className="text-primary">Creative Capabilities</span>
          </h2>
          <p className="text-lg text-foreground/70 font-bold max-w-2xl mx-auto">
            From concept to conversion, we build digital experiences that capture attention and drive growth.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className="group cursor-pointer rounded-xl border border-border bg-card p-6 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full mb-6 relative z-10 bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon size={24} />
              </div>
              
              <div className="mt-auto">
                <h3 className="font-extrabold text-2xl font-heading mb-3 tracking-tight text-foreground">{service.title}</h3>
                <p className="text-sm font-medium mb-6 text-foreground/70">{service.desc}</p>
                
                <div className="flex items-center text-sm font-bold transition-colors tracking-widest uppercase text-primary">
                  Explore <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground mb-4">
            Impact
          </div>
          <h3 className="font-extrabold text-4xl font-heading tracking-tighter text-foreground">
            Proven Results
          </h3>
        </div>
        
        <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
          <div className="flex flex-wrap gap-2 mb-10 relative z-10">
            {impactStudies.map((study, idx) => (
              <button
                key={study.id}
                onClick={() => setActiveStudyIndex(idx)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeStudyIndex === idx ? 'bg-[#9d4edd] text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
              >
                {study.title.split('—')[0].trim()}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStudy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <h4 className="text-3xl md:text-4xl font-extrabold text-[#9d4edd] mb-6 tracking-tight">
                {activeStudy.title}
              </h4>
              
              <div className="space-y-4 mb-10 text-[15px] leading-relaxed text-white/90">
                <p><strong className="text-white">Industry:</strong> {activeStudy.industry}</p>
                <p><strong className="text-white">Challenge:</strong> {activeStudy.challenge}</p>
                <p><strong className="text-white">Strategy:</strong> {activeStudy.strategy}</p>
                <p><strong className="text-white">Execution:</strong> {activeStudy.execution}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {activeStudy.stats.map((stat, idx) => (
                  <div key={idx} className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#9d4edd]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h5 className="text-3xl font-extrabold mb-2 tracking-tight">{stat.value}</h5>
                    <p className="text-white/60 text-sm font-medium">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-10 -right-10 text-[20rem] font-extrabold text-white/5 select-none leading-none z-0 pointer-events-none">
            {activeStudy.number}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-background border-4 border-foreground overflow-hidden z-10 flex flex-col md:flex-row"
            >
              <div className={`md:w-2/5 p-8 flex flex-col justify-between bg-primary text-primary-foreground`}>
                <div>
                  <div className="w-16 h-16 bg-foreground flex items-center justify-center mb-6">
                    <selected.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="font-extrabold text-3xl font-heading mb-4 tracking-tight leading-none">{selected.title}</h3>
                  <p className="font-bold">{selected.desc}</p>
                </div>
                
                <a 
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="mt-8 bg-foreground text-background border border-foreground hover:bg-primary hover:text-foreground px-6 py-3 font-bold tracking-widest tracking-tight transition-colors w-max self-start text-center"
                >
                  Discuss a Project
                </a>
              </div>
              
              <div className="md:w-3/5 p-8 relative">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <X size={20} />
                </button>
                
                <h4 className="text-lg font-heading font-medium text-foreground mb-6 mt-4 md:mt-0 tracking-tight">What we do</h4>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className={`mt-1 w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0`}>
                        <div className={`w-2 h-2 bg-foreground`}></div>
                      </div>
                      <div>
                        <h5 className="font-heading font-bold text-foreground text-sm tracking-tight tracking-widest">Service Detail {i}</h5>
                        <p className="text-foreground/70 text-sm mt-1 leading-relaxed">Detailed description of this specific service offering and how it benefits the client.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
