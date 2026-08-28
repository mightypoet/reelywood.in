import React from 'react';
import { motion } from 'framer-motion';
import { RadialScrollGallery } from '../ui/portfolio-and-image-gallery';
import { Users } from 'lucide-react';

const influencers = [
  { id: 1, name: "Aisha Sharma", category: "Fashion & Lifestyle", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: 2, name: "Rohan Das", category: "Tech & Gadgets", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: 3, name: "Priya Patel", category: "Beauty & Wellness", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: 4, name: "Kabir Singh", category: "Travel & Adventure", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: 5, name: "Neha Gupta", category: "Food & Culinary", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: 6, name: "Arjun Reddy", category: "Fitness & Sports", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: 7, name: "Mira Kapoor", category: "Art & Design", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=500" },
  { id: 8, name: "Vikram Malhotra", category: "Business & Finance", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400&h=500" }
];

export default function InfluencerSection() {
  // Duplicate array to allow seamless infinite scrolling
  const duplicatedInfluencers = [...influencers, ...influencers];

  return (
    <section className="py-24 bg-background text-foreground border-t border-border overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center mb-16">
        <div className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground mb-6">
          <Users size={14} className="mr-2" />
          Creators
        </div>
        <h2 className="font-extrabold font-heading text-5xl md:text-6xl tracking-tighter mb-6">
          Influencer <span className="text-primary">Network</span>
        </h2>
        <p className="font-sans font-medium text-lg text-foreground/70 max-w-2xl mx-auto mb-4">
          Access our vetted roster of native creators who understand platform nuances and know how to drive authentic engagement.
        </p>
        <p className="font-bold text-2xl text-foreground">
          30k+ Pan-India Influencer Pool
        </p>
      </div>
      
      <div 
        className="w-full overflow-hidden relative flex flex-nowrap"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        <motion.div 
          className="flex flex-nowrap gap-6 pr-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {duplicatedInfluencers.map((influencer, index) => (
            <div
              key={`${influencer.id}-${index}`}
              className="w-[240px] h-[320px] sm:w-[280px] sm:h-[360px] rounded-xl border border-border overflow-hidden relative group shrink-0 transition-transform duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={influencer.image} 
                alt={influencer.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                <p className="font-heading text-white text-xl font-bold mb-1 tracking-tight">{influencer.name}</p>
                <p className="font-mono text-xs text-white/80 uppercase tracking-widest">{influencer.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
