import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import MediaUploader from './MediaUploader';
import { Loader2, Users, Trash2, Edit2 } from 'lucide-react';

export default function InfluencerManager({ brandId, brandName }: { brandId: string | null, brandName: string }) {
  const [campaignDetails, setCampaignDetails] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    let query = supabase.from('influencer_marketing').select('*, brands(name)').order('created_at', { ascending: false });
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
    if (!brandId) return;
    if (mediaUrls.length === 0) return;
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase.from('influencer_marketing').update({
        campaign_details: campaignDetails,
        media_url: mediaUrls[0]
      }).eq('id', editingId);

      setIsSubmitting(false);
      if (error) {
        console.error('Error:', error.message);
      } else {
        resetForm();
        fetchItems();
      }
    } else {
      const rows = mediaUrls.map(url => ({
        brand_id: brandId,
        brand_name: brandName, 
        campaign_details: campaignDetails, 
        media_url: url 
      }));
      
      const { error } = await supabase.from('influencer_marketing').insert(rows);
      
      setIsSubmitting(false);
      if (error) {
        console.error('Error:', error.message);
      } else {
        resetForm();
        fetchItems();
      }
    }
  };

  const resetForm = () => {
    setCampaignDetails('');
    setMediaUrls([]);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setCampaignDetails(item.campaign_details || '');
    setMediaUrls([item.media_url]);
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('influencer_marketing').delete().eq('id', id);
    if (error) {
      console.error('Error:', error.message);
    } else {
      fetchItems();
    }
  };

  return (
    <div className="space-y-8">
      {!brandId ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-3xl border border-yellow-200 dark:border-yellow-700/50 text-yellow-800 dark:text-yellow-200">
          Please select or create a brand from the top header before managing Influencer Campaigns.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="text-indigo-500 dark:text-indigo-400" />
              {editingId ? 'Edit Influencer Campaign' : 'Add Influencer Campaign(s)'}
            </h3>
            {editingId && (
              <button onClick={resetForm} className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                Cancel Edit
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Campaign Details</label>
                <textarea 
                  rows={3}
                  value={campaignDetails} 
                  onChange={e => setCampaignDetails(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Video Upload {editingId ? '' : '(Bulk supported)'}
              </label>
              {mediaUrls.length > 0 ? (
                <div className="space-y-2">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{mediaUrls.length} file(s) ready</span>
                    <button type="button" onClick={() => setMediaUrls([])} className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 text-sm font-medium">Clear</button>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {mediaUrls.map((url, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <video src={url} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <MediaUploader onUploadSuccess={setMediaUrls} acceptedTypes="video/*" multiple={!editingId} />
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || mediaUrls.length === 0}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {editingId ? 'Update Campaign' : `Save ${mediaUrls.length > 1 ? `${mediaUrls.length} Campaigns` : 'Campaign'}`}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white">Recent Campaigns {brandId && '(This Brand)'}</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 overflow-hidden shadow-sm relative group">
              <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] uppercase font-bold px-2 py-1 rounded backdrop-blur-md z-10">
                {item.brands?.name || item.brand_name}
              </span>

              <div className="absolute top-2 right-2 flex gap-2 z-10 transition-opacity">
                <button type="button" onClick={() => handleEdit(item)} className="p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg shadow-sm backdrop-blur-md transition-colors">
                  <Edit2 size={16} />
                </button>
                <button type="button" onClick={() => handleDelete(item.id)} className="p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-lg shadow-sm backdrop-blur-md transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              <video src={item.media_url} className="w-full h-48 object-cover bg-slate-900" controls />
              <div className="p-4">
                <h4 className="font-bold text-slate-900 dark:text-white">{item.brand_name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.campaign_details}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-slate-500 dark:text-slate-400 text-sm col-span-full">No campaigns uploaded yet.</p>}
        </div>
      </div>
    </div>
  );
}
