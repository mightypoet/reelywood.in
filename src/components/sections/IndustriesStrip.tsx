import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Utensils, Building2, GraduationCap, HeartPulse, Store } from 'lucide-react';

export default function IndustriesStrip() {
  const industries = [
    { name: "Local Retail", icon: <Store className="w-6 h-6" />, slug: "local-retail-shops" },
    { name: "D2C Brands", icon: <ShoppingBag className="w-6 h-6" />, slug: "d2c-ecommerce" },
    { name: "Restaurants", icon: <Utensils className="w-6 h-6" />, slug: "restaurants-food" },
    { name: "Real Estate", icon: <Building2 className="w-6 h-6" />, slug: "real-estate" },
    { name: "Education", icon: <GraduationCap className="w-6 h-6" />, slug: "education-coaching" },
    { name: "Healthcare", icon: <HeartPulse className="w-6 h-6" />, slug: "healthcare" },
  ];

  return (
    <section className="py-24 bg-cream text-ink border-y border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="font-extrabold font-heading text-4xl md:text-5xl font-heading mb-4">Industries</h2>
          <p className="font-mono text-sm tracking-widest uppercase text-ink/60">[ Domain Expertise ]</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((ind, i) => (
            <Link 
              key={i} 
              to={`/industries/${ind.slug}`} 
              className="bg-background border border-border p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors group rounded-sm shadow-sm"
            >
              <div className="text-ink/50 group-hover:text-primary mb-4 transition-colors">
                {ind.icon}
              </div>
              <span className="font-sans font-medium text-sm text-ink">{ind.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
