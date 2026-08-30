"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Memphis Morphing (MEMPHIS_SPEC §22) — the traveler.
 *
 * One persistent shape journeys through the page as you scroll: a coral
 * circle beside the hero composition → shrinks into a cobalt dot along
 * the work column → docks as a tiny timeline marker by the experience
 * numerals → inflates into a yellow sun over the contact composition.
 * Scroll progress is spring-smoothed so the shape has inertia; the page
 * reads as one evolving composition instead of stacked sections.
 */
export default function Traveler() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 1 });

  const top = useTransform(p, [0, 0.3, 0.62, 1], ["66vh", "36vh", "28vh", "16vh"]);
  const left = useTransform(p, [0, 0.3, 0.62, 1], ["70vw", "5vw", "9vw", "78vw"]);
  const size = useTransform(p, [0, 0.3, 0.62, 1], [92, 46, 20, 130]);
  const background = useTransform(
    p,
    [0, 0.3, 0.62, 1],
    ["#ff5d4d", "#2b5cff", "#ff5d4d", "#ffc531"]
  );

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[5] hidden rounded-full lg:block"
      style={{ top, left, width: size, height: size, background, opacity: 0.9 }}
    />
  );
}
