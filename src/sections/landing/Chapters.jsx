import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Chapters() {
  const [chaptersRef, chaptersVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="chapters"
      ref={chaptersRef}
      className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto"
    >
      <h2
        className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-12 transition-all duration-700 ${chaptersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        Chapters
      </h2>
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
              transform: chaptersVisible
                ? "translateY(0)"
                : "translateY(24px)",
              transitionDelay: chaptersVisible ? `${idx * 100}ms` : "0ms",
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
  );
}
