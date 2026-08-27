import React from 'react';

const team = [
  { 
    name: "Aditya Das", 
    role: "COO, Co-Founder", 
    img: "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-07%20at%204.15.52%20PM.jpeg" 
  },
  { 
    name: "Rohan Das", 
    role: "CEO, Founder", 
    img: "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%207%2C%202026%2C%2006_20_51%20PM.png" 
  }
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-semibold text-foreground mb-4 uppercase tracking-widest">
            Leadership
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">Meet the Team</h2>
          <p className="text-foreground/70 max-w-xl mx-auto font-bold text-lg">
            The visionary minds behind our creative operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[2rem] bg-card border border-border aspect-[4/5] shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={member.img} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-3xl font-bold font-heading text-white mb-2">{member.name}</h3>
                <p className="text-white/80 font-bold text-sm tracking-widest uppercase">{member.role}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/90">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
