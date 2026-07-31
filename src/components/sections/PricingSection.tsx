import React from 'react';

const plans = [
  {
    name: "Growth",
    price: "₹50k",
    period: "/mo",
    desc: "For local businesses looking to build a consistent social presence.",
    features: [
      "4 AI-produced Reels",
      "Basic social management",
      "Monthly performance report"
    ]
  },
  {
    name: "Scale",
    price: "₹1.5L",
    period: "/mo",
    desc: "For D2C brands scaling with performance creative.",
    features: [
      "12 High-converting video assets",
      "A/B testing frameworks",
      "Full ad account management",
      "Bi-weekly strategy calls"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full-funnel marketing engine and custom automated workflows.",
    features: [
      "Unlimited creative production",
      "Custom AI models & workflows",
      "Dedicated account team",
      "24/7 Priority support"
    ]
  }
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest uppercase text-foreground/60 mb-4">[ Plans ]</p>
          <h2 className="text-4xl md:text-5xl font-heading mb-6">Simple, transparent pricing.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`p-8 border rounded-sm relative ${plan.popular ? 'border-primary bg-background' : 'border-border bg-background'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 font-mono text-xs tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading text-2xl mb-2">{plan.name}</h3>
              <p className="font-sans font-light text-sm text-foreground/70 mb-6 h-10">{plan.desc}</p>
              <div className="mb-8">
                <span className="font-heading text-4xl">{plan.price}</span>
                <span className="font-mono text-sm text-foreground/50">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans font-light text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    {f}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 text-sm font-sans font-medium transition-colors border ${plan.popular ? 'bg-primary text-primary-foreground border-primary hover:bg-transparent hover:text-primary' : 'bg-transparent text-foreground border-border hover:border-primary'}`}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
