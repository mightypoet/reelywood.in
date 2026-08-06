import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FinalCTA from '../components/sections/FinalCTA';
import Portfolio from '../components/sections/Portfolio';

function IndustryTemplate({ title, description, features }: { title: string, description: string, features: string[] }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen pt-32 flex flex-col justify-between">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full flex-grow px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="font-extrabold text-5xl md:text-6xl tracking-tight text-slate-900 dark:text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            {features.map((feature, i) => (
              <span key={i} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold border border-indigo-100 dark:border-indigo-800">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-24">
        <Portfolio limit={3} />
      </div>
      
      <FinalCTA />
      <Footer />
    </div>
  );
}

function IndustryRouter() {
  const { slug } = useParams();

  const industryData: Record<string, any> = {
    'local-retail-shops': {
      title: "Local Retail Marketing, Automated & Produced",
      description: "We help local shops in Gujarat and beyond drive offline footfall using hyper-targeted AI Reels, while automating customer inquiries on WhatsApp to turn every message into a sale.",
      features: ["AI Reels for Local Reach", "WhatsApp Automation", "Footfall Tracking", "Geo-Targeted Ads"]
    },
    'd2c-ecommerce': {
      title: "D2C Brands, Scaled with AI & Performance",
      description: "Scale your Direct-to-Consumer brand with high-converting AIGC commercials and data-driven performance marketing that guarantees a strong ROAS.",
      features: ["AIGC Commercials", "Performance Marketing", "Shopify Integration", "Retargeting Campaigns"]
    },
    'restaurants-food': {
      title: "Restaurant Marketing that Drives Reservations",
      description: "Make your food look irresistible with editorial-style Reels, and manage table bookings automatically through our custom CRM solutions.",
      features: ["Food Videography", "Influencer Marketing", "Booking Automation", "Review Management"]
    },
    'real-estate': {
      title: "Real Estate Leads, Qualified and Nurtured",
      description: "Generate high-quality property leads with cinematic property tours and qualify them instantly using our AI chatbots.",
      features: ["Cinematic Tours", "AI Chatbots", "Lead Scoring", "CRM Integration"]
    }
  };

  const data = industryData[slug || ''] || {
    title: "Industry Solutions",
    description: "Tailored creative and automation solutions for your specific industry.",
    features: ["Custom Strategies", "Automation", "Content Production"]
  };

  return <IndustryTemplate {...data} />;
}

export default function Industries() {
  return (
    <Routes>
      <Route path=":slug" element={<IndustryRouter />} />
      <Route path="" element={
        <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col justify-between">
          <Navbar />
          <div className="max-w-7xl mx-auto w-full flex-grow text-center">
            <h1 className="font-extrabold text-4xl mb-6">Industries</h1>
            <p>Select an industry from the homepage to learn more.</p>
          </div>
          <Footer />
        </div>
      } />
    </Routes>
  );
}
