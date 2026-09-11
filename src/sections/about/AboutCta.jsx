import { ArrowUpRight } from "lucide-react";
import AboutSection from "./AboutSection";

export default function AboutCta() {
  return (
    <AboutSection className="px-8 md:px-16 pb-24 md:max-w-7xl mx-auto">
      <div className="rounded-2xl bg-primary-orange p-8 md:p-16 text-primary-white flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-white/70 mb-5">
            Keep reading
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
            See how seven teams rebuilt.
          </h2>
        </div>
        <a
          href="/#chapters"
          className="inline-flex items-center gap-2 text-sm font-medium bg-primary-white text-primary-black px-6 py-3 rounded-full hover:bg-primary-black hover:text-primary-white transition-colors"
        >
          Read the report <ArrowUpRight size={16} />
        </a>
      </div>
    </AboutSection>
  );
}
