import { engineering } from "@/content/content";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/primitives/Reveal";

/**
 * Capabilities (spec §8.5) — typography and interaction, not a logo wall.
 * Technology names react subtly on hover (accent tick + shift, in CSS).
 */
export default function Engineering() {
  return (
    <section id="capabilities" className="px-6 py-32 sm:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" title="Engineering" />
        <div className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-2">
          {engineering.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              {/* Staggered columns break the mechanical grid */}
              <div className={["", "lg:mt-12", "lg:mt-2", "lg:mt-16"][i % 4]}>
                <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-(--faint)">
                  {group.category}
                </h3>
                <ul className="mt-5 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="tech cursor-default text-xl font-medium tracking-tight sm:text-2xl"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
