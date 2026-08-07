import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const testimonials = [
  {
    quote: "Reelywood helped us increase our local footfall by 3x within just 2 months using AI Reels and WhatsApp automation.",
    author: "Nilesh Patel",
    role: "Owner",
    company: "Nilesh Stores"
  },
  {
    quote: "Their AIGC campaigns gave us a premium look that would have normally cost 10x more. The ROAS has been incredible.",
    author: "Anjali Desai",
    role: "CMO",
    company: "StyleVeda"
  },
  {
    quote: "The combination of their creative production and the CRM automation SaaS completely transformed how we handle leads.",
    author: "Rahul Sharma",
    role: "Director",
    company: "Sharma Real Estate"
  },
  {
    quote: "Our engagement went through the roof after partnering with them. The AI-generated content is indistinguishable from big-budget studio work.",
    author: "Priya Singh",
    role: "Founder",
    company: "Lumiere Beauty"
  },
  {
    quote: "The speed at which they iterate is insane. We went from brief to a full multi-platform campaign in days.",
    author: "Vikram Mehta",
    role: "VP Marketing",
    company: "TechNova"
  },
  {
    quote: "Not just an agency, they are an extension of our team. Their data-driven approach to creative is unmatched.",
    author: "Sara Khan",
    role: "Head of Digital",
    company: "FitLife India"
  },
  {
    quote: "We've seen a 40% drop in CAC since we started using their dynamic ad generation. Highly recommended.",
    author: "Arjun Reddy",
    role: "CEO",
    company: "QuickCom"
  },
  {
    quote: "Their understanding of Gen-Z trends combined with AI tools makes them the ultimate growth partner.",
    author: "Riya Kapoor",
    role: "Brand Manager",
    company: "Z-Apparel"
  },
  {
    quote: "From strategy to execution, Reelywood has been flawless. They truly understand how to capture attention.",
    author: "Dev Joshi",
    role: "Creative Director",
    company: "Joshi & Co."
  }
];

const TestimonialCard = ({ quote, author, role, company }: any) => (
  <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-sm border border-border mb-6">
    <div className="flex gap-1 text-primary mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
    <p className="font-sans font-medium text-lg leading-relaxed mb-8">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
        {author.charAt(0)}
      </div>
      <div>
        <div className="font-heading font-bold text-lg">{author}</div>
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">{role}, {company}</div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -500]);
  const y2 = useTransform(smoothProgress, [0, 1], [-500, 0]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -500]);

  const col1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)];
  const col2 = [...testimonials.slice(3, 6), ...testimonials.slice(3, 6)];
  const col3 = [...testimonials.slice(6, 9), ...testimonials.slice(6, 9)];

  return (
    <section ref={containerRef} className="py-32 bg-background text-foreground border-b border-border overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center mb-16">
        <div className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground mb-6 uppercase tracking-widest font-mono">
          [ Testify ]
        </div>
        <h2 className="font-extrabold font-heading text-5xl md:text-6xl mb-6 tracking-tight">
          Client Success.
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Don't just take our word for it. Here's what our partners have to say about working with Reelywood.
        </p>
      </div>
      
      <div className="relative h-[800px] max-w-7xl mx-auto px-6 md:px-12 overflow-hidden">
        {/* Top/Bottom gradient masks */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          <motion.div style={{ y: y1 }} className="flex flex-col">
            {col1.map((t, i) => <TestimonialCard key={`col1-${i}`} {...t} />)}
          </motion.div>
          <motion.div style={{ y: y2 }} className="hidden md:flex flex-col">
            {col2.map((t, i) => <TestimonialCard key={`col2-${i}`} {...t} />)}
          </motion.div>
          <motion.div style={{ y: y3 }} className="hidden lg:flex flex-col">
            {col3.map((t, i) => <TestimonialCard key={`col3-${i}`} {...t} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
