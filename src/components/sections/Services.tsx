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

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const selected = servicesList.find(s => s.id === selectedService);

  return (
    <section id="services" className="py-24 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-heading font-medium tracking-tighter text-foreground mb-6 tracking-tight"
          >
            End-to-End <br/> <span className="text-primary">Creative Capabilities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/70 font-bold"
          >
            From concept to conversion, we build digital experiences that capture attention and drive growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedService(service.id)}
              className={`group cursor-pointer p-8 bg-background border border-border hover:border-primary transition-all duration-300 relative overflow-hidden`}
            >
              
              <div className={`w-14 h-14 bg-foreground flex items-center justify-center mb-6 relative z-10`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <service.icon size={24} className="text-background group-hover:text-primary transition-colors" />
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-medium text-foreground mb-3 relative z-10 tracking-tight">{service.title}</h3>
              <p className="text-foreground/70 text-sm font-bold mb-6 relative z-10">{service.desc}</p>
              
              <div className="flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors relative z-10 tracking-tight tracking-widest">
                Explore <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
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
                  <h3 className="text-3xl font-heading font-medium mb-4 tracking-tight leading-none">{selected.title}</h3>
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
