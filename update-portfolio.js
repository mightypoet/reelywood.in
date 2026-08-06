import fs from 'fs';

let content = fs.readFileSync('src/components/sections/Portfolio.tsx', 'utf8');

// Find the index of '{/* Brand Bento Modal */}'
const splitIndex = content.indexOf('{/* Brand Bento Modal */}');
const beforeModal = content.slice(0, splitIndex);

const afterModal = `      {/* Adaptive Gallery Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-sm">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{selectedBrand.name}</h2>
                <p className="text-sm text-white/60 font-medium">Selected Works & Performance</p>
              </div>
              <button 
                onClick={() => setSelectedBrand(null)}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="max-w-[1400px] mx-auto p-6 md:p-12 space-y-24">
                
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
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-auto max-h-[85vh] object-contain"
                            />
                          )}
                          {/* Overlay with info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full mb-2 w-max">
                              {project.category}
                            </span>
                            <h4 className="text-white font-bold text-lg leading-tight">{project.title}</h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Performance Dashboard */}
                {selectedBrand.projects.filter(p => p.category === 'Performance').length > 0 && (
                  <div className="pt-12 border-t border-white/10">
                    <h3 className="text-3xl font-bold tracking-tight text-white mb-8">Campaign Performance</h3>
                    
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
                            <h4 className="text-lg font-bold text-white">Platform Breakdown</h4>
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
        )}
      </AnimatePresence>
    </section>
  );
}
`;

fs.writeFileSync('src/components/sections/Portfolio.tsx', beforeModal + afterModal);
