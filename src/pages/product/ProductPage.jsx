import { useState, useEffect } from 'react';
import Navbar from '../../components/navigation/Navbar';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ProductGrid from '../../sections/product/ProductGrid';
import ProductList from '../../sections/product/ProductList';
import FeaturedProduct from '../../sections/product/FeaturedProduct';
import FeaturedProductGrid from '../../sections/product/FeaturedProductGrid';
import BentoProductGrid from '../../sections/product/BentoProductGrid';
import ProductCarousel from '../../sections/product/ProductCarousel';
import CategoryTabsGrid from '../../sections/product/CategoryTabsGrid';

export default function ProductPage({ onNavigate }) {
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
      <Navbar title="Product Layouts" links={[{key:'home',label:'Home'},{key:'pricing',label:'Pricing'},{key:'services',label:'Services'}]} onNavigate={onNavigate} />

      {/* Hero */}
      <section className="pt-36 pb-20 px-8 md:px-16 md:max-w-7xl mx-auto">
        <p className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Layout Patterns
        </p>
        <h1 className={`text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-primary-black dark:text-primary-white transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? '100ms' : '0ms' }}>
          Product<br />
          <span className="italic font-normal text-primary-orange">Showcase.</span>
        </h1>
        <p className={`text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed font-light transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? '200ms' : '0ms' }}>
          Seven versatile product layout patterns for every use case—from grids to carousels, lists to bento boxes.
        </p>
      </section>

      {/* Sections with scroll animations */}
      <div ref={section1Ref} className={`transition-all duration-700 ${section1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <ProductGrid />
      </div>

      <div ref={section2Ref} className={`transition-all duration-700 ${section2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <ProductList />
      </div>

      <div ref={section3Ref} className={`transition-all duration-700 ${section3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <FeaturedProduct />
      </div>

      <div ref={section4Ref} className={`transition-all duration-700 ${section4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <FeaturedProductGrid />
      </div>

      <div ref={section5Ref} className={`transition-all duration-700 ${section5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <BentoProductGrid />
      </div>

      <div ref={section6Ref} className={`transition-all duration-700 ${section6Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <ProductCarousel />
      </div>

      <div ref={section7Ref} className={`transition-all duration-700 ${section7Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <CategoryTabsGrid />
      </div>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-16 border-t border-primary-black/10 dark:border-primary-white/10">
        <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2 text-primary-black dark:text-primary-white">
              Product Layouts
            </h4>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50">
              Versatile patterns for showcasing your products.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-primary-black/60 dark:text-primary-white/60">
            <a href="/" className="hover:text-primary-orange transition-smooth">
              Home
            </a>
            <a href="#" className="hover:text-primary-orange transition-smooth">
              Documentation
            </a>
          </div>
        </div>
        <p className="text-xs text-primary-black/30 dark:text-primary-white/30 mt-12 md:max-w-7xl mx-auto">
          © 2026 Product Layouts. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
