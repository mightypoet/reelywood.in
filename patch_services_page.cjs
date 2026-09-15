const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

if (!code.includes('import PricingSection')) {
  code = code.replace(
    "import ServicesSection from '../components/sections/Services';", 
    "import ServicesSection from '../components/sections/Services';\nimport PricingSection from '../components/sections/PricingSection';\nimport WhyUsSection from '../components/sections/WhyUsSection';"
  );
}

// Ensure WhyUsSection exists
const whyUsCode = `
import React from 'react';
import { ShieldCheck, Globe, Zap } from 'lucide-react';

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-zinc-950 text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 mb-6 uppercase tracking-widest font-mono">
            [ Why us? ]
          </div>
          <h2 className="font-extrabold font-heading text-4xl md:text-5xl mb-6 tracking-tight">
            Your Next-Gen Marketing Partner.
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our offerings range from graphic design and branding strategy to website development and video production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-[#9d4edd]/20 flex items-center justify-center mb-6 text-[#9d4edd]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">99% OTP Delivery Rate</h3>
            <p className="text-white/60">
              Reliable Communication Platform-as-a-Service (CPaaS) guaranteeing near-perfect delivery for your critical messages via SMS and RCS.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 text-blue-500">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Zero Friction Onboarding</h3>
            <p className="text-white/60">
              Free testing, plus no development or integration charges for our communication services. Get started instantly.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-500">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Global Reach</h3>
            <p className="text-white/60">
              Cross-industry expertise and impact. From Reels and Lead Generation to Meta Ads and Google Business Manager, we scale you globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('src/components/sections/WhyUsSection.tsx', whyUsCode.trim());

// Update the route inside Services.tsx
code = code.replace(
  /<div className="flex-grow pt-16">\s*<ServicesSection \/>\s*<\/div>/g,
  '<div className="flex-grow pt-16">\n            <ServicesSection />\n            <WhyUsSection />\n            <PricingSection />\n          </div>'
);

fs.writeFileSync('src/pages/Services.tsx', code);
