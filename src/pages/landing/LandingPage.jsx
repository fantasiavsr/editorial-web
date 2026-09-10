import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import * as data from "../../data/exampleData";
import Hero from "../../sections/landing/Hero";
import FeaturedQuote from "../../sections/landing/FeaturedQuote";
import Chapters from "../../sections/landing/Chapters";
import CaseStudies from "../../sections/landing/CaseStudies";
import Methodology from "../../sections/landing/Methodology";

if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      <Navbar title="State of AI Design" links={data.NavLinks} />

      <Hero />

      {/* Sections with scroll animations */}
      <div className="">
        <FeaturedQuote />
      </div>

      <div className="bg-primary-black/4 dark:bg-primary-white/6">
        <Chapters />
      </div>

      <div className="bg-primary-black/4 dark:bg-primary-white/6">
        <CaseStudies />
      </div>

      <div className="">
        <Methodology />
      </div>

      <Footer page="landing" />
    </main>
  );
}
