const fs = require('fs');
let code = fs.readFileSync('src/components/sections/Services.tsx', 'utf8');

const newServices = `
import { Palette, Play, Users, TrendingUp, Compass, Share2, Layers, Laptop, ArrowRight, X, Smartphone, MessageSquare, Video, PenTool } from 'lucide-react';

const servicesList = [
  { 
    id: 'branding', title: 'Branding', icon: Compass, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', desc: 'Graphic design and branding strategy.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    details: [
      { title: 'Brand Identity', desc: 'Visual language and core guidelines.' },
      { title: 'Positioning', desc: 'Market placement and voice.' },
      { title: 'Strategy', desc: 'Long-term brand roadmaps.' },
      { title: 'Design Assets', desc: 'Logos, typography, and styling.' }
    ]
  },
  { 
    id: 'metaads', title: 'MetaAds', icon: TrendingUp, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', desc: 'Data-driven ROAS optimization and media buying.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    details: [
      { title: 'Campaign Management', desc: 'End-to-end Meta ad setup.' },
      { title: 'Audience Targeting', desc: 'Precision demographic targeting.' },
      { title: 'A/B Testing', desc: 'Iterative creative testing.' },
      { title: 'Performance Analytics', desc: 'Deep dive into ROAS and KPIs.' }
    ]
  },
  { 
    id: 'webdev', title: 'Web Development', icon: Laptop, color: 'from-slate-700 to-slate-900', bg: 'bg-slate-100', desc: 'Premium web apps and digital experiences.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    details: [
      { title: 'UI/UX Design', desc: 'User-centric wireframing and design.' },
      { title: 'Front-End', desc: 'Responsive, fast React applications.' },
      { title: 'Back-End', desc: 'Scalable server infrastructure.' },
      { title: 'E-Commerce', desc: 'Custom shop integrations.' }
    ]
  },
  { 
    id: 'cpaas', title: 'CPaaS', icon: MessageSquare, color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-50', desc: 'Communication Platform-as-a-Service.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80',
    details: [
      { title: 'SMS & RCS', desc: 'High delivery rate messaging.' },
      { title: 'Email', desc: 'Automated email sequences.' },
      { title: 'WhatsApp', desc: 'Direct WhatsApp API integration.' },
      { title: 'OTP Delivery', desc: '99% delivery rate for critical codes.' }
    ]
  },
  { 
    id: 'digital', title: 'Digital Marketing', icon: Share2, color: 'from-fuchsia-500 to-pink-500', bg: 'bg-fuchsia-50', desc: 'Cross-industry expertise & impact.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80',
    details: [
      { title: 'Lead Generation', desc: 'High-converting funnels.' },
      { title: 'Google Business', desc: 'Local SEO and maps optimization.' },
      { title: 'Omnichannel Strategy', desc: 'Unified marketing approach.' },
      { title: 'Growth Hacking', desc: 'Rapid scaling tactics.' }
    ]
  },
  { 
    id: 'appdev', title: 'App Dev', icon: Smartphone, color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', desc: 'Native and cross-platform mobile apps.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80',
    details: [
      { title: 'iOS Development', desc: 'Native Swift applications.' },
      { title: 'Android Development', desc: 'Native Kotlin applications.' },
      { title: 'Cross-Platform', desc: 'React Native & Flutter apps.' },
      { title: 'App Store Optimization', desc: 'Maximizing organic installs.' }
    ]
  },
  { 
    id: 'videos', title: 'Videos', icon: Video, color: 'from-pink-500 to-rose-500', bg: 'bg-rose-50', desc: 'Video production, Reels, and AIGC.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    details: [
      { title: 'Reels & Shorts', desc: 'Short-form viral content.' },
      { title: 'Brand Films', desc: 'High-production value storytelling.' },
      { title: 'AIGC', desc: 'AI-generated commercials.' },
      { title: 'Post-Production', desc: 'Editing, VFX, and color grading.' }
    ]
  },
  { 
    id: 'ugc', title: 'UGC', icon: Users, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', desc: 'User-generated content strategies.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    details: [
      { title: 'Creator Sourcing', desc: 'Finding authentic voices.' },
      { title: 'Content Briefs', desc: 'Strategic direction for creators.' },
      { title: 'Usage Rights', desc: 'Full licensing management.' },
      { title: 'Ad Integration', desc: 'Using UGC in performance ads.' }
    ]
  },
  { 
    id: 'graphics', title: 'Graphics', icon: PenTool, color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-50', desc: 'Creative studio and visual design.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
    details: [
      { title: 'Social Creatives', desc: 'Engaging posts and banners.' },
      { title: 'Packaging', desc: 'Product and box designs.' },
      { title: 'Motion Graphics', desc: '2D/3D animated assets.' },
      { title: 'Print Design', desc: 'Brochures, menus, and billboards.' }
    ]
  },
  { 
    id: 'influencer', title: 'Influencer Marketing', icon: Users, color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', desc: 'Global campaigns with top-tier creators.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80',
    details: [
      { title: 'Influencer Discovery', desc: 'Matching brand to creator.' },
      { title: 'Campaign Management', desc: 'End-to-end execution.' },
      { title: 'Contracting', desc: 'Rates and deliverables negotiation.' },
      { title: 'ROI Tracking', desc: 'Measuring campaign impact.' }
    ]
  },
];
`;

code = code.replace(/import \{ Palette.*?\} from 'lucide-react';[\s\S]*?\];/, newServices.trim());
fs.writeFileSync('src/components/sections/Services.tsx', code);
