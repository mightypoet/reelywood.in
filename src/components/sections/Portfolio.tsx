import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X, Loader2, ChevronDown, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categories = ['All', 'Creative Studio', 'AIGC', 'Influencer Marketing', 'Performance'];

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
  }
};

export default function Portfolio({ limit }: { limit?: number }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);

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
        media_url: item.brand_logo_url || '',
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

  const brandsList = useMemo(() => {
    const brands = Array.from(new Set(projects.map(p => p.client).filter(Boolean)));
    return ['All Brands', ...brands];
  }, [projects]);

  const filteredProjects = projects.filter(p => {
    const matchCategory = activeTab === 'All' || p.category === activeTab;
    const matchBrand = selectedBrand === 'All Brands' || p.client === selectedBrand;
    return matchCategory && matchBrand;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const projectDetails = projects.find(p => p.id === selectedProject);

  return (
    <section id="portfolio" className="py-24 relative z-10 bg-background border border-border mx-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-heading font-medium tracking-tighter text-foreground mb-6 tracking-tight"
            >
              Selected Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-foreground/70 font-bold"
            >
              A showcase of our best campaigns, commercials, and digital experiences across all creative disciplines.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Brand Filter Dropdown */}
            <div className="relative self-end z-20">
              <button 
                onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                className="flex items-center gap-2 px-5 py-2.5 bg-background border border-border text-sm font-bold text-foreground hover:border-primary transition-colors tracking-widest tracking-tight"
              >
                {selectedBrand}
                <ChevronDown size={16} className={`transition-transform ${isBrandDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isBrandDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden py-2"
                  >
                    {brandsList.map(brand => (
                      <button
                        key={brand}
                        onClick={() => { setSelectedBrand(brand); setIsBrandDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                          selectedBrand === brand ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2.5 text-sm font-bold tracking-widest tracking-tight border transition-all ${
                    activeTab === cat 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-transparent text-foreground border-border hover:bg-foreground hover:text-background hover:border-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-white dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No projects found for {selectedBrand !== 'All Brands' ? selectedBrand : 'this category'}.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  onClick={() => setSelectedProject(project.id)}
                  className="group relative cursor-pointer overflow-hidden aspect-[4/5] bg-background border border-border"
                >
                  {project.media_type === 'image' ? (
                    <img 
                      src={project.media_url} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                    />
                  ) : project.media_type === 'video' ? (
                    <video 
                      src={project.media_url} 
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-background p-6 flex flex-col pt-12">
                      {project.media_url && (
                        <div className="absolute top-6 right-6 w-12 h-12 rounded-md bg-white p-1 border border-border flex items-center justify-center z-10">
                          <img src={project.media_url} alt="Brand Logo" className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="text-3xl font-heading font-medium text-foreground">
                            ₹{project.stats?.revenue !== undefined ? Number(project.stats.revenue).toLocaleString('en-IN') : '0'}
                          </div>
                          <span className="text-xs font-bold text-background bg-foreground px-2 py-1 flex items-center tracking-widest">
                            <TrendingUp size={12} className="mr-1" /> +24%
                          </span>
                        </div>
                        <div className="text-xs font-bold text-foreground/70 tracking-tight tracking-widest">Revenue Generated</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-background p-4 border border-border">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xl font-heading font-medium text-foreground">{project.stats?.roas || '0'}x</div>
                            <span className="text-[10px] font-bold text-foreground/70">+34%</span>
                          </div>
                          <div className="text-[10px] font-bold text-foreground/70 tracking-tight tracking-widest">ROAS</div>
                        </div>
                        <div className="bg-background p-4 border border-border">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xl font-heading font-medium text-foreground">₹{project.stats?.cpa || '0'}</div>
                            <span className="text-[10px] font-bold text-foreground/70">-12%</span>
                          </div>
                          <div className="text-[10px] font-bold text-foreground/70 tracking-tight tracking-widest">CPA</div>
                        </div>
                      </div>
                      <div className="flex-1 mt-auto overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
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
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-end">
                      {project.client && (
                        <span className="px-3 py-1.5 bg-foreground text-background text-xs font-bold tracking-widest tracking-tight border border-border">
                          {project.client}
                        </span>
                      )}
                    </div>
                    
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2 mb-3">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold tracking-tight tracking-widest border border-border">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-heading font-medium text-foreground mb-2 tracking-tight">{project.title}</h3>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 z-10 border border-border">
                    {project.media_type === 'video' ? <Play size={24} fill="currentColor" /> : project.media_type === 'chart' ? <ArrowUpRight size={28} /> : <ArrowUpRight size={28} />}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        <div className="mt-16 text-center">
          <button onClick={() => { setActiveTab('All'); setSelectedBrand('All Brands'); }} className="inline-block bg-primary text-primary-foreground border border-transparent hover:border-foreground hover:bg-foreground hover:text-background px-8 py-4 text-sm font-bold tracking-widest tracking-tight transition-colors">
            View All Projects
          </button>
        </div>
      </div>

      {/* Project Modal (Brief View) */}
      <AnimatePresence>
        {selectedProject && projectDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-background border border-border shadow-2xl flex flex-col my-auto max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-border shrink-0">
                <div>
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold tracking-widest tracking-tight mr-3 inline-block">
                    {projectDetails.category}
                  </span>
                  <span className="font-heading text-xl text-foreground tracking-tight">{projectDetails.title}</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-foreground/5 transition-colors text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-foreground/5 border border-border">
                    {projectDetails.media_type === 'image' ? (
                      <img 
                        src={projectDetails.media_url} 
                        alt={projectDetails.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : projectDetails.media_type === 'video' ? (
                      <video 
                        src={projectDetails.media_url}
                        autoPlay
                        controls
                        className="absolute inset-0 w-full h-full object-cover bg-black"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-6 bg-background">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projectDetails.stats?.chart_data || []}>
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
                    )}
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    {projectDetails.client && (
                      <div className="mb-6">
                        <p className="text-xs font-bold tracking-widest tracking-tight text-foreground/50 uppercase mb-1">Client</p>
                        <p className="text-2xl font-heading text-foreground">{projectDetails.client}</p>
                      </div>
                    )}
                    
                    <div className="mb-8">
                      <p className="text-xs font-bold tracking-widest tracking-tight text-foreground/50 uppercase mb-3">Brief overview</p>
                      <p className="text-foreground/80 font-light leading-relaxed">
                        {projectDetails.description || 'A quick look at the creative execution and strategic direction for this campaign. Our team focused on driving engagement through targeted creative and optimized delivery.'}
                      </p>
                    </div>
                    
                    {projectDetails.stats && (
                      <div>
                        <p className="text-xs font-bold tracking-widest tracking-tight text-foreground/50 uppercase mb-4">Key Metrics</p>
                        <div className="grid grid-cols-2 gap-4">
                          {projectDetails.stats.revenue !== undefined && (
                            <div className="bg-background border border-border p-4">
                              <p className="text-xs font-bold tracking-widest text-foreground/60 mb-1">REVENUE</p>
                              <p className="text-xl font-heading text-foreground">₹{Number(projectDetails.stats.revenue).toLocaleString('en-IN')}</p>
                            </div>
                          )}
                          {projectDetails.stats.roas !== undefined && (
                            <div className="bg-background border border-border p-4">
                              <p className="text-xs font-bold tracking-widest text-foreground/60 mb-1">ROAS</p>
                              <p className="text-xl font-heading text-foreground">{projectDetails.stats.roas}x</p>
                            </div>
                          )}
                          {projectDetails.stats.ctr !== undefined && (
                            <div className="bg-background border border-border p-4">
                              <p className="text-xs font-bold tracking-widest text-foreground/60 mb-1">CTR</p>
                              <p className="text-xl font-heading text-foreground">{projectDetails.stats.ctr}%</p>
                            </div>
                          )}
                          {projectDetails.stats.cpa !== undefined && (
                            <div className="bg-background border border-border p-4">
                              <p className="text-xs font-bold tracking-widest text-foreground/60 mb-1">CPA</p>
                              <p className="text-xl font-heading text-foreground">₹{projectDetails.stats.cpa}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
