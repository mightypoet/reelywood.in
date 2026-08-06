import fs from 'fs';

const content = `import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

type Project = {
  id: string;
  title: string;
  category: string;
  media_type: 'image' | 'video' | 'chart';
  media_url: string;
  client?: string;
  industry?: string;
  description?: string;
  stats?: {
    revenue?: number;
    roas?: number;
    ctr?: number;
    cpa?: number;
    chart_data?: any[];
  };
};

type BrandGroup = {
  name: string;
  coverImage: string;
  projects: Project[];
};

export default function Portfolio({ limit }: { limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<BrandGroup | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    
    // Fetch all categories concurrently with joined brand data
    const [
      creativeRes,
      aigcRes,
      influencerRes,
      performanceRes
    ] = await Promise.all([
      supabase.from('creative_studio').select('*, brands(name)'),
      supabase.from('aigc').select('*, brands(name)'),
      supabase.from('influencer_marketing').select('*, brands(name)'),
      supabase.from('performance_marketing').select('*, brands(name)')
    ]);

    const formattedProjects: Project[] = [];

    if (creativeRes.data) {
      formattedProjects.push(...creativeRes.data.map(item => ({
        id: item.id,
        title: item.title,
        category: 'Creative Studio',
        media_type: item.media_type,
        media_url: item.media_url,
        client: item.brands?.name || 'Unknown Brand'
      })));
    }

    if (aigcRes.data) {
      formattedProjects.push(...aigcRes.data.map(item => ({
        id: item.id,
        title: item.title,
        category: 'AIGC',
        media_type: 'video' as const,
        media_url: item.media_url,
        client: item.brands?.name || 'Unknown Brand'
      })));
    }

    if (influencerRes.data) {
      formattedProjects.push(...influencerRes.data.map(item => ({
        id: item.id,
        title: item.brands?.name || item.brand_name,
        category: 'Influencer Marketing',
        media_type: 'video' as const,
        media_url: item.media_url,
        description: item.campaign_details,
        client: item.brands?.name || item.brand_name,
      })));
    }

    if (performanceRes.data) {
      formattedProjects.push(...performanceRes.data.map(item => ({
        id: item.id,
        title: item.campaign_name,
        category: 'Performance',
        media_type: 'chart' as const, 
        media_url: item.brand_logo || '',
        client: item.brands?.name || 'Unknown Brand',
        stats: {
          revenue: item.revenue,
          roas: item.roas,
          ctr: item.ctr,
          cpa: item.cpa,
          chart_data: item.chart_data
        }
      })));
    }

    setProjects(formattedProjects);
    setLoading(false);
  };

  const brandGroups = useMemo(() => {
    const groups: Record<string, Project[]> = {};
    projects.forEach(p => {
      const brand = p.client || 'Unknown Brand';
      if (!groups[brand]) groups[brand] = [];
      groups[brand].push(p);
    });
    
    let result = Object.entries(groups).map(([name, brandProjects]) => {
      const coverImage = brandProjects.find(p => p.media_type === 'image')?.media_url 
        || brandProjects.find(p => p.media_type === 'video')?.media_url 
        || brandProjects[0]?.media_url || '';
        
      return {
        name,
        projects: brandProjects,
        coverImage
      };
    });

    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  }, [projects, limit]);

  return (
    <section id="portfolio" className="py-24 relative z-10 bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-20 gap-8 relative">
          <div className="hidden md:block absolute -left-12 top-4 text-foreground/50 text-sm font-medium">
            ({brandGroups.length})
          </div>
          
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl lg:text-[120px] font-bold tracking-tighter text-foreground mb-2 leading-[0.9]"
            >
              Case<br />Studies.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground"
            >
              2021-26
            </motion.div>
          </div>
          
          <div className="flex flex-col justify-end max-w-[320px] self-end md:pb-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-foreground/70 font-medium leading-relaxed mb-8 md:mb-12"
            >
              A curated gallery of our brand partners. Click any brand to explore our AI-first creative, influencer, and performance work.
            </motion.p>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {brandGroups.map((brand) => (
                <motion.div
                  layout
                  key={brand.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  onClick={() => setSelectedBrand(brand)}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/3] bg-foreground/5"
                >
                  <img 
                    src={brand.coverImage} 
                    alt={brand.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight text-center">{brand.name}</h3>
                    <span className="px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/30 flex items-center gap-2">
                      View Project <ArrowUpRight size={16} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Brand Bento Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-xl flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              {/* Sticky Header */}
              <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{selectedBrand.name}</h2>
                  <p className="text-sm text-foreground/60 font-medium">Selected Works & Performance</p>
                </div>
                <button 
                  onClick={() => setSelectedBrand(null)}
                  className="w-12 h-12 bg-foreground/5 hover:bg-foreground/10 rounded-full flex items-center justify-center transition-colors text-foreground"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Bento Grid */}
              <div className="max-w-[1400px] mx-auto p-6 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-4 md:gap-6">
                  {selectedBrand.projects.map((project, idx) => {
                    // Determine Bento sizing based on category
                    let spanClass = "col-span-1 row-span-1";
                    
                    if (project.category === "Influencer Marketing") {
                      spanClass = "col-span-1 row-span-2"; // Tall
                    } else if (project.category === "AIGC") {
                      spanClass = "col-span-1 md:col-span-2 row-span-1 lg:row-span-2"; // Wide & Large
                    } else {
                      spanClass = "col-span-1 md:col-span-1 row-span-1"; // Square
                    }

                    return (
                      <motion.div 
                        key={project.id + idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={\`relative rounded-3xl overflow-hidden bg-foreground/5 border border-border/50 group \${spanClass}\`}
                      >
                        {project.media_type === 'image' && (
                          <img 
                            src={project.media_url} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        {project.media_type === 'video' && (
                          <video 
                            src={project.media_url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        {project.media_type === 'chart' && (
                          <div className="absolute inset-0 p-6 flex flex-col bg-background/50 backdrop-blur-sm">
                            <div className="mb-4">
                              <div className="flex items-center gap-3 mb-1">
                                <div className="text-3xl font-bold text-foreground tracking-tight">
                                  ₹{project.stats?.revenue !== undefined ? Number(project.stats.revenue).toLocaleString('en-IN') : '0'}
                                </div>
                              </div>
                              <div className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Revenue Generated</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="bg-background/80 rounded-xl p-3 border border-border/50">
                                <div className="text-lg font-bold text-foreground mb-0.5">{project.stats?.roas || '0'}x</div>
                                <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">ROAS</div>
                              </div>
                              <div className="bg-background/80 rounded-xl p-3 border border-border/50">
                                <div className="text-lg font-bold text-foreground mb-0.5">₹{project.stats?.cpa || '0'}</div>
                                <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">CPA</div>
                              </div>
                            </div>
                            <div className="flex-1 mt-auto overflow-hidden opacity-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={project.stats?.chart_data || []}>
                                  <defs>
                                    <linearGradient id="colorRevenueGrid" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRevenueGrid)" strokeWidth={3} />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}

                        {/* Overlay with info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full mb-2 w-max">
                            {project.category}
                          </span>
                          <h4 className="text-white font-bold text-lg leading-tight">{project.title}</h4>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
`;

fs.writeFileSync('src/components/sections/Portfolio.tsx', content);
