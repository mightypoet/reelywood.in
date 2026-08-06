import React from 'react';

const team = [
  { name: "Rahul Patel", role: "Creative Director", img: "1507003211169-0a1dd7228f2d" },
  { name: "Sneha Desai", role: "Head of Growth", img: "1494790108377-be9c29b29330" },
  { name: "Amit Shah", role: "AI Strategist", img: "1539571696357-5a69c17a67c6" },
  { name: "Pooja Mehta", role: "Lead Producer", img: "1517841905240-472988babdf9" }
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="font-extrabold font-heading text-4xl md:text-5xl font-heading mb-4">The Team</h2>
          <p className="font-mono text-sm tracking-widest uppercase text-foreground/60">[ Leadership ]</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-muted rounded-sm mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                <img 
                  src={`https://images.unsplash.com/photo-${member.img}?auto=format&fit=crop&q=80&w=400&h=500`}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="font-extrabold font-heading text-xl">{member.name}</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
