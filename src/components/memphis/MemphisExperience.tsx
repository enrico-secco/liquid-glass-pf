import { experience, about } from "@/content/content";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/primitives/Reveal";
import GlassSurface from "@/components/primitives/GlassSurface";

/**
 * Experience as a visual timeline (MEMPHIS_SPEC §14): oversized period
 * numerals set the rhythm, a coral marker threads the entries, and each
 * role's detail lives in a floating glass panel.
 */
export default function MemphisExperience() {
  return (
    <section id="experience" className="px-6 py-32 sm:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" title="Experience" />

        <div className="mt-20 space-y-24">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={i * 0.05}>
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="font-mono text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold tracking-tight text-(--fg)">
                    {role.period}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-3 w-3 rounded-full bg-(--accent)"
                    />
                    <span className="h-px flex-1 bg-(--faint) opacity-40" />
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <GlassSurface
                    className="p-8 lg:p-10"
                    style={{ borderRadius: "var(--radius-card)" }}
                  >
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {role.company}
                    </h3>
                    <p className="mt-1 text-sm text-(--muted)">{role.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-(--muted)">
                      {role.summary}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {role.highlights.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-relaxed text-(--muted)"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {role.stack.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlassSurface>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Editorial about statement (spec §13) */}
        <div id="about" className="mt-40 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-snug tracking-[-0.02em]">
              {about.lead}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="space-y-5 text-sm leading-relaxed text-(--muted)">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 space-y-3 border-t border-(--faint)/30 pt-6">
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
