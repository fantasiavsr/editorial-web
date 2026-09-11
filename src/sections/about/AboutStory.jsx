import AboutSection from "./AboutSection";

export default function AboutStory() {
  return (
    <div className="bg-primary-black/4 dark:bg-primary-white/6">
      <AboutSection
        id="story"
        className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto"
        threshold={0.25}
      >
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50">
            The story
          </p>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
              From ideas to experiences.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-primary-black/60 dark:text-primary-white/60 max-w-3xl">
              Good digital work starts with understanding the problem.
              <br />
              <br />
              We bring together strategy, design, technology, and practical
              thinking to create experiences that are useful, clear, and built
              to last.
            </p>
          </div>
        </div>
      </AboutSection>
    </div>
  );
}
