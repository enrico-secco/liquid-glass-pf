"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site, hero } from "@/content/content";
import { EASE } from "@/components/primitives/Reveal";
import MagneticButton from "@/components/primitives/MagneticButton";
import GlassSurface from "@/components/primitives/GlassSurface";
import {
  Circle,
  Ring,
  Triangle,
  Squiggle,
  Dots,
} from "@/components/memphis/MemphisShape";

function MaskedLine({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={reduced ? { opacity: 0 } : { y: "110%", filter: "blur(8px)" }}
        animate={reduced ? { opacity: 1 } : { y: "0%", filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay, ease: [...EASE] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * The hero composition (MEMPHIS_SPEC §09): editorial uppercase display on
 * the left; on the right, a living arrangement of Memphis forms with a
 * glass panel floating INSIDE it — the moment that states the concept:
 * glass interface inside a Neo-Memphis world.
 */
function HeroComposition() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="relative hidden h-[26rem] lg:block"
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [...EASE] }}
    >
      {/* Depth layers move at different pointer rates */}
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate3d(calc(var(--px) * -10px), calc(var(--py) * -10px), 0)",
        }}
      >
        <Circle
          size={210}
          color="var(--m-yellow)"
          className="m-bob absolute left-6 top-8"
        />
        <Ring
          size={250}
          thickness={20}
          color="var(--m-blue)"
          className="m-drift absolute right-0 top-0"
        />
        <Triangle
          size={110}
          color="var(--m-teal)"
          className="m-bob-late absolute bottom-10 left-0 rotate-[-8deg]"
        />
        <Dots
          size={150}
          color="rgba(27,29,46,0.35)"
          className="absolute bottom-0 right-10"
        />
        <Squiggle
          width={150}
          color="var(--accent)"
          className="m-bob absolute -top-4 left-[42%]"
        />
      </div>

      {/* The glass panel floats closer than the shapes it samples */}
      <div
        className="absolute left-[22%] top-[30%]"
        style={{
          transform:
            "translate3d(calc(var(--px) * 14px), calc(var(--py) * 14px), 0)",
        }}
      >
        <GlassSurface
          className="glass-dense w-72 p-6"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--faint)">
            Currently
          </p>
          <p className="mt-1 font-medium">{hero.currently}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {hero.stack.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </GlassSurface>
      </div>
    </motion.div>
  );
}

export default function MemphisHero() {
  const reduced = useReducedMotion();
  const [first, last] = site.name.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center px-6 pt-28 sm:px-12 lg:px-24 lg:pt-0"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <MaskedLine delay={0.15}>
            <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-(--muted)">
              {site.role}
            </span>
          </MaskedLine>

          <h1 className="mt-6 text-[clamp(3.2rem,9vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
            <MaskedLine delay={0.24}>{first}</MaskedLine>
            <MaskedLine delay={0.33}>
              <span className="text-(--accent)">{last}</span>
            </MaskedLine>
          </h1>

          <MaskedLine delay={0.44} className="mt-8 max-w-xl">
            <span className="text-lg leading-relaxed text-(--muted) sm:text-xl">
              {site.statement}
            </span>
          </MaskedLine>

          <motion.div
            className="mt-12 flex items-center gap-8"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: [...EASE] }}
          >
            <MagneticButton
              href="#work"
              glass
              className="px-7 py-3.5 text-sm font-semibold"
            >
              View selected work
              <span aria-hidden className="text-(--accent)">
                ↓
              </span>
            </MagneticButton>
            <a
              href="#contact"
              className="text-sm font-medium text-(--muted) transition-colors duration-300 hover:text-(--fg)"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <HeroComposition />
        </div>
      </div>
    </section>
  );
}
