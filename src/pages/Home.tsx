import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ImageStreamHero from '../components/sections/ImageStreamHero';
import FeaturedClients from '../components/sections/FeaturedClients';
import Portfolio from '../components/sections/Portfolio';
import BentoFeatureSection from '../components/sections/BentoFeatureSection';
import StatsWithText from '../components/sections/StatsWithText';
import ServicesHoverModal from '../components/sections/ServicesHoverModal';
import TeamSection from '../components/sections/TeamSection';
import PricingSection from '../components/sections/PricingSection';
import FAQSection from '../components/sections/FAQSection';
import FinalCTA from '../components/sections/FinalCTA';
import Lenis from 'lenis';

export default function Home() {
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
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-bold tracking-widest uppercase relative z-50">
        🚀 New: Reelywood AI Marketing Automation Suite is now live!
      </div>
      
      <Navbar />
      
      <main>
        <ImageStreamHero />
        <FeaturedClients />
        <Portfolio limit={6} />
        <BentoFeatureSection />
        <StatsWithText />
        <ServicesHoverModal />
        <TeamSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
