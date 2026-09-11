import AboutSection from "./AboutSection";

const values = [
  [
    "Curiosity",
    "We keep exploring new ideas, technologies, and ways of working.",
  ],
  [
    "Clarity",
    "We simplify complex problems into experiences people can understand and use.",
  ],
  [
    "Craft",
    "We care about the details that turn something functional into something genuinely useful.",
  ],
  [
    "Progress",
    "We build with the future in mind while solving the needs of today.",
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
              Make digital work clearer, more useful, and easier to move
              forward.
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
