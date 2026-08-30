"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Background environment (spec §5.1): a dark room containing softly
 * illuminated air. Three low-frequency light fields drifting on 22–34s
 * cycles, nudged a few px by the slow pointer channel, plus two anchor
 * lights under the fixed nav.
 *
 * Scroll-directed lighting (spec §8 — sections transition "through
 * gradual background-lighting changes"): two full-viewport temperature
 * washes crossfade with scroll progress. The room reads warm at the
 * hero, cools through the middle of the page, and warms again at the
 * contact — light narrates the descent. Static under reduced motion.
 */
export default function AmbientLight() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const warm = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [1, 0.25, 0.2, 1]);
  const cool = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 1, 1, 0.15]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate3d(calc(var(--px) * 10px), calc(var(--py) * 10px), 0)",
        }}
      >
        {/* Scroll-directed temperature washes */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: reduced ? 0.6 : warm,
            background:
              "radial-gradient(60% 55% at 32% 34%, rgba(227,178,113,0.055), transparent 70%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: reduced ? 0 : cool,
            background:
              "radial-gradient(60% 55% at 68% 58%, rgba(150,170,200,0.06), transparent 70%)",
          }}
        />

        {/* Light anchored behind the fixed nav: glass never floats over a
            void. Two temperatures side by side — saturate(180%) amplifies
            the chromatic variance across the capsule. Shifts with the
            pointer via the parent wrapper. */}
        <div
          className="ambient-c absolute -top-[14%] left-[38%] h-[36vmax] w-[36vmax] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(227,178,113,0.12), transparent 70%)",
          }}
        />
        <div
          className="ambient-b absolute -top-[16%] left-[62%] h-[34vmax] w-[34vmax] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(150,170,200,0.10), transparent 70%)",
          }}
        />

        <div
          className="ambient-a absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(227,178,113,0.07), transparent 70%)",
          }}
        />
        <div
          className="ambient-b absolute top-[15%] -right-[25%] h-[80vmax] w-[80vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(168,178,196,0.05), transparent 70%)",
          }}
        />
        <div
          className="ambient-c absolute -bottom-[30%] left-[10%] h-[75vmax] w-[75vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(227,178,113,0.04), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
