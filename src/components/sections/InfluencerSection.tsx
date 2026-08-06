import React from 'react';
import { motion } from 'framer-motion';

export default function InfluencerSection() {
  return (
    <section className="py-24 bg-cream text-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="font-mono text-sm tracking-widest uppercase text-maroon mb-6">[ Creators ]</p>
            <h2 className="font-heading text-4xl md:text-5xl font-heading">Influencer Network</h2>
          </div>
          <p className="font-sans font-light text-ink/70 max-w-md">Access our vetted roster of native creators who understand platform nuances and know how to drive authentic engagement.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
             <div key={i} className="aspect-[4/5] bg-ink/10 rounded-sm relative overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors z-10"></div>
               <img src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=formathttps://source.unsplash.com/random/400x500?portrait,fashion,creator&sig=${i}fit=crophttps://source.unsplash.com/random/400x500?portrait,fashion,creator&sig=${i}q=80https://source.unsplash.com/random/400x500?portrait,fashion,creator&sig=${i}w=400https://source.unsplash.com/random/400x500?portrait,fashion,creator&sig=${i}h=500`} alt="Creator" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
               <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="font-heading text-cream text-lg">Creator {i}</p>
                 <p className="font-mono text-xs text-cream/70 uppercase">Lifestyle</p>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
