import React from 'react';

const team = [
  { name: "Aditya Das", role: "COO, Co-Founder", img: "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-07%20at%204.15.52%20PM.jpeg" },
  { name: "Rohan Das", role: "CEO, Founder", img: "https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%207%2C%202026%2C%2006_20_51%20PM.png" }
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <div className="mb-16">
          <h2 className="font-extrabold font-heading text-4xl md:text-5xl mb-4">The Team</h2>
          <p className="font-mono text-sm tracking-widest uppercase text-foreground/60">[ Leadership ]</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-16 md:gap-32">
          {team.map((member, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 p-[3px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 mb-6 transition-transform duration-500 group-hover:scale-105 shadow-xl">
                <div className="w-full h-full rounded-full border-[4px] border-background overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                  <img 
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-extrabold font-heading text-2xl">{member.name}</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mt-2">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
