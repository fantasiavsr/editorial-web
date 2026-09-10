import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import LandingPage from "./pages/landing/LandingPage";
import ProductPage from "./pages/product/ProductPage";
import PricingPage from "./pages/pricing/PricingPage";
import ServicePage from "./pages/service/ServicePage";
import NotFound from "./pages/error/NotFound";
import Unauthorized from "./pages/error/Unauthorized";

function App() {
  /*  const validPages = ['home', 'products', 'pricing', 'services', 'unauthorized']; */
  const [currentPage, setCurrentPage] = useState(
    typeof window !== "undefined"
      ? window.location.hash.slice(1) || "home"
      : "home",
  );

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) || "home";
      setCurrentPage(hash);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    window.location.hash = currentPage === "home" ? "" : currentPage;
  }, [currentPage]);

  // Helper function to render the correct page
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onNavigate={setCurrentPage} />;
      case "products":
        return <ProductPage onNavigate={setCurrentPage} />;
      case "pricing":
        return <PricingPage onNavigate={setCurrentPage} />;
      case "services":
        return <ServicePage onNavigate={setCurrentPage} />;
      case "unauthorized":
        return <Unauthorized onNavigate={setCurrentPage} />;
      default:
        return <NotFound onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {renderPage()}
    </ThemeProvider>
  );
}

export default App;
