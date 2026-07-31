import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, TrendingUp, Trash2, Edit2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PerformanceManager({ brandId }: { brandId: string | null }) {
  const [campaignName, setCampaignName] = useState('');
  const [revenue, setRevenue] = useState('');
  const [roas, setRoas] = useState('');
  const [ctr, setCtr] = useState('');
  const [cpa, setCpa] = useState('');
  const [chartDataJson, setChartDataJson] = useState('[\n  {"name": "Jan", "value": 4000},\n  {"name": "Feb", "value": 3000},\n  {"name": "Mar", "value": 2000}\n]');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    let query = supabase.from('performance_marketing').select('*, brands(name)').order('created_at', { ascending: false });
    if (brandId) {
      query = query.eq('brand_id', brandId);
    }
    const { data } = await query;
    if (data) setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [brandId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandId) return alert('Please select a brand first');
    setIsSubmitting(true);
    
    let chartData = [];
    try {
      chartData = JSON.parse(chartDataJson);
      if (!Array.isArray(chartData)) {
        throw new Error('Chart data must be an array of objects');
      }
    } catch (e: any) {
      alert(e.message || 'Invalid JSON in chart data');
      setIsSubmitting(false);
      return;
    }
    
    if (editingId) {
      const { error } = await supabase.from('performance_marketing').update({
        campaign_name: campaignName, 
        revenue: parseFloat(revenue), 
        roas: parseFloat(roas), 
        ctr: parseFloat(ctr), 
        cpa: parseFloat(cpa), 
        chart_data: chartData 
      }).eq('id', editingId);

      setIsSubmitting(false);
      if (error) {
        alert('Error: ' + error.message);
      } else {
        resetForm();
        fetchItems();
      }
    } else {
      const { error } = await supabase.from('performance_marketing').insert([{ 
        brand_id: brandId,
        campaign_name: campaignName, 
        revenue: parseFloat(revenue), 
        roas: parseFloat(roas), 
        ctr: parseFloat(ctr), 
        cpa: parseFloat(cpa), 
        chart_data: chartData 
      }]);
      
      setIsSubmitting(false);
      if (error) {
        alert('Error: ' + error.message);
      } else {
        resetForm();
        fetchItems();
      }
    }
  };

  const resetForm = () => {
    setCampaignName('');
    setRevenue('');
    setRoas('');
    setCtr('');
    setCpa('');
    setChartDataJson('[\n  {"name": "Jan", "value": 4000},\n  {"name": "Feb", "value": 3000},\n  {"name": "Mar", "value": 2000}\n]');
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setCampaignName(item.campaign_name || '');
    setRevenue(item.revenue?.toString() || '');
    setRoas(item.roas?.toString() || '');
    setCtr(item.ctr?.toString() || '');
    setCpa(item.cpa?.toString() || '');
    setChartDataJson(JSON.stringify(item.chart_data, null, 2) || '[]');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const { error } = await supabase.from('performance_marketing').delete().eq('id', id);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      fetchItems();
    }
  };

  return (
    <div className="space-y-8">
      {!brandId ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-3xl border border-yellow-200 dark:border-yellow-700/50 text-yellow-800 dark:text-yellow-200">
          Please select or create a brand from the top header before managing Performance Metrics.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-indigo-500 dark:text-indigo-400" />
              {editingId ? 'Edit Performance Metrics' : 'Add Performance Metrics'}
            </h3>
            {editingId && (
              <button onClick={resetForm} className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                Cancel Edit
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Campaign Name</label>
                <input 
                  type="text" 
                  value={campaignName} 
                  onChange={e => setCampaignName(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Revenue (₹)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={revenue} 
                  onChange={e => setRevenue(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ROAS (x)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={roas} 
                  onChange={e => setRoas(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CTR (%)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={ctr} 
                  onChange={e => setCtr(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CPA (₹)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={cpa} 
                  onChange={e => setCpa(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="lg:col-span-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Chart Data (JSON)</label>
                <textarea 
                  rows={5}
                  value={chartDataJson} 
                  onChange={e => setChartDataJson(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              Save Metrics
            </button>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white">Recent Metrics {brandId && '(This Brand)'}</h3>
        </div>
        <div className="p-6 space-y-6">
          {items.map(item => (
            <div key={item.id} className="rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex flex-col lg:flex-row gap-8 shadow-sm relative group bg-white dark:bg-slate-900">
              <span className="absolute top-2 right-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold px-2 py-1 rounded">
                {item.brands?.name || 'Unknown Brand'}
              </span>

              <div className="absolute top-10 right-2 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(item)} className="p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 backdrop-blur-md transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 backdrop-blur-md transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex-1">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{item.campaign_name}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenue</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{Number(item.revenue).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">ROAS</p>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{item.roas}x</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">CTR</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">CPA</p>
                    <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">₹{item.cpa}</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/3 h-64 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                {item.chart_data && item.chart_data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={item.chart_data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }} />
                      <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No chart data available</div>
                )}
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-slate-500 text-sm">No performance metrics added yet.</p>}
        </div>
      </div>
    </div>
  );
}
