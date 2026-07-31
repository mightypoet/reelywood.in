-- Reelywood Studio Supabase Schema
-- Includes tables, RLS policies, and basic functions

-- Storage bucket for portfolio media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'portfolio_media' );

CREATE POLICY "Authenticated users can upload media" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'portfolio_media' AND auth.role() = 'authenticated' );

-- Brands
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Creative Studio
CREATE TABLE public.creative_studio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES public.brands(id),
  title TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- AIGC
CREATE TABLE public.aigc (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES public.brands(id),
  title TEXT NOT NULL,
  media_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Influencer Marketing
CREATE TABLE public.influencer_marketing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES public.brands(id),
  brand_name TEXT NOT NULL,
  campaign_details TEXT NOT NULL,
  media_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Performance Marketing
CREATE TABLE public.performance_marketing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES public.brands(id),
  campaign_name TEXT NOT NULL,
  revenue NUMERIC NOT NULL,
  roas NUMERIC NOT NULL,
  ctr NUMERIC NOT NULL,
  cpa NUMERIC NOT NULL,
  chart_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS Policies
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_studio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aigc ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_marketing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_marketing ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public read access on creative_studio" ON public.creative_studio FOR SELECT USING (true);
CREATE POLICY "Allow public read access on aigc" ON public.aigc FOR SELECT USING (true);
CREATE POLICY "Allow public read access on influencer_marketing" ON public.influencer_marketing FOR SELECT USING (true);
CREATE POLICY "Allow public read access on performance_marketing" ON public.performance_marketing FOR SELECT USING (true);

-- Allow authenticated users to manage content
CREATE POLICY "Allow auth full access on brands" ON public.brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access on creative_studio" ON public.creative_studio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access on aigc" ON public.aigc FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access on influencer_marketing" ON public.influencer_marketing FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access on performance_marketing" ON public.performance_marketing FOR ALL USING (auth.role() = 'authenticated');

