import { useTheme } from "next-themes";

export default function Footer({ page }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const content = {
    landing: {
      title: "State of AI Design",
      subtitle: "A research initiative on the future of design and technology.",
    },
    product: {
      title: "Product",
      subtitle: "Explore our design system products.",
    },
    pricing: { title: "Pricing", subtitle: "Plans built for every team size." },
    service: { title: "Services", subtitle: "Consulting and custom builds." },
  };

  const c = content[page] || content.landing;

  return (
    <footer className="py-16 px-8 md:px-16 border-t border-primary-black/10 dark:border-primary-white/10">
      <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <img
            src={isDark ? "/atelier dark.svg" : "/atelier light.svg"}
            alt="Atelier logo"
            className="h-12 mb-3 w-auto"
          />
          <h4 className="font-bold text-lg mb-2 text-primary-black dark:text-primary-white">
            {c.title}
          </h4>
          <p className="text-sm text-primary-black/50 dark:text-primary-white/50">
            {c.subtitle}
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
      <p className="text-xs text-primary-black/30 dark:text-primary-white/30 mt-12 md:max-w-7xl mx-auto">
        © 2026 Pricing Layouts. All rights reserved.
      </p>
    </footer>
  );
}
