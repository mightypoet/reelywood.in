export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client_name?: string;
  industry?: string;
  services_used?: string[];
  campaign_date?: string;
  campaign_results?: Record<string, any>;
  description?: string;
  case_study?: string;
  thumbnail_url?: string;
  featured: boolean;
  tags?: string[];
  status: 'draft' | 'published' | 'archived';
  display_order: number;
}

export interface AIGCVideo {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url?: string;
  category: string;
  prompt_used?: string;
  model_used?: string;
  duration?: number;
  featured: boolean;
  behind_the_scenes?: string;
  client_id?: string;
}

export interface Campaign {
  id: string;
  name: string;
  brand: string;
  influencers: any[];
  reach: number;
  views: number;
  likes: number;
  comments: number;
  roi_percentage?: number;
  images?: string[];
  videos?: string[];
}

export interface Metric {
  id: string;
  campaign_id?: string;
  month: string;
  revenue?: number;
  leads?: number;
  conversions?: number;
  ctr?: number;
  roas?: number;
  cpa?: number;
  cpc?: number;
  cpm?: number;
  platform?: string;
}
