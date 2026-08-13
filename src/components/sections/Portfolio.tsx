import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X, TrendingUp, GripHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Brand = {
  id: string;
  name: string;
  description?: string;
  cover_image?: string;
};

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
  coverImage?: string;
  coverType: 'image' | 'video' | 'chart';
  projects: Project[];
};

const SortableGalleryItem = ({ project, id }: { project: Project; id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group w-full break-inside-avoid mb-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className={`relative w-full rounded-2xl overflow-hidden border ${isDragging ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-zinc-800'} bg-white/5`}>
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners} 
          className="absolute top-3 left-3 z-20 p-2 bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
        >
          <GripHorizontal size={16} className="text-white/70" />
        </div>

        {project.media_type === 'image' && (
          <img 
            src={project.media_url} 
            alt={project.title} 
            className="w-full h-auto block"
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
            className="w-full h-auto block"
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
    </div>
  );
};

const DraggableGallery = ({ initialProjects }: { initialProjects: Project[] }) => {
  const [items, setItems] = useState(initialProjects);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setItems(initialProjects);
  }, [initialProjects]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activeProject = items.find(p => p.id === activeId);

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(p => p.id)} strategy={rectSortingStrategy}>
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 w-full">
          {items.map((project) => (
            <SortableGalleryItem key={project.id} id={project.id} project={project} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeProject ? (
          <div className="relative group w-full break-inside-avoid">
            <div className="relative w-full rounded-2xl overflow-hidden border border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] bg-white/5 rotate-2 scale-105">
              {activeProject.media_type === 'image' && (
                <img src={activeProject.media_url} className="w-full h-auto block" />
              )}
              {activeProject.media_type === 'video' && (
                <video src={activeProject.media_url} className="w-full h-auto block" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                 <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full mb-2 w-max">
                   {activeProject.category}
                 </span>
                 <h4 className="text-white font-heading font-bold text-lg leading-tight">{activeProject.title}</h4>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default function Portfolio({ limit }: { limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
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
      brandsRes,
      creativeRes,
      aigcRes,
      influencerRes,
      performanceRes
    ] = await Promise.all([
      limit ? supabase.from('brands').select('id, name, description, cover_image').order('sort_order', { ascending: true }).limit(limit) : supabase.from('brands').select('id, name, description, cover_image').order('sort_order', { ascending: true }),
      supabase.from('creative_studio').select('*, brands(name)'),
      supabase.from('aigc').select('*, brands(name)'),
      supabase.from('influencer_marketing').select('*, brands(name)'),
      supabase.from('performance_marketing').select('*, brands(name)')
    ]);

    if (brandsRes.data) {
      setBrands(brandsRes.data);
    }

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
    let result = brands.map(brandRecord => {
      const brandProjects = projects.filter(p => p.client === brandRecord.name);
      
      return {
        name: brandRecord.name,
        projects: brandProjects,
        coverImage: brandRecord.cover_image || '',
        coverType: 'image' as const
      };
    });

    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  }, [projects, limit, brands]);

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
              className="font-extrabold text-6xl md:text-8xl lg:text-[120px] font-heading tracking-tighter text-foreground mb-2 leading-[0.9]"
            >
              Our<br />Works.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-heading font-bold tracking-tighter text-foreground"
            >
              2025-26
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
                  {brand.coverImage ? (
                    <img 
                      src={brand.coverImage} 
                      alt={brand.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="font-extrabold text-3xl md:font-heading text-4xl font-heading text-white mb-4 tracking-tight text-center">{brand.name}</h3>
                    <span className="px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/30 flex items-center gap-2">
                      View Project <ArrowUpRight size={16} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* View More Button */}
        <div className="mt-16 flex justify-center">
          <Link 
            to="/work" 
            className="inline-flex items-center gap-2 bg-foreground text-background font-sans font-medium px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all rounded-sm shadow-sm"
          >
            View More Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

            {/* Adaptive Gallery Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 p-4 sm:p-6 md:p-12 flex justify-center items-center"
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
              <div className="flex-none p-4 md:p-6 bg-zinc-950 border-b border-zinc-800 flex justify-between items-center z-10">
                <div>
                  <h2 className="font-extrabold text-xl md:text-3xl font-heading tracking-tight text-white">{selectedBrand.name}</h2>
                  <p className="text-xs md:text-sm text-white/60 font-medium mt-1">Selected Works & Performance</p>
                </div>
                <button 
                  onClick={() => setSelectedBrand(null)}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white flex-shrink-0"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 relative">
                <div className="max-w-[1400px] mx-auto space-y-24">
                
                {/* Visual Media Gallery */}
                <div className="space-y-12">
                  <DraggableGallery initialProjects={selectedBrand.projects.filter(p => p.category !== 'Performance')} />
                </div>

                {/* Performance Dashboard */}
                {selectedBrand.projects.filter(p => p.category === 'Performance').length > 0 && (
                  <div className="pt-12 border-t border-white/10">
                    <h3 className="font-extrabold text-3xl font-heading tracking-tight text-white mb-8">Campaign Performance</h3>
                    
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
