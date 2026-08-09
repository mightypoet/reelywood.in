import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FinalCTA from '../components/sections/FinalCTA';
import { ArrowRight, ExternalLink } from 'lucide-react';

const products = [
  {
    title: "Bill Karo POS",
    description: "A modern Point of Sale system designed to streamline your checkout process, manage inventory, and generate insightful sales reports. Built for speed and reliability.",
    link: "https://bill-karo-mu.vercel.app/",
    features: ["Fast Checkout", "Inventory Management", "Sales Reports", "Cloud Sync"]
  },
  {
    title: "Natasha Voice Agent",
    description: "An AI-powered voice agent that handles customer inquiries, schedules appointments, and provides 24/7 support. Natural conversations that convert.",
    link: "https://reelywood2-0.vercel.app/voiceagent",
    features: ["Natural Language Processing", "24/7 Availability", "Appointment Scheduling", "Multi-language Support"]
  },
  {
    title: "Gen Invoice Pro",
    description: "Create professional, compliant invoices in seconds. Track payments, send automated reminders, and manage your cash flow with ease.",
    link: "#",
    features: ["Automated Invoicing", "Payment Tracking", "Custom Templates", "Tax Compliance"]
  },
  {
    title: "Woody OS CRM",
    description: "A comprehensive Customer Relationship Management platform tailored for modern businesses. Centralize your customer data, automate workflows, and close more deals.",
    link: "#",
    features: ["Contact Management", "Sales Pipeline", "Workflow Automation", "Analytics Dashboard"]
  }
];

export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground mb-6 uppercase tracking-widest font-mono">
                [ Our Suite ]
              </div>
              <h1 className="font-extrabold text-5xl md:text-6xl tracking-tight text-foreground mb-6 font-heading">
                Our Products
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Powerful, AI-driven software solutions designed to automate your operations, boost sales, and scale your business effortlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold font-heading text-foreground mb-3">{product.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {product.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold border border-border">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    {product.link !== "#" ? (
                      <a 
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
                      >
                        Explore Product <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="inline-flex items-center justify-center gap-2 w-full bg-secondary text-muted-foreground font-semibold px-6 py-3 rounded-md cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}
