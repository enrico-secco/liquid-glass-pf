"use client";

import { useEffect, useState } from "react";

/**
 * Cursor enhancement (spec §9.3) — the native cursor stays; this adds a
 * faint trailing ring that expands over interactive elements and shows a
 * contextual label over elements carrying [data-cursor]. Position comes
 * from the shared rAF loop via --cx/--cy; this component renders nothing
 * on touch devices or under prefers-reduced-motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Enable on the first mouse movement — more reliable than matchMedia
    // for hybrid devices, and never enables from touch input.
    const onFirstMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setEnabled(true);
    };
    document.addEventListener("pointermove", onFirstMove, {
      passive: true,
      once: true,
    });

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      setHovering(el !== null);
      setLabel(el?.dataset.cursor || null);
    };
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onFirstMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50"
      style={{ transform: "translate3d(var(--cx), var(--cy), 0)" }}
    >
      <div
        className="rounded-full border border-white/60 mix-blend-difference transition-all duration-200"
        style={{
          width: hovering ? 40 : 24,
          height: hovering ? 40 : 24,
          opacity: hovering ? 0.9 : 0.45,
          transform: "translate(-50%, -50%)",
          transitionTimingFunction: "var(--ease)",
        }}
      />
      {label && (
        <span className="glass glass-shallow absolute left-5 top-4 whitespace-nowrap rounded-full px-3 py-1.5 text-xs text-(--fg)">
          {label}
        </span>
      )}
    </div>
  );
}
