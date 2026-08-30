"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

const GLARE_SPRING = { stiffness: 120, damping: 20, mass: 1 };

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * The core glass material (spec §6). Renders the `.glass` surface and
 * drives its specular glare: the highlight trails the pointer through a
 * spring, so the light source appears to have physical inertia rather
 * than being glued to the cursor.
 */
export default function GlassSurface({ children, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const gxRaw = useMotionValue(50);
  const gyRaw = useMotionValue(-30);
  const gx = useSpring(gxRaw, GLARE_SPRING);
  const gy = useSpring(gyRaw, GLARE_SPRING);
  const gxVar = useMotionTemplate`${gx}%`;
  const gyVar = useMotionTemplate`${gy}%`;
  const glare = useMotionValue(0);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    gxRaw.set(((e.clientX - rect.left) / rect.width) * 100);
    gyRaw.set(((e.clientY - rect.top) / rect.height) * 100);
    glare.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={`glass ${className ?? ""}`}
      style={
        {
          ...style,
          "--gx": gxVar,
          "--gy": gyVar,
          "--glare": glare,
        } as CSSProperties
      }
      onPointerMove={onPointerMove}
      onPointerLeave={() => glare.set(0)}
    >
      {children}
    </motion.div>
  );
}
