import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Bot, FileText, Database } from 'lucide-react';

export default function ProductsStrip() {
  const products = [
    { name: "Bill Karo POS", icon: <Terminal className="w-6 h-6" />, link: "https://bill-karo-mu.vercel.app/" },
    { name: "Natasha Voice Agent", icon: <Bot className="w-6 h-6" />, link: "https://reelywood2-0.vercel.app/voiceagent" },
    { name: "Gen Invoice Pro", icon: <FileText className="w-6 h-6" />, link: "/products" },
    { name: "Woody OS CRM", icon: <Database className="w-6 h-6" />, link: "/products" }
  ];

  return (
    <section className="py-24 bg-cream text-ink border-y border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="font-extrabold font-heading text-4xl md:text-5xl font-heading mb-4">Our Products</h2>
          <p className="font-mono text-sm tracking-widest uppercase text-ink/60">[ Software Suite ]</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((prod, i) => (
            <a 
              key={i} 
              href={prod.link}
              target={prod.link.startsWith('http') ? "_blank" : "_self"}
              rel={prod.link.startsWith('http') ? "noopener noreferrer" : ""}
              className="bg-background border border-border p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors group rounded-sm shadow-sm"
            >
              <div className="text-ink/50 group-hover:text-primary mb-4 transition-colors">
                {prod.icon}
              </div>
              <span className="font-sans font-medium text-sm text-ink">{prod.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
