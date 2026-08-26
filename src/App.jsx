import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import LandingPage from './pages/landing/LandingPage';
import ProductPage from './pages/product/ProductPage';
import PricingPage from './pages/pricing/PricingPage';
import ServicePage from './pages/service/ServicePage';

function App() {
  const [currentPage, setCurrentPage] = useState(
    typeof window !== 'undefined' ? (window.location.hash.slice(1) || 'home') : 'home'
  );

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    window.location.hash = currentPage === 'home' ? '' : currentPage;
  }, [currentPage]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {currentPage === 'home' ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : currentPage === 'products' ? (
        <ProductPage onNavigate={setCurrentPage} />
      ) : currentPage === 'pricing' ? (
        <PricingPage onNavigate={setCurrentPage} />
      ) : currentPage === 'services' ? (
        <ServicePage onNavigate={setCurrentPage} />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      )}
    </ThemeProvider>
  );
}

export default App;
