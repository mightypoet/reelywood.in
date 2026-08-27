import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import FeaturedClients from '../components/sections/FeaturedClients';
import StatCounters from '../components/sections/StatCounters';
import Portfolio from '../components/sections/Portfolio';
import SolutionsGrid from '../components/sections/SolutionsGrid';
import Services from '../components/sections/Services';
import CreativeStatement from '../components/sections/CreativeStatement';
import ProductsStrip from '../components/sections/ProductsStrip';
import HowWeWork from '../components/sections/HowWeWork';
import AIAndCreative from '../components/sections/AIAndCreative';
import PerformanceSection from '../components/sections/PerformanceSection';
import InfluencerSection from '../components/sections/InfluencerSection';
import Testimonials from '../components/sections/Testimonials';
import FeaturedOn from '../components/sections/FeaturedOn';
import AboutSection from '../components/sections/AboutSection';
import TeamSection from '../components/sections/TeamSection';
import CaseStudies from '../components/sections/CaseStudies';
import PricingSection from '../components/sections/PricingSection';
import FAQSection from '../components/sections/FAQSection';
import FinalCTA from '../components/sections/FinalCTA';
import ScrollBlur from '../components/ui/ScrollBlur';
import Lenis from 'lenis';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { mode } = useTheme();
  const isTech = mode === 'tech';

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans select-none overflow-x-hidden relative bg-background text-foreground">
      {/* Announcement Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-bold tracking-widest uppercase">
        🚀 New: Reelywood AI Marketing Automation Suite is now live!
      </div>
      
      <div className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none">
        <ScrollBlur direction="top" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-32 z-40 pointer-events-none">
        <ScrollBlur direction="bottom" />
      </div>
      
      <Navbar />
      
      <main>
        <Hero />
        <FeaturedClients />
        <StatCounters />
        
        {isTech ? <SolutionsGrid /> : <Portfolio limit={6} />}
        
        <Services />
        
        {!isTech && (
          <>
            <CreativeStatement />
            <ProductsStrip />
            <HowWeWork />
            <AIAndCreative />
            <PerformanceSection />
            <InfluencerSection />
          </>
        )}
        
        <Testimonials />
        
        {!isTech && (
          <>
            <FeaturedOn />
            <AboutSection />
            <TeamSection />
          </>
        )}
        
        <CaseStudies />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
