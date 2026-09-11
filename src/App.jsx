import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/landing/LandingPage";
import About from "./pages/about/About";
import ProductPage from "./pages/product/ProductPage";
import PricingPage from "./pages/pricing/PricingPage";
import ServicePage from "./pages/service/ServicePage";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProfiles from "./pages/dashboard/DashboardProfiles";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardServices from "./pages/dashboard/DashboardServices";
import DashboardPricing from "./pages/dashboard/DashboardPricing";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import Dashboard2 from "./pages/dashboard2/Dashboard2";
import Dashboard2Profiles from "./pages/dashboard2/Dashboard2Profiles";
import Dashboard2Products from "./pages/dashboard2/Dashboard2Products";
import Dashboard2Services from "./pages/dashboard2/Dashboard2Services";
import Dashboard2Pricing from "./pages/dashboard2/Dashboard2Pricing";
import Dashboard2Settings from "./pages/dashboard2/Dashboard2Settings";
import NotFound from "./pages/error/NotFound";
import Unauthorized from "./pages/error/Unauthorized";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        {/* Reset/restore scroll position when navigating between routes */}
        <ScrollToTop />

        <Routes>
          {/* Public pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/services" element={<ServicePage />} />

          {/* Dashboard 1 - Public */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profiles" element={<DashboardProfiles />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/services" element={<DashboardServices />} />
          <Route path="/dashboard/pricing" element={<DashboardPricing />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/dashboard/easter" element={<Unauthorized />} />

          {/* Dashboard 2 - Protected */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/dashboard2">
              <Route index element={<Dashboard2 />} />
              <Route path="profiles" element={<Dashboard2Profiles />} />
              <Route path="products" element={<Dashboard2Products />} />
              <Route path="services" element={<Dashboard2Services />} />
              <Route path="pricing" element={<Dashboard2Pricing />} />
              <Route path="settings" element={<Dashboard2Settings />} />
            </Route>
          </Route> */}

          <Route path="/dashboard2">
            <Route index element={<Dashboard2 />} />
            <Route path="profiles" element={<Dashboard2Profiles />} />
            <Route path="products" element={<Dashboard2Products />} />
            <Route path="services" element={<Dashboard2Services />} />
            <Route path="pricing" element={<Dashboard2Pricing />} />
            <Route path="settings" element={<Dashboard2Settings />} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Error pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
