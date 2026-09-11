import AboutSection from "./AboutSection";

const focusAreas = [
  {
    number: "01",
    title: "Tools",
    description:
      "We look at the instruments of the rebuild: design systems, AI editors, and generative interfaces reshaping the craft of making.",
  },
  {
    number: "02",
    title: "Craft",
    description:
      "We follow how teams define quality at scale, moving from taste to taste-testing in a world of infinite drafts.",
  },
  {
    number: "03",
    title: "Teams",
    description:
      "We examine how design organizations are flattening hierarchies, merging disciplines, and redefining what teams do together.",
  },
];

export default function AboutFocus() {
  return (
    <AboutSection className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50">
          Our focus
        </p>
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">
            What we do
          </h2>
          <div className="grid gap-4">
            {focusAreas.map((area) => (
              <article
                key={area.number}
                className="grid md:grid-cols-[72px_1fr] gap-5 p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 hover:border-primary-orange transition-colors"
              >
                <span className="text-3xl font-bold text-primary-orange">
                  {area.number}
                </span>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-primary-black/50 dark:text-primary-white/50">
                    {area.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
