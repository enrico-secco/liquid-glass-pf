import { about } from "@/content/content";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

export default function About() {
  return (
    <section id="about" className="px-6 py-32 sm:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" title="About" />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 lg:pl-[8%]">
            <p className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-snug tracking-[-0.02em]">
              {about.lead}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <div className="space-y-5 text-sm leading-relaxed text-(--muted)">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 space-y-3 border-t border-white/8 pt-6">
              {about.facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline gap-4">
                  <dt className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-(--faint)">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-(--muted)">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
