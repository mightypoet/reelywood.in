import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Palette, Video, Users, TrendingUp, Settings, LogOut, Plus, Check, X } from 'lucide-react';

import CreativeStudioManager from '../components/admin/CreativeStudioManager';
import AIGCManager from '../components/admin/AIGCManager';
import InfluencerManager from '../components/admin/InfluencerManager';
import PerformanceManager from '../components/admin/PerformanceManager';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const [brands, setBrands] = useState<any[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
    const { data } = await supabase.from('brands').select('*').order('name');
    if (data) {
      setBrands(data);
      if (!selectedBrandId && data.length > 0) {
        setSelectedBrandId(data[0].id);
      }
    }
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    const { data, error } = await supabase.from('brands').insert([{ name: newBrandName.trim() }]).select();
    if (!error && data && data.length > 0) {
      setBrands([...brands, data[0]]);
      setSelectedBrandId(data[0].id);
      setNewBrandName('');
      setIsAddingBrand(false);
    } else if (error) {
      console.error(error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };
  
  if (loading && !session) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 max-w-md w-full border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-sans tracking-tight text-slate-900">Reelywood Studio</h1>
            <p className="text-slate-500 mt-2">Admin Dashboard Login</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@reelywood.com" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { icon: LayoutDashboard, id: 'overview', label: 'Overview' },
    { icon: Palette, id: 'creative', label: 'Creative Studio' },
    { icon: Video, id: 'aigc', label: 'AIGC Videos' },
    { icon: Users, id: 'influencer', label: 'Influencer' },
    { icon: TrendingUp, id: 'performance', label: 'Performance' },
    { icon: Settings, id: 'settings', label: 'Settings' },
  ];

  const selectedBrandName = brands.find(b => b.id === selectedBrandId)?.name || '';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center md:block">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Reelywood.</h1>
            <span className="text-[10px] md:text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full md:mt-2 inline-block">Admin CMS</span>
          </div>
          <button 
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
        
        <nav className="flex md:flex-col p-2 md:p-4 gap-1 overflow-x-auto md:overflow-y-auto flex-1 no-scrollbar">
          {sidebarItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 md:gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon size={18} className={`shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="hidden md:block p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {sidebarItems.find(i => i.id === activeTab)?.label || 'Dashboard Overview'}
            </h2>
            <p className="text-slate-500 text-sm md:text-base">Manage your agency's portfolio and campaigns.</p>
          </div>
          
          <div className="flex gap-4 items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {/* Global Brand Selector */}
            <div className="flex items-center gap-3 pr-4 md:border-r border-slate-200 whitespace-nowrap shrink-0">
              <span className="text-sm font-medium text-slate-500">Active Brand:</span>
              {isAddingBrand ? (
                <form onSubmit={handleAddBrand} className="flex items-center gap-1">
                  <input 
                    type="text" 
                    value={newBrandName} 
                    onChange={e => setNewBrandName(e.target.value)} 
                    placeholder="New Brand Name" 
                    className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40"
                    autoFocus
                  />
                  <button type="submit" className="p-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"><Check size={16} /></button>
                  <button type="button" onClick={() => setIsAddingBrand(false)} className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"><X size={16} /></button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedBrandId || ''} 
                    onChange={e => setSelectedBrandId(e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none"
                  >
                    {brands.length === 0 && <option value="">No Brands Available</option>}
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  <button onClick={() => setIsAddingBrand(true)} className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100" title="Add New Brand">
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>

            <a href="/" target="_blank" className="bg-white px-5 py-2.5 rounded-full text-sm font-medium border border-slate-200 shadow-sm hover:shadow-md transition-all">
              View Site
            </a>
          </div>
        </header>

        {/* Tab Content Routing */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Creative Assets', value: '42', trend: '+12% this month' },
              { label: 'AIGC Videos', value: '18', trend: '+3 this week' },
              { label: 'Influencer Campaigns', value: '8', trend: 'Active now' },
              { label: 'Storage Used', value: '45.2 GB', trend: 'Of 100GB plan' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                  <p className="text-emerald-600 text-xs font-medium">{stat.trend}</p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'creative' && <CreativeStudioManager brandId={selectedBrandId} />}
        {activeTab === 'aigc' && <AIGCManager brandId={selectedBrandId} />}
        {activeTab === 'influencer' && <InfluencerManager brandId={selectedBrandId} brandName={selectedBrandName} />}
        {activeTab === 'performance' && <PerformanceManager brandId={selectedBrandId} />}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm">Settings panel coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
