import React from 'react';
import { Bot, LineChart, Code2, Database, LayoutDashboard, FileText, Zap, Settings2 } from 'lucide-react';

const solutions = [
  {
    title: "Custom CRM",
    description: "Tailored pipeline & client management systems with Telegram/WhatsApp integrations.",
    icon: Database,
  },
  {
    title: "Natasha Sales Agent",
    description: "Conversational AI voice & chat agent for 24/7 automated qualification and bookings.",
    icon: Bot,
  },
  {
    title: "AI Personal Assistant",
    description: "Custom workflow bot to automate daily founder/team tasks.",
    icon: Zap,
  },
  {
    title: "Bill Karo POS",
    description: "Fast, lightweight point-of-sale system for modern retail and dining.",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory Management System",
    description: "Real-time stock tracking and predictive supply reordering.",
    icon: LineChart,
  },
  {
    title: "Dorky AI",
    description: "Intelligent internal assistant and document retrieval engine.",
    icon: FileText,
  },
  {
    title: "Pro Invoice Generator",
    description: "Automated GST-ready billing and recurring invoicing.",
    icon: FileText,
  },
  {
    title: "Custom Business Tools",
    description: "Bespoke internal dashboards, web portals, and micro-SaaS.",
    icon: Code2,
  },
];

export default function SolutionsGrid() {
  return (
    <section className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest uppercase text-foreground/60 mb-4">[ Software & Solutions ]</p>
          <h2 className="font-extrabold text-4xl md:text-5xl font-heading tracking-tight text-foreground mb-6">
            Proprietary Products &<br/>Custom Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We build and deploy specialized software solutions designed to automate workflows and scale operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <div key={idx} className="bg-card border border-border p-6 hover:border-foreground transition-colors group flex flex-col h-full rounded-sm">
                <div className="w-12 h-12 bg-background border border-border flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">{solution.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{solution.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
