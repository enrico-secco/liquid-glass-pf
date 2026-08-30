"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Spatial environment (art direction revision): not a flat black page but
 * a dark room containing a few oversized objects of light — a cobalt disc,
 * an amber ring, a warm slab — partially cropped by the viewport, softened,
 * and parallaxing at different rates via the shared --scroll channel.
 * Color belongs to the environment; the glass picks it up.
 *
 * Scroll narrative: cool atmosphere at the hero → warmer through the
 * projects → near-neutral at experience → brighter at the contact.
 */
export default function AmbientLight() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const cool = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [1, 0.35, 0.25, 0.65]);
  const warm = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0.2, 1, 0.35, 1]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate3d(calc(var(--px) * 10px), calc(var(--py) * 10px), 0)",
        }}
      >
        {/* Temperature washes — the journey through the page */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: reduced ? 0.7 : cool,
            background:
              "radial-gradient(58% 52% at 68% 28%, rgba(88,116,214,0.075), transparent 70%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: reduced ? 0.4 : warm,
            background:
              "radial-gradient(58% 52% at 30% 62%, rgba(227,178,113,0.06), transparent 70%)",
          }}
        />

        {/* Large forms — objects in the room, not gradient fog.
            Deeper layer: drifts up slightly slower than the content. */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate3d(0, calc(var(--scroll, 0) * -0.045px), 0)",
          }}
        >
          {/* Cobalt disc — a silhouette with a readable edge, top-right,
              partially outside the viewport */}
          <div
            className="ambient-b absolute -right-[14%] -top-[22%] h-[62vmax] w-[62vmax] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(84,112,214,0.11) 58%, rgba(84,112,214,0.05) 68%, transparent 76%)",
              filter: "blur(38px)",
            }}
          />
          {/* Amber ring — left, crossing the projects zone */}
          <div
            className="ambient-a absolute -left-[18%] top-[46%] h-[52vmax] w-[52vmax] rounded-full"
            style={{
              border: "5.5vmax solid rgba(227,178,113,0.065)",
              filter: "blur(34px)",
            }}
          />
        </div>

        {/* Nearer layer: drifts down — opposing parallax creates space */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate3d(0, calc(var(--scroll, 0) * 0.03px), 0)",
          }}
        >
          {/* Warm slab — an elongated light leaning through the right side */}
          <div
            className="ambient-c absolute right-[2%] top-[38%] h-[52vmax] w-[13vmax] rotate-[24deg] rounded-full"
            style={{
              background:
                "linear-gradient(rgba(206,124,96,0.085), rgba(227,178,113,0.04))",
              filter: "blur(44px)",
            }}
          />
        </div>

        {/* Light anchored behind the fixed nav — cobalt beside amber, so
            saturate(180%) has chromatic variance to amplify. */}
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
              "radial-gradient(closest-side, rgba(96,124,220,0.12), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
