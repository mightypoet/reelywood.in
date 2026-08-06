import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How does the AI process work?",
    a: "We use custom-trained models to analyze industry trends and generate content frameworks. Human directors then refine these into production-ready assets."
  },
  {
    q: "What is your typical turnaround time?",
    a: "For standard social assets, our AI-assisted workflow allows us to deliver within 5-7 days. Larger campaigns vary based on scope."
  },
  {
    q: "Do you offer pure performance marketing?",
    a: "Yes. Our media buying team handles end-to-end campaign management, optimizing the creative we produce directly against your conversion goals."
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-extrabold font-heading text-4xl md:text-5xl font-heading mb-16 text-center">Questions & Answers</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-border pb-4">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex justify-between items-center w-full py-4 text-left group"
              >
                <span className="font-heading text-xl md:text-2xl group-hover:text-primary transition-colors">{faq.q}</span>
                <ChevronDown className={`transform transition-transform ${openIdx === idx ? 'rotate-180 text-primary' : 'text-border'}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans font-light text-foreground/70 pb-6 pr-12">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
