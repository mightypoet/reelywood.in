import React from 'react';

export default function BentoFeatureSection() {
  return (
    <section className="py-24 bg-background px-6 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-semibold text-foreground mb-4 uppercase tracking-widest">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">Cpass Platform</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto font-bold text-lg">
            Everything you need to manage your creative operations in one unified workspace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          <div className="col-span-1 md:col-span-2 bg-card border border-border rounded-[2rem] p-8 flex flex-col justify-end relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10 max-w-lg">
              <h3 className="text-3xl font-extrabold font-heading mb-3 tracking-tight">Automated Workflows</h3>
              <p className="text-foreground/70 font-medium">Streamline your content creation process with AI-driven task management and approval loops.</p>
            </div>
            {/* Abstract Graphic */}
            <div className="absolute top-8 right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
          </div>

          <div className="col-span-1 bg-card border border-border rounded-[2rem] p-8 flex flex-col justify-end relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold font-heading mb-3 tracking-tight">Real-time Sync</h3>
              <p className="text-foreground/70 font-medium">Connect seamlessly with your favorite tools.</p>
            </div>
          </div>

          <div className="col-span-1 bg-card border border-border rounded-[2rem] p-8 flex flex-col justify-end relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold font-heading mb-3 tracking-tight">Smart Analytics</h3>
              <p className="text-foreground/70 font-medium">Track performance metrics across all channels.</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-card border border-border rounded-[2rem] p-8 flex flex-col justify-end relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10 max-w-lg">
              <h3 className="text-3xl font-extrabold font-heading mb-3 tracking-tight">Creative Asset Hub</h3>
              <p className="text-foreground/70 font-medium">Centralize all your brand assets, media files, and templates with intelligent tagging and search capabilities.</p>
            </div>
             {/* Abstract Graphic */}
             <div className="absolute top-12 right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  )
}
