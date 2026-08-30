"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

const SPRING = { stiffness: 260, damping: 22, mass: 1 };
/** Fraction of the pointer offset the element follows (spec §8.2). */
const PULL = 0.3;

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  glass?: boolean;
  cursorLabel?: string;
};

/**
 * Magnetic interactive element: within its hover area the element is
 * gently attracted toward the pointer and returns on a spring. Springs
 * only run during interaction — no persistent loops.
 */
export default function MagneticButton({
  href,
  children,
  className,
  glass = false,
  cursorLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * PULL);
    y.set((e.clientY - (rect.top + rect.height / 2)) * PULL);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor={cursorLabel}
      className={`${glass ? "glass" : ""} inline-flex items-center gap-3 ${className ?? ""}`}
      style={{ x, y, borderRadius: "var(--radius-capsule)" }}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      whileHover={reduced ? undefined : { scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", ...SPRING }}
    >
      {children}
    </motion.a>
  );
}
