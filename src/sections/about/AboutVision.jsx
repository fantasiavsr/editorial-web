import AboutSection from "./AboutSection";

const values = [
  ["Curiosity", "We stay close to the questions that are changing the work."],
  ["Clarity", "We turn a noisy, fast-moving field into a story teams can use."],
  [
    "Craft",
    "We care about the difference between infinite output and meaningful work.",
  ],
];

export default function AboutVision() {
  return (
    <div className="bg-primary-black/4 dark:bg-primary-white/6">
      <AboutSection className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6">
              Vision / mission
            </p>
            <blockquote className="text-3xl md:text-5xl font-medium leading-snug tracking-tight">
              Make sense of the change while there is still time to shape it.
            </blockquote>
          </div>
          <div className="md:pt-12 space-y-8">
            {values.map(([title, description]) => (
              <div
                key={title}
                className="border-t border-primary-black/10 dark:border-primary-white/10 pt-5"
              >
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-primary-black/50 dark:text-primary-white/50">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AboutSection>
    </div>
  );
}
