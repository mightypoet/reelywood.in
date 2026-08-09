import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, Settings, LogOut, Plus, Check, X, ChevronRight, Save, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';

import CreativeStudioManager from '../components/admin/CreativeStudioManager';
import AIGCManager from '../components/admin/AIGCManager';
import InfluencerManager from '../components/admin/InfluencerManager';
import PerformanceManager from '../components/admin/PerformanceManager';
import MediaUploader from '../components/admin/MediaUploader';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('info@reelywood.com');
  const [password, setPassword] = useState('rohan@9123');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('brands');

  const [brands, setBrands] = useState<any[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
  // Brand Editing State
  const [brandName, setBrandName] = useState('');
  const [brandDesc, setBrandDesc] = useState('');
  const [brandCover, setBrandCover] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchBrands();
    }
  }, [session]);

  const fetchBrands = async () => {
    const { data } = await supabase.from('brands').select('*').order('sort_order', { ascending: true }).order('name');
    if (data) {
      setBrands(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };
  
  const handleSelectBrand = (b: any) => {
    setSelectedBrandId(b.id);
    setBrandName(b.name || '');
    setBrandDesc(b.description || '');
    setBrandCover(b.cover_image || '');
  };

  const handleCreateNewBrand = () => {
    setSelectedBrandId('new');
    setBrandName('');
    setBrandDesc('');
    setBrandCover('');
  };

  const handleSaveBrand = async () => {
    if (!brandName.trim()) return;
    const payload = { name: brandName, description: brandDesc, cover_image: brandCover };
    
    if (selectedBrandId === 'new') {
      const { data, error } = await supabase.from('brands').insert([payload]).select();
      if (!error && data && data.length > 0) {
        setBrands([...brands, data[0]]);
        handleSelectBrand(data[0]);
      } else if (error) {
        console.error("Error creating brand:", error);
      }
    } else {
      const { error } = await supabase.from('brands').update(payload).eq('id', selectedBrandId);
      if (!error) {
        fetchBrands();
        // Optional: show success toast or message here
      } else {
        console.error("Error updating brand:", error);
      }
    }
  };

  const handleDeleteBrand = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this brand?')) {
      const { error } = await supabase.from('brands').delete().eq('id', id);
      if (error) {
        console.error("Error deleting brand:", error);
      } else {
        setBrands(brands.filter(b => b.id !== id));
      }
    }
  };

  const handleReorderBrands = async (newOrder: any[]) => {
    setBrands(newOrder);
    
    try {
      await Promise.all(newOrder.map((brand, index) => {
        return supabase.from('brands')
          .update({ sort_order: index })
          .eq('id', brand.id);
      }));
    } catch (err) {
      console.error("Error updating sort order", err);
    }
  };

  if (loading && !session) return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
        <div className="bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-800 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="font-extrabold text-2xl tracking-tight">Reelywood Studio</h1>
            <p className="text-zinc-400 mt-2">Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="bg-red-900/50 text-red-400 p-3 rounded-lg text-sm border border-red-800">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-white transition-all text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-white transition-all text-white" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { icon: Briefcase, id: 'brands', label: 'Brands' },
    { icon: Settings, id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row text-white dark">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col shrink-0">
        <div className="p-4 md:p-6 border-b border-zinc-800 flex justify-between items-center md:block">
          <div>
            <h1 className="font-extrabold text-xl tracking-tight">Reelywood.</h1>
            <span className="text-[10px] md:text-xs font-medium px-2 py-1 bg-white/10 text-zinc-300 rounded-full md:mt-2 inline-block">Admin CMS</span>
          </div>
          <button onClick={handleLogout} className="md:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition-all">
            <LogOut size={20} />
          </button>
        </div>
        
        <nav className="flex md:flex-col p-2 md:p-4 gap-1 overflow-x-auto md:overflow-y-auto flex-1 no-scrollbar">
          {sidebarItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => { setActiveTab(item.id); setSelectedBrandId(null); }}
              className={`flex items-center gap-2 md:gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === item.id ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="hidden md:block p-4 border-t border-zinc-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'brands' && (
          <div className="flex flex-col h-full">
            {/* Brands Header / List */}
            {!selectedBrandId ? (
              <div className="p-8 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-extrabold text-3xl ">Brand Portfolio</h2>
                  <button onClick={handleCreateNewBrand} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
                    <Plus size={18} /> New Brand
                  </button>
                </div>
                
                <Reorder.Group axis="y" values={brands} onReorder={handleReorderBrands} className="flex flex-col gap-4">
                  {brands.map(b => (
                    <Reorder.Item 
                      key={b.id} 
                      value={b}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 cursor-pointer hover:border-zinc-600 transition-colors group flex items-center gap-6 relative"
                    >
                      <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white p-2">
                        <GripVertical size={24} />
                      </div>
                      
                      <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-zinc-800" onClick={() => handleSelectBrand(b)}>
                        {b.cover_image ? (
                          <img src={b.cover_image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs font-medium">No Cover</div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0" onClick={() => handleSelectBrand(b)}>
                        <h3 className="font-extrabold text-xl mb-1 truncate pr-20">{b.name}</h3>
                        {b.description && <p className="text-sm text-zinc-400 line-clamp-2 pr-20">{b.description}</p>}
                        <div className="mt-3 flex items-center text-sm font-medium text-zinc-500 group-hover:text-white transition-colors">
                          Manage Assets <ChevronRight size={16} className="ml-1" />
                        </div>
                      </div>

                      <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-zinc-900/80 p-2 rounded-xl backdrop-blur-sm">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleSelectBrand(b); }}
                          className="p-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleDeleteBrand(e, b.id)}
                          className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>
            ) : (
              /* Nested Brand Dashboard */
              <div className="p-4 md:p-8 max-w-6xl mx-auto w-full space-y-8">
                <button onClick={() => setSelectedBrandId(null)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium mb-4">
                  <ChevronRight size={16} className="rotate-180" /> Back to Brands
                </button>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="font-extrabold text-2xl ">{selectedBrandId === 'new' ? 'Create New Brand' : 'Edit Brand'}</h2>
                    <button onClick={handleSaveBrand} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
                      <Save size={18} /> Save Brand
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Brand Name</label>
                        <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-600" placeholder="e.g. Nike" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Description (Optional)</label>
                        <textarea value={brandDesc} onChange={e => setBrandDesc(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-600 min-h-[120px]" placeholder="Brief description of the brand..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Cover Image</label>
                      {brandCover ? (
                        <div className="relative rounded-xl overflow-hidden border border-zinc-800 group">
                          <img src={brandCover} alt="Cover" className="w-full h-48 object-cover" />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setBrandCover('')} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 rounded-xl border border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
                          <MediaUploader onUploadSuccess={urls => setBrandCover(urls[0])} acceptedTypes="image/*" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedBrandId !== 'new' && (
                  <div className="space-y-6">
                    <h3 className="font-extrabold text-xl pt-4 border-t border-zinc-800">Manage Assets</h3>
                    
                    <details className="bg-zinc-900 border border-zinc-800 rounded-2xl group overflow-hidden">
                      <summary className="p-6 font-bold cursor-pointer flex justify-between items-center hover:bg-zinc-800/50 transition-colors">
                        Creative Studio (Images & Video)
                        <ChevronRight className="transform group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-6 border-t border-zinc-800 bg-zinc-950/50">
                        <CreativeStudioManager brandId={selectedBrandId} />
                      </div>
                    </details>
                    
                    <details className="bg-zinc-900 border border-zinc-800 rounded-2xl group overflow-hidden">
                      <summary className="p-6 font-bold cursor-pointer flex justify-between items-center hover:bg-zinc-800/50 transition-colors">
                        AIGC Videos (Reels & Shorts)
                        <ChevronRight className="transform group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-6 border-t border-zinc-800 bg-zinc-950/50">
                        <AIGCManager brandId={selectedBrandId} />
                      </div>
                    </details>
                    
                    <details className="bg-zinc-900 border border-zinc-800 rounded-2xl group overflow-hidden">
                      <summary className="p-6 font-bold cursor-pointer flex justify-between items-center hover:bg-zinc-800/50 transition-colors">
                        Influencer Marketing
                        <ChevronRight className="transform group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-6 border-t border-zinc-800 bg-zinc-950/50">
                        <InfluencerManager brandId={selectedBrandId} brandName={brandName} />
                      </div>
                    </details>
                    
                    <details className="bg-zinc-900 border border-zinc-800 rounded-2xl group overflow-hidden">
                      <summary className="p-6 font-bold cursor-pointer flex justify-between items-center hover:bg-zinc-800/50 transition-colors">
                        Performance Stats
                        <ChevronRight className="transform group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-6 border-t border-zinc-800 bg-zinc-950/50">
                        <PerformanceManager brandId={selectedBrandId} />
                      </div>
                    </details>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-8 max-w-4xl">
            <h2 className="font-extrabold text-2xl mb-6">Settings</h2>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-zinc-400">
              Settings panel coming soon.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
