import { useState, useEffect } from 'react';
import ThemeToggle from '../../components/ThemeToggle';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import PricingCards from '../../sections/pricing/PricingCards';
import FeaturedPricingCard from '../../sections/pricing/FeaturedPricingCard';
import ThreeTierPricing from '../../sections/pricing/ThreeTierPricing';
import PricingTable from '../../sections/pricing/PricingTable';
import TieredPricingList from '../../sections/pricing/TieredPricingList';
import UsageBasedPricing from '../../sections/pricing/UsageBasedPricing';
import PricingFeatureComparison from '../../sections/pricing/PricingFeatureComparison';

export default function PricingPage({ onNavigate }) {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [section1Ref, section1Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section2Ref, section2Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section3Ref, section3Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section4Ref, section4Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section5Ref, section5Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section6Ref, section6Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section7Ref, section7Visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-primary-white/95 dark:bg-primary-dark-bg/95 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10 transition-colors">
        <button onClick={() => onNavigate?.('pricing')} className="text-sm font-medium tracking-tight text-primary-black dark:text-primary-white">Pricing Layouts</button>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <div className="flex gap-4 text-sm text-primary-black/70 dark:text-primary-white/70">
            <button onClick={() => onNavigate?.('home')} className="hover:text-primary-orange transition-smooth">Home</button>
            <button onClick={() => onNavigate?.('products')} className="hover:text-primary-orange transition-smooth">Products</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-8 md:px-16 md:max-w-7xl mx-auto">
        <p className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Layout Patterns
        </p>
        <h1 className={`text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-primary-black dark:text-primary-white transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? '100ms' : '0ms' }}>
          Pricing<br />
          <span className="italic font-normal text-primary-orange">Showcase.</span>
        </h1>
        <p className={`text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed font-light transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? '200ms' : '0ms' }}>
          Seven pricing layout patterns for every business model—from cards to tables, tiered to usage-based.
        </p>
      </section>

      {/* Sections with scroll animations */}
      <div ref={section1Ref} className={`transition-all duration-700 ${section1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <PricingCards />
      </div>

      <div ref={section2Ref} className={`transition-all duration-700 ${section2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <FeaturedPricingCard />
      </div>

      <div ref={section3Ref} className={`transition-all duration-700 ${section3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <ThreeTierPricing />
      </div>

      <div ref={section4Ref} className={`transition-all duration-700 ${section4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <PricingTable />
      </div>

      <div ref={section5Ref} className={`transition-all duration-700 ${section5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <TieredPricingList />
      </div>

      <div ref={section6Ref} className={`transition-all duration-700 ${section6Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <UsageBasedPricing />
      </div>

      <div ref={section7Ref} className={`transition-all duration-700 ${section7Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <PricingFeatureComparison />
      </div>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-16 border-t border-primary-black/10 dark:border-primary-white/10">
        <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2 text-primary-black dark:text-primary-white">
              Pricing Layouts
            </h4>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50">
              Versatile patterns for showcasing your pricing.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-primary-black/60 dark:text-primary-white/60">
            <button onClick={() => onNavigate?.('home')} className="hover:text-primary-orange transition-smooth">
              Home
            </button>
            <a href="#" className="hover:text-primary-orange transition-smooth">
              Documentation
            </a>
          </div>
        </div>
        <p className="text-xs text-primary-black/30 dark:text-primary-white/30 mt-12 md:max-w-7xl mx-auto">
          © 2026 Pricing Layouts. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
