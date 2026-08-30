"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { site, hero } from "@/content/content";
import { EASE } from "@/components/primitives/Reveal";
import MagneticButton from "@/components/primitives/MagneticButton";
import GlassSurface from "@/components/primitives/GlassSurface";

/** A line of the hero revealed by mask: rises out of overflow:hidden. */
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
        initial={
          reduced ? { opacity: 0 } : { y: "110%", filter: "blur(8px)" }
        }
        animate={reduced ? { opacity: 1 } : { y: "0%", filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay, ease: [...EASE] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * The floating glass composition (spec §8.2 hero elements — one of the few
 * places heavy glass is allowed on content). Two panels at different
 * parallax depths, leaning slightly away from / toward the pointer, so the
 * stack reads as physically layered glass.
 */
function HeroGlassStack() {
  const reduced = useReducedMotion();
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <motion.div
      className="relative hidden lg:block"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, delay: 0.9, ease: [...EASE] }}
    >
      {/* Backlight — the glass stack sits in front of its own light
          source, so blur and saturation have something to sample. */}
      <div
        aria-hidden
        className="absolute -inset-16 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 42% 38%, rgba(227,178,113,0.16), transparent 70%), radial-gradient(45% 45% at 72% 78%, rgba(150,170,200,0.11), transparent 70%)",
        }}
      />

      {/* Back panel — deeper layer, moves opposite the pointer */}
      <div
        style={{
          transform:
            "translate3d(calc(var(--px) * -8px), calc(var(--py) * -8px), 0)",
        }}
      >
        <GlassSurface
          className="w-[26rem] max-w-full p-8"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          <div className="flex items-center gap-4">
            {/* Translucent fill, no backdrop-filter: never glass-on-glass */}
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/6 text-lg font-semibold"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }}
            >
              {initials}
            </div>
            <div>
              <p className="font-medium tracking-tight">{site.name}</p>
              <p className="mt-0.5 text-sm text-(--muted)">{site.role}</p>
            </div>
          </div>

          <div className="my-6 h-px bg-white/8" />

          <dl className="space-y-3 text-sm">
            <div className="flex items-baseline justify-between gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--faint)">
                Currently
              </dt>
              <dd className="text-(--muted)">{hero.currently}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--faint)">
                Based in
              </dt>
              <dd className="text-(--muted)">{hero.location}</dd>
            </div>
          </dl>

          {/* Extra bottom room so the overlapping stats panel never covers content */}
          <div className="mt-6 flex flex-wrap gap-2 pb-14">
            {hero.stack.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </GlassSurface>
      </div>

      {/* Front panel — closer layer, moves with the pointer, overlapping */}
      <div
        className="absolute -bottom-8 -left-14"
        style={{
          transform:
            "translate3d(calc(var(--px) * 14px), calc(var(--py) * 14px), 0)",
        }}
      >
        <GlassSurface
          className="flex items-center gap-8 px-7 py-5"
          style={{ borderRadius: "20px" }}
        >
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-semibold tracking-tight">
                {stat.value}
                <span className="text-(--accent)">.</span>
              </p>
              <p className="mt-1 max-w-[9rem] text-[12px] leading-snug text-(--faint)">
                {stat.label}
              </p>
            </div>
          ))}
        </GlassSurface>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Scroll response: the hero recedes into depth as you leave it —
  // slower than the scroll (0.85x feel), fading and defocusing slightly.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentBlur = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["blur(0px)", "blur(6px)"]
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center px-6 pt-28 sm:px-12 lg:px-24 lg:pt-0"
    >
      {/* Hero light — a soft glow that leans toward the pointer. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(242,242,244,0.045), transparent 70%)",
          transform:
            "translate(calc(-50% + var(--px) * 12px), calc(-50% + var(--py) * 12px))",
        }}
      />

      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-12"
        style={
          reduced
            ? undefined
            : { y: contentY, opacity: contentOpacity, filter: contentBlur }
        }
      >
        <div className="lg:col-span-7">
          <MaskedLine delay={0.15}>
            <span className="font-mono text-[13px] tracking-[0.2em] text-(--muted) uppercase">
              {site.role}
            </span>
          </MaskedLine>

          <h1 className="mt-5 text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            <MaskedLine delay={0.26}>{site.name.split(" ")[0]}</MaskedLine>
            <MaskedLine delay={0.35}>
              <span className="text-(--muted)">{site.name.split(" ")[1]}</span>
            </MaskedLine>
          </h1>

          <MaskedLine delay={0.44} className="mt-8 max-w-xl">
            <span className="text-lg leading-relaxed text-(--muted) sm:text-xl">
              {site.statement}
            </span>
          </MaskedLine>

          <motion.div
            className="relative mt-12 flex items-center gap-8"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: [...EASE] }}
          >
            {/* Backlight for the primary CTA — the page's most interactive
                glass gets its own light source, like the nav and the card. */}
            <div
              aria-hidden
              className="absolute -left-10 -top-10 -z-10 h-36 w-72"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(227,178,113,0.13), transparent 70%)",
              }}
            />
            <MagneticButton
              href="#work"
              glass
              className="px-7 py-3.5 text-sm font-medium"
            >
              View selected work
              <span aria-hidden className="text-(--accent)">
                ↓
              </span>
            </MagneticButton>
            <a
              href="#contact"
              className="text-sm text-(--muted) transition-colors duration-300 hover:text-(--fg)"
            >
              Get in touch
            </a>
          </motion.div>

        </div>

        <div className="lg:col-span-5 lg:justify-self-end">
          <HeroGlassStack />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span className="scroll-line block h-12 w-px bg-linear-to-b from-(--faint) to-transparent" />
      </motion.div>
    </section>
  );
}
