import React from 'react';
import { RadialScrollGallery } from '../ui/portfolio-and-image-gallery';
import { Check } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Discovery & Data",
    desc: "We analyze your audience, audit your current content, and define clear performance KPIs."
  },
  {
    num: "02",
    title: "AI-Assisted Strategy",
    desc: "Leveraging our proprietary AI tools to identify trends and map out a high-impact content strategy."
  },
  {
    num: "03",
    title: "Creative Production",
    desc: "Our in-house studio shoots, edits, and produces premium assets tailored to each platform."
  },
  {
    num: "04",
    title: "Distribution & Scale",
    desc: "We deploy content across organic and paid channels, scaling what works in real-time."
  }
];

export default function HowWeWork() {
  return (
    <section className="py-24 bg-background text-foreground relative border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10 text-center">
        <div className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground mb-4">
          [ Our Process ]
        </div>
        <h2 className="font-extrabold font-heading text-4xl md:text-5xl font-heading mb-4">How We Work</h2>
        <p className="text-muted-foreground text-sm max-w-[300px] mx-auto">
          Scroll down to see the steps.
        </p>
      </div>

      <RadialScrollGallery
        className="!min-h-[600px]"
        baseRadius={400}
        mobileRadius={220}
        scrollDuration={1500}
        visiblePercentage={45}
      >
        {(hoveredIndex) =>
          steps.map((item, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div
                key={index}
                className={`
                  w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] 
                  rounded-xl border p-6 flex flex-col justify-between items-start 
                  transition-all duration-500 shadow-sm
                  ${isActive 
                    ? 'bg-primary border-primary text-primary-foreground scale-100 shadow-xl' 
                    : 'bg-card border-border text-card-foreground scale-90 opacity-60'
                  }
                `}
              >
                <div className="w-full flex justify-between items-start">
                  <span className={`font-mono text-xl ${isActive ? 'text-primary-foreground/60' : 'text-primary'}`}>
                    {item.num}
                  </span>
                  {isActive && <Check className="w-6 h-6 text-primary-foreground" />}
                </div>
                
                <div>
                  <h3 className="text-2xl font-extrabold font-heading mb-2">{item.title}</h3>
                  <p className={`text-sm ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })
        }
      </RadialScrollGallery>
    </section>
  );
}
