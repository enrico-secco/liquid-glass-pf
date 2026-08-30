"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export const EASE = [0.32, 0.72, 0, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Viewport entry reveal (spec §8.3): translateY + fade + blur, once.
 * Wraps content without affecting layout, so reveals never cause CLS.
 * Under prefers-reduced-motion it degrades to a short fade.
 */
export default function Reveal({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y: 60, filter: "blur(6px)" }
      }
      whileInView={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: reduced ? 0.2 : 0.9,
        delay,
        ease: [...EASE],
      }}
    >
      {children}
    </motion.div>
  );
}
