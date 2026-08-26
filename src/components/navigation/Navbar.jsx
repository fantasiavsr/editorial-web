import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

export default function Navbar({ title, links, onNavigate }) {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShow(window.innerWidth >= 768 ? (y < lastY || y < 80) : true);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-16 py-4 md:py-6 bg-primary-white/95 dark:bg-primary-dark-bg/95 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10 transition-all duration-500 ease-out ${show ? 'translate-y-0' : '-translate-y-full'}`}>
      <button onClick={() => onNavigate?.('home')} className="text-xs md:text-sm font-medium tracking-tight text-primary-black dark:text-primary-white hover:text-primary-orange transition-smooth truncate max-w-[140px] md:max-w-none">{title}</button>
      <div className="flex items-center gap-3 md:gap-6">
        <ThemeToggle />
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <div className="hidden md:flex gap-2 md:gap-4 text-xs md:text-sm text-primary-black/70 dark:text-primary-white/70">
          {links.map((l) => (
            <button key={l.key} onClick={() => onNavigate?.(l.key)} className="hover:text-primary-orange transition-smooth text-left">{l.label}</button>
          ))}
        </div>
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 bg-primary-white dark:bg-primary-dark-card border-b border-primary-white/10 px-6 py-6 flex flex-col gap-4 md:hidden z-50 shadow-2xl backdrop-blur-xl" style={{ animation: 'curtainReveal 0.35s ease-out' }}>
            {links.map((l, i) => (
              <button key={l.key} onClick={() => { onNavigate?.(l.key); setMobileOpen(false); }} className="text-lg font-medium text-primary-black dark:text-primary-white hover:text-primary-orange transition-smooth text-left py-1" style={{ animation: 'staggerReveal 0.3s ease-out forwards', animationDelay: `${i * 0.05}s`, opacity: 0 }}>{l.label}</button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
