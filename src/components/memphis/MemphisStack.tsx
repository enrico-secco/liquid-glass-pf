import { engineering } from "@/content/content";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

const CATEGORY_COLORS = [
  "var(--m-blue)",
  "var(--m-teal)",
  "var(--accent)",
  "var(--m-yellow)",
];

/**
 * Stack as a living ecosystem (MEMPHIS_SPEC §18): category clusters of
 * glass pills, each family keyed by one accent color — capability
 * through categories and context, never percentage bars (§19).
 */
export default function MemphisStack() {
  return (
    <section id="capabilities" className="px-6 py-32 sm:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" title="Engineering" />
        <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {engineering.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-full"
                    style={{ background: CATEGORY_COLORS[i % 4] }}
                  />
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-(--muted)">
                    {group.category}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="chip cursor-default px-4 py-2 text-sm font-medium text-(--fg) transition-transform duration-300 hover:-translate-y-1"
                      style={{ transitionTimingFunction: "var(--ease)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
