import { ArrowDown, ArrowUpRight } from "lucide-react";
import ThemeToggle from '../../components/ThemeToggle';

// Theme toggle script to prevent FOUC
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-primary-white/95 dark:bg-primary-dark-bg/95 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10 transition-colors">
        <a href="#" className="text-sm font-medium tracking-tight text-primary-black dark:text-primary-white">State of AI Design</a>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <div className="flex gap-8 text-sm text-primary-black/70 dark:text-primary-white/70">
            <a href="#report" className="hover:text-primary-orange transition-colors">Report</a>
            <a href="#chapters" className="hover:text-primary-orange transition-colors">Chapters</a>
            <a href="#teams" className="hover:text-primary-orange transition-colors">Teams</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="report" className="pt-36 pb-20 px-8 md:px-16 md:max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6">2026 Annual Report</p>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-primary-black dark:text-primary-white">
          AI in Design.<br />
          <span className="italic font-normal text-primary-orange">The Rebuild.</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed mb-12 font-light">
          From experimentation to infrastructure. How design teams are restructuring craft, tools, and culture for the age of infinite output.
        </p>
        <a href="#chapters" className="inline-flex items-center gap-2 text-sm font-medium bg-primary-orange text-primary-white px-6 py-3 rounded-full hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all">
          Read the report <ArrowDown size={16} />
        </a>
      </section>

      {/* Featured Quote */}
      <section className="py-20 px-8 md:px-16 md:max-w-5xl mx-auto border-y border-primary-black/10 dark:border-primary-white/10">
        <blockquote className="text-3xl md:text-5xl font-medium leading-snug tracking-tight text-primary-black dark:text-primary-white">
          "AI is sparking a creative renaissance in design. With new instruments, it's our chance to compose wholly new music."
        </blockquote>
        <cite className="block mt-8 text-sm text-primary-black/50 dark:text-primary-white/50 not-italic">Katie Dill — Head of Design, Stripe</cite>
      </section>

      {/* Chapters */}
      <section id="chapters" className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-12">Chapters</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <a href="#" className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 hover:border-primary-black dark:hover:border-primary-white hover:-translate-y-1 transition-all bg-primary-white dark:bg-primary-dark-card">
            <span className="text-4xl font-bold text-primary-black dark:text-primary-white">01</span>
            <h3 className="text-2xl font-bold mt-3 mb-3 text-primary-black dark:text-primary-white">Tools</h3>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 leading-relaxed">The instruments of the rebuild. How design systems, AI editors, and generative interfaces are reshaping the craft of making.</p>
          </a>
          <a href="#" className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 hover:border-primary-black dark:hover:border-primary-white hover:-translate-y-1 transition-all bg-primary-white dark:bg-primary-dark-card">
            <span className="text-4xl font-bold text-primary-black dark:text-primary-white">02</span>
            <h3 className="text-2xl font-bold mt-3 mb-3 text-primary-black dark:text-primary-white">Craft</h3>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 leading-relaxed">Quality at scale. From taste to taste-testing — how senior designers are defining what good looks like in a world of infinite drafts.</p>
          </a>
          <a href="#" className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 hover:border-primary-black dark:hover:border-primary-white hover:-translate-y-1 transition-all bg-primary-white dark:bg-primary-dark-card">
            <span className="text-4xl font-bold text-primary-black dark:text-primary-white">03</span>
            <h3 className="text-2xl font-bold mt-3 mb-3 text-primary-black dark:text-primary-white">Teams</h3>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 leading-relaxed">Structure meets speed. How design orgs are flattening hierarchies, merging disciplines, and redefining what a team does together.</p>
          </a>
        </div>
      </section>

      {/* Case Studies */}
      <section id="teams" className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-4">Case Studies</h2>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-16 text-primary-black dark:text-primary-white">How seven teams rebuilt.</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { co: "Anthropic", ready: true },
            { co: "Stripe", ready: true },
            { co: "Sierra", ready: true },
            { co: "Linear", ready: true },
            { co: "Shopify", ready: false },
            { co: "Figma", ready: false },
            { co: "Notion", ready: false },
          ].map((c) => (
            <a key={c.co} href="#" className={`p-6 rounded-2xl border ${c.ready ? "bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black border-primary-black dark:border-primary-white" : "bg-primary-white dark:bg-primary-dark-card border-primary-black/10 dark:border-primary-white/10 text-primary-black/50 dark:text-primary-white/50"} hover:-translate-y-1 transition-all`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold">{c.co}</h4>
                <ArrowUpRight size={18} />
              </div>
              <span className={`text-xs uppercase tracking-widest ${c.ready ? "text-primary-white/70 dark:text-primary-black/70" : "text-primary-black/30 dark:text-primary-white/30"}`}>
                {c.ready ? "Available" : "Coming soon"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 px-8 md:px-16 md:max-w-7xl mx-auto border-t border-primary-black/10 dark:border-primary-white/10">
        <h2 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-12">Methodology</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <span className="text-6xl font-bold text-primary-black dark:text-primary-white">500+</span>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 mt-3">Designers surveyed across 60+ countries. From startups to Fortune 500s.</p>
          </div>
          <div>
            <span className="text-6xl font-bold text-primary-black dark:text-primary-white">120</span>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 mt-3">In-depth interviews with product, engineering, and design leaders.</p>
          </div>
          <div>
            <span className="text-6xl font-bold text-primary-black dark:text-primary-white">60+</span>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 mt-3">Public sources, research papers, and open-source contributions analyzed.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-16 border-t border-primary-black/10 dark:border-primary-white/10">
        <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2 text-primary-black dark:text-primary-white">State of AI Design</h4>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50">A research initiative on the future of design and technology.</p>
          </div>
          <div className="flex gap-8 text-sm text-primary-black/60 dark:text-primary-white/60">
            <a href="#" className="hover:text-primary-orange transition-colors">About</a>
            <a href="#" className="hover:text-primary-orange transition-colors">Subscribe</a>
            <a href="#" className="hover:text-primary-orange transition-colors">Made in Framer</a>
          </div>
        </div>
        <p className="text-xs text-primary-black/30 dark:text-primary-white/30 mt-12">© 2026 State of AI Design. All rights reserved.</p>
      </footer>
    </main>
  );
}
