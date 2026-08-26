import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ThemeToggle from '../../components/ThemeToggle';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Theme toggle script to prevent FOUC
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

export default function LandingPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [quotesRef, quotesVisible] = useScrollAnimation({ threshold: 0.3 });
  const [chaptersRef, chaptersVisible] = useScrollAnimation({ threshold: 0.2 });
  const [caseStudiesRef, caseStudiesVisible] = useScrollAnimation({ threshold: 0.2 });
  const [methodologyRef, methodologyVisible] = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-primary-white/95 dark:bg-primary-dark-bg/95 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10 transition-colors">
        <a href="#" className="text-sm font-medium tracking-tight text-primary-black dark:text-primary-white">State of AI Design</a>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <div className="flex gap-8 text-sm text-primary-black/70 dark:text-primary-white/70">
            <a href="#report" className="hover:text-primary-orange transition-smooth">Report</a>
            <a href="#chapters" className="hover:text-primary-orange transition-smooth">Chapters</a>
            <a href="#teams" className="hover:text-primary-orange transition-smooth">Teams</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="report" className="pt-36 pb-20 px-8 md:px-16 md:max-w-7xl mx-auto">
        <p className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          2026 Annual Report
        </p>
        <h1 className={`text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-primary-black dark:text-primary-white transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? '100ms' : '0ms' }}>
          AI in Design.<br />
          <span className="italic font-normal text-primary-orange">The Rebuild.</span>
        </h1>
        <p className={`text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed mb-12 font-light transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? '200ms' : '0ms' }}>
          From experimentation to infrastructure. How design teams are restructuring craft, tools, and culture for the age of infinite output.
        </p>
        <a href="#chapters" className={`inline-flex items-center gap-2 text-sm font-medium bg-primary-orange text-primary-white px-6 py-3 rounded-full hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700 hover:scale-105 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? '300ms' : '0ms' }}>
          Read the report <ArrowDown size={16} />
        </a>
      </section>

      {/* Featured Quote */}
      <section ref={quotesRef} className={`py-20 px-8 md:px-16 md:max-w-5xl mx-auto border-y border-primary-black/10 dark:border-primary-white/10 ${quotesVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <blockquote className="text-3xl md:text-5xl font-medium leading-snug tracking-tight text-primary-black dark:text-primary-white">
          "AI is sparking a creative renaissance in design. With new instruments, it's our chance to compose wholly new music."
        </blockquote>
        <cite className="block mt-8 text-sm text-primary-black/50 dark:text-primary-white/50 not-italic">Katie Dill — Head of Design, Stripe</cite>
      </section>

      {/* Chapters */}
      <section id="chapters" ref={chaptersRef} className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
        <h2 className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-12 transition-all duration-700 ${chaptersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Chapters</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              num: "01",
              title: "Tools",
              desc: "The instruments of the rebuild. How design systems, AI editors, and generative interfaces are reshaping the craft of making.",
            },
            {
              num: "02",
              title: "Craft",
              desc: "Quality at scale. From taste to taste-testing — how senior designers are defining what good looks like in a world of infinite drafts.",
            },
            {
              num: "03",
              title: "Teams",
              desc: "Structure meets speed. How design orgs are flattening hierarchies, merging disciplines, and redefining what a team does together.",
            },
          ].map((chapter, idx) => (
            <a
              key={chapter.num}
              href="#"
              className={`group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 hover:border-primary-black dark:hover:border-primary-white hover:-translate-y-2 bg-primary-white dark:bg-primary-dark-card transition-all duration-700`}
              style={{
                opacity: chaptersVisible ? 1 : 0,
                transform: chaptersVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: chaptersVisible ? `${idx * 100}ms` : '0ms'
              }}
            >
              <span className="text-4xl font-bold text-primary-black dark:text-primary-white group-hover:text-primary-orange transition-smooth">
                {chapter.num}
              </span>
              <h3 className="text-2xl font-bold mt-3 mb-3 text-primary-black dark:text-primary-white">
                {chapter.title}
              </h3>
              <p className="text-sm text-primary-black/50 dark:text-primary-white/50 leading-relaxed group-hover:text-primary-black/70 dark:group-hover:text-primary-white/70 transition-smooth">
                {chapter.desc}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section id="teams" ref={caseStudiesRef} className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
        <h2 className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-4 transition-all duration-700 ${
          caseStudiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Case Studies
        </h2>
        <h3 className={`text-4xl md:text-6xl font-bold tracking-tight mb-16 text-primary-black dark:text-primary-white transition-all duration-700 ${
          caseStudiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: caseStudiesVisible ? '100ms' : '0ms' }}>
          How seven teams rebuilt.
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { co: "Anthropic", ready: true },
            { co: "Stripe", ready: true },
            { co: "Sierra", ready: true },
            { co: "Linear", ready: true },
            { co: "Shopify", ready: false },
            { co: "Figma", ready: false },
            { co: "Notion", ready: false },
          ].map((c, idx) => (
            <a
              key={c.co}
              href="#"
              className={`p-6 rounded-2xl border ${
                c.ready
                  ? "bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black border-primary-black dark:border-primary-white"
                  : "bg-primary-white dark:bg-primary-dark-card border-primary-black/10 dark:border-primary-white/10 text-primary-black/50 dark:text-primary-white/50"
              } hover:-translate-y-2 transition-all duration-700`}
              style={{
                opacity: caseStudiesVisible ? 1 : 0,
                transform: caseStudiesVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: caseStudiesVisible ? `${200 + (idx % 4) * 100}ms` : '0ms'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold">{c.co}</h4>
                <ArrowUpRight size={18} className="opacity-60" />
              </div>
              <span
                className={`text-xs uppercase tracking-widest ${
                  c.ready
                    ? "text-primary-white/70 dark:text-primary-black/70"
                    : "text-primary-black/30 dark:text-primary-white/30"
                }`}
              >
                {c.ready ? "Available" : "Coming soon"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section ref={methodologyRef} className="py-20 px-8 md:px-16 md:max-w-7xl mx-auto border-t border-primary-black/10 dark:border-primary-white/10">
        <h2 className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-12 transition-all duration-700 ${
          methodologyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Methodology
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { stat: "500+", desc: "Designers surveyed across 60+ countries. From startups to Fortune 500s." },
            { stat: "120", desc: "In-depth interviews with product, engineering, and design leaders." },
            { stat: "60+", desc: "Public sources, research papers, and open-source contributions analyzed." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="transition-all duration-700"
              style={{
                opacity: methodologyVisible ? 1 : 0,
                transform: methodologyVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: methodologyVisible ? `${idx * 100}ms` : '0ms'
              }}
            >
              <span className="text-6xl font-bold text-primary-black dark:text-primary-white">
                {item.stat}
              </span>
              <p className="text-sm text-primary-black/50 dark:text-primary-white/50 mt-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-16 border-t border-primary-black/10 dark:border-primary-white/10">
        <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2 text-primary-black dark:text-primary-white">
              State of AI Design
            </h4>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50">
              A research initiative on the future of design and technology.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-primary-black/60 dark:text-primary-white/60">
            <a href="#" className="hover:text-primary-orange transition-smooth">
              About
            </a>
            <a href="#" className="hover:text-primary-orange transition-smooth">
              Subscribe
            </a>
            <a href="#" className="hover:text-primary-orange transition-smooth">
              Made in Framer
            </a>
          </div>
        </div>
        <p className="text-xs text-primary-black/30 dark:text-primary-white/30 mt-12">
          © 2026 State of AI Design. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
