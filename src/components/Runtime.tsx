"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The single shared rAF loop for the whole site (spec §7.1 / §12).
 * Drives Lenis smooth scroll and the two lerped pointer channels:
 *   --px/--py  normalized -1..1, lerp 0.08 — ambient light, hero glow
 *   --cx/--cy  pixels, lerp 0.15 — custom cursor
 * Everything pointer-driven reads these CSS variables; nothing else
 * is allowed to own a persistent animation loop.
 */
export default function Runtime() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const lenis = reduced
      ? null
      : new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: true });

    const root = document.documentElement.style;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let ax = tx, ay = ty; // ambient channel (slow)
    let cx = tx, cy = ty; // cursor channel (fast)

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    let raf = 0;
    let lastScroll = -1;
    const frame = (time: number) => {
      lenis?.raf(time);
      // Unitless scroll channel — consumed by scroll-reactive layers via
      // calc(var(--scroll) * <factor>px). Skipped under reduced motion.
      if (!reduced) {
        const sy = Math.round(window.scrollY);
        if (sy !== lastScroll) {
          root.setProperty("--scroll", String(sy));
          lastScroll = sy;
        }
      }
      if (finePointer && !reduced) {
        ax += (tx - ax) * 0.08;
        ay += (ty - ay) * 0.08;
        cx += (tx - cx) * 0.15;
        cy += (ty - cy) * 0.15;
        root.setProperty("--px", ((ax / window.innerWidth) * 2 - 1).toFixed(4));
        root.setProperty("--py", ((ay / window.innerHeight) * 2 - 1).toFixed(4));
        root.setProperty("--cx", `${cx.toFixed(1)}px`);
        root.setProperty("--cy", `${cy.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      lenis?.destroy();
    };
  }, []);

  return null;
}
