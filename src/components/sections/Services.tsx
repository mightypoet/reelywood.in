import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Play, Users, TrendingUp, Compass, Share2, Layers, Laptop, ArrowRight, X } from 'lucide-react';

const servicesList = [
  { 
    id: 'creative', title: 'Creative Studio', icon: Palette, color: 'from-pink-500 to-rose-500', bg: 'bg-rose-50', desc: 'Brand creatives, product shoots, and packaging.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
    details: [
      { title: 'Concept & Ideation', desc: 'Developing unique visual identities and campaign concepts tailored to your brand.' },
      { title: 'High-End Photography', desc: 'Professional product, lifestyle, and editorial photography.' },
      { title: 'Art Direction', desc: 'Comprehensive visual styling and set design for cohesive brand storytelling.' },
      { title: 'Packaging Design', desc: 'Creating memorable unboxing experiences through premium packaging.' }
    ]
  },
  { 
    id: 'aigc', title: 'AIGC Production', icon: Play, color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-50', desc: 'AI commercials, brand films, and storytelling.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    details: [
      { title: 'Generative Video', desc: 'High-fidelity AI-generated video content and brand films.' },
      { title: 'AI Storyboarding', desc: 'Rapid conceptualization and scene planning using advanced AI models.' },
      { title: 'Synthetic Audio', desc: 'Custom AI voiceovers and soundscapes matched perfectly to visuals.' },
      { title: 'VFX & Post-Production', desc: 'Enhancing AI outputs with professional editing and visual effects.' }
    ]
  },
  { 
    id: 'influencer', title: 'Influencer Marketing', icon: Users, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', desc: 'Global campaigns with top-tier creators.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    details: [
      { title: 'Creator Discovery', desc: 'Identifying and vetting influencers aligned with your brand values.' },
      { title: 'Campaign Strategy', desc: 'Designing native, high-engagement content formats.' },
      { title: 'Contract Negotiation', desc: 'Handling licensing, deliverables, and rates securely.' },
      { title: 'Performance Tracking', desc: 'Measuring ROI, reach, and conversions for every creator.' }
    ]
  },
  { 
    id: 'performance', title: 'Performance Marketing', icon: TrendingUp, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', desc: 'Data-driven ROAS optimization and media buying.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    details: [
      { title: 'Meta & Google Ads', desc: 'Full-funnel media buying across major advertising platforms.' },
      { title: 'Conversion Optimization', desc: 'Enhancing landing pages to maximize ad spend efficiency.' },
      { title: 'A/B Testing', desc: 'Rigorous creative and audience testing to find winning combinations.' },
      { title: 'Analytics & Reporting', desc: 'Transparent, real-time dashboards tracking every dollar spent.' }
    ]
  },
  { 
    id: 'strategy', title: 'Brand Strategy', icon: Compass, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', desc: 'Positioning, research, and go-to-market.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    details: [
      { title: 'Market Research', desc: 'Deep-dive analysis into target demographics and market gaps.' },
      { title: 'Brand Positioning', desc: 'Defining your unique value proposition and brand voice.' },
      { title: 'Go-To-Market Strategy', desc: 'Comprehensive launch plans for new products or services.' },
      { title: 'Competitor Analysis', desc: 'Identifying competitor weaknesses to capture market share.' }
    ]
  },
  { 
    id: 'social', title: 'Social Media', icon: Share2, color: 'from-fuchsia-500 to-pink-500', bg: 'bg-fuchsia-50', desc: 'Community management and viral content.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80',
    details: [
      { title: 'Content Calendars', desc: 'Strategic planning and scheduling of daily social content.' },
      { title: 'Community Management', desc: 'Active engagement and moderation to build brand loyalty.' },
      { title: 'Trend Hijacking', desc: 'Capitalizing on viral moments to maximize organic reach.' },
      { title: 'Growth Hacking', desc: 'Tactics designed to rapidly scale follower counts and engagement.' }
    ]
  },
  { 
    id: 'motion', title: 'Motion Graphics', icon: Layers, color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', desc: '2D/3D animation and VFX.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
    details: [
      { title: '3D Product Modeling', desc: 'Photorealistic 3D renders for e-commerce and advertising.' },
      { title: 'Explainer Videos', desc: 'Engaging 2D animations to simplify complex concepts.' },
      { title: 'Logo Animation', desc: 'Dynamic brand identity intros and outros.' },
      { title: 'Visual Effects', desc: 'High-end compositing and post-production polish.' }
    ]
  },
  { 
    id: 'web', title: 'Website Development', icon: Laptop, color: 'from-slate-700 to-slate-900', bg: 'bg-slate-100', desc: 'Premium web apps and digital experiences.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    details: [
      { title: 'UI/UX Design', desc: 'User-centric wireframing and high-fidelity interface design.' },
      { title: 'Front-End Development', desc: 'Performant, responsive applications using React and Tailwind.' },
      { title: 'E-Commerce Solutions', desc: 'Custom Shopify and headless commerce integrations.' },
      { title: 'CMS Integration', desc: 'Scalable content management systems for easy updates.' }
    ]
  },
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

      {/* Side Drawer */}
      <AnimatePresence>
        {selectedService && selected && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full md:w-[450px] lg:w-[550px] bg-background border-l-4 border-foreground h-full overflow-hidden z-10 flex flex-col shadow-2xl"
            >
              <div className="p-6 md:p-8 flex items-center justify-between bg-primary text-primary-foreground shrink-0 border-b-4 border-foreground">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center shrink-0">
                    <selected.icon className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-2xl font-heading tracking-tight leading-none">{selected.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 bg-background/20 hover:bg-background/40 flex items-center justify-center transition-colors shrink-0 border border-transparent hover:border-foreground"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {selected.image && (
                  <div className="w-full h-48 sm:h-64 shrink-0 relative border-b-4 border-foreground">
                    <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="p-6 md:p-8">
                  <p className="font-bold text-lg mb-8 leading-relaxed text-foreground/90">{selected.desc}</p>
                  <h4 className="text-base font-heading font-extrabold text-foreground mb-6 tracking-tight uppercase tracking-widest">Capabilities</h4>
                  <ul className="space-y-6">
                    {selected.details?.map((detail: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className={`mt-1.5 w-4 h-4 bg-primary flex items-center justify-center flex-shrink-0 rounded-sm`}>
                          <div className={`w-1.5 h-1.5 bg-foreground rounded-sm`}></div>
                        </div>
                        <div>
                          <h5 className="font-heading font-bold text-foreground text-base tracking-tight">{detail.title}</h5>
                          <p className="text-foreground/70 text-sm mt-1.5 leading-relaxed">{detail.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t-4 border-foreground bg-muted/20 shrink-0">
                <a 
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="flex items-center justify-between w-full bg-foreground text-background border-2 border-foreground hover:bg-primary hover:text-foreground px-6 py-4 font-bold tracking-widest uppercase transition-colors"
                >
                  Discuss a Project
                  <ArrowRight size={20} className="ml-2" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
