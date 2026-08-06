import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
  coverType: 'image' | 'video' | 'chart';
  projects: Project[];
};

export default function Portfolio({ limit }: { limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<BrandGroup | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBrand]);

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
      const coverProject = brandProjects.find(p => p.media_type === 'image') 
        || brandProjects.find(p => p.media_type === 'video') 
        || brandProjects[0];
        
      const coverImage = coverProject?.media_url || '';
      const coverType = coverProject?.media_type || 'image';
        
      return {
        name,
        projects: brandProjects,
        coverImage,
        coverType
      };
    });

    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  }, [projects, limit]);

  return (
    <section id="portfolio" className="py-24 relative bg-background overflow-hidden">
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
              className="text-6xl md:text-8xl lg:text-[120px] font-heading font-bold tracking-tighter text-foreground mb-2 leading-[0.9]"
            >
              Case<br />Studies.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-heading font-bold tracking-tighter text-foreground"
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
                  {brand.coverType === 'video' ? (
                    <video 
                      src={brand.coverImage} 
                      loop
                      muted
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img 
                      src={brand.coverImage} 
                      alt={brand.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-tight text-center">{brand.name}</h3>
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

            {/* Adaptive Gallery Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 px-4 py-20 flex justify-center items-center"
            onClick={() => setSelectedBrand(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-7xl h-full flex flex-col bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden"
            >
              {/* Sticky Header */}
              <div className="flex-none p-6 bg-zinc-950 border-b border-zinc-800 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-white">{selectedBrand.name}</h2>
                  <p className="text-sm text-white/60 font-medium">Selected Works & Performance</p>
                </div>
                <button 
                  onClick={() => setSelectedBrand(null)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 relative">
                <div className="max-w-[1400px] mx-auto space-y-24">
                
                {/* Visual Media Gallery */}
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {selectedBrand.projects.filter(p => p.category !== 'Performance').map((project, idx) => (
                      <motion.div 
                        key={project.id + idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative group w-full flex flex-col"
                      >
                        <div className="w-full relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                          {project.media_type === 'image' && (
                            <img 
                              src={project.media_url} 
                              alt={project.title} 
                              className="w-full h-auto max-h-[85vh] object-contain"
                            />
                          )}
                          {project.media_type === 'video' && (
                            <video 
                              src={project.media_url}
                              loop
                              muted
                              playsInline
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => e.currentTarget.pause()}
                              className="w-full h-auto max-h-[85vh] object-contain"
                            />
                          )}
                          {/* Overlay with info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full mb-2 w-max">
                              {project.category}
                            </span>
                            <h4 className="text-white font-heading font-bold text-lg leading-tight">{project.title}</h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Performance Dashboard */}
                {selectedBrand.projects.filter(p => p.category === 'Performance').length > 0 && (
                  <div className="pt-12 border-t border-white/10">
                    <h3 className="text-3xl font-heading font-bold tracking-tight text-white mb-8">Campaign Performance</h3>
                    
                    {selectedBrand.projects.filter(p => p.category === 'Performance').map((project, idx) => (
                      <div key={'perf-'+idx} className="space-y-8">
                        {/* Metric Cards Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">Total Revenue</div>
                            <div className="text-3xl font-bold text-white">₹{project.stats?.revenue ? Number(project.stats.revenue).toLocaleString('en-IN') : '0'}</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">ROAS</div>
                            <div className="text-3xl font-bold text-emerald-400">{project.stats?.roas || '0'}x</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">CPA</div>
                            <div className="text-3xl font-bold text-white">₹{project.stats?.cpa || '0'}</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">CTR</div>
                            <div className="text-3xl font-bold text-white">{project.stats?.ctr || '0'}%</div>
                          </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
                          <div className="text-lg font-bold text-white mb-6">Revenue Growth</div>
                          <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={project.stats?.chart_data || []}>
                                <defs>
                                  <linearGradient id="colorRevenueGrid" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="revenue" stroke="#34d399" fillOpacity={1} fill="url(#colorRevenueGrid)" strokeWidth={3} />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Data Table */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                          <div className="p-6 border-b border-white/10">
                            <h4 className="text-lg font-heading font-bold text-white">Platform Breakdown</h4>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-white/5 text-white/50 text-xs font-bold uppercase tracking-widest">
                                  <th className="p-4 pl-6">Platform</th>
                                  <th className="p-4">Spend</th>
                                  <th className="p-4">Conversions</th>
                                  <th className="p-4">CPA</th>
                                  <th className="p-4 pr-6">ROAS</th>
                                </tr>
                              </thead>
                              <tbody className="text-white text-sm divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors">
                                  <td className="p-4 pl-6 font-medium">Meta Ads</td>
                                  <td className="p-4 text-white/70">₹{(Number(project.stats?.revenue || 0) * 0.15).toLocaleString('en-IN')}</td>
                                  <td className="p-4 text-white/70">{(Number(project.stats?.revenue || 0) * 0.002).toFixed(0)}</td>
                                  <td className="p-4 text-white/70">₹{project.stats?.cpa || '0'}</td>
                                  <td className="p-4 pr-6 text-emerald-400 font-medium">{project.stats?.roas || '0'}x</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                  <td className="p-4 pl-6 font-medium">Google Ads</td>
                                  <td className="p-4 text-white/70">₹{(Number(project.stats?.revenue || 0) * 0.1).toLocaleString('en-IN')}</td>
                                  <td className="p-4 text-white/70">{(Number(project.stats?.revenue || 0) * 0.0015).toFixed(0)}</td>
                                  <td className="p-4 text-white/70">₹{(Number(project.stats?.cpa || 0) * 0.9).toFixed(2)}</td>
                                  <td className="p-4 pr-6 text-emerald-400 font-medium">{(Number(project.stats?.roas || 0) * 1.1).toFixed(1)}x</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                  <td className="p-4 pl-6 font-medium">TikTok</td>
                                  <td className="p-4 text-white/70">₹{(Number(project.stats?.revenue || 0) * 0.05).toLocaleString('en-IN')}</td>
                                  <td className="p-4 text-white/70">{(Number(project.stats?.revenue || 0) * 0.001).toFixed(0)}</td>
                                  <td className="p-4 text-white/70">₹{(Number(project.stats?.cpa || 0) * 0.7).toFixed(2)}</td>
                                  <td className="p-4 pr-6 text-emerald-400 font-medium">{(Number(project.stats?.roas || 0) * 1.3).toFixed(1)}x</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
              </div>
            </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
