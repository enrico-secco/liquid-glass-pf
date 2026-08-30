"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/content";
import { EASE } from "@/components/primitives/Reveal";

const SPRING = { type: "spring" as const, stiffness: 260, damping: 26, mass: 1 };

/**
 * Floating Liquid Glass capsule (spec §8.1). Detached from the viewport
 * edges; adapts almost imperceptibly on scroll (denser glass, stronger
 * shadow, slight shrink). The active-link indicator is a glass droplet
 * that slides between items on a spring via a shared layoutId.
 */
export default function GlassNav() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section currently owns the center band of the viewport.
  useEffect(() => {
    const ids = site.nav.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [...EASE] }}
    >
      <motion.nav
        className="glass flex items-center gap-1 rounded-full py-1.5 pl-5 pr-1.5"
        animate={{ scale: scrolled ? 0.96 : 1 }}
        transition={SPRING}
        style={{
          // Scroll adaptation: denser material, stronger separation.
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.09)"
            : "var(--glass-bg)",
          boxShadow: scrolled
            ? "inset 0 1px 0 var(--glass-highlight), 0 12px 40px rgba(0,0,0,0.5)"
            : "inset 0 1px 0 var(--glass-highlight), var(--glass-shadow)",
          transition:
            "background-color 600ms var(--ease), box-shadow 600ms var(--ease)",
        }}
      >
        <a
          href="#top"
          className="mr-4 text-sm font-medium tracking-tight"
          aria-label={site.name}
        >
          {site.name.split(" ").map((w) => w[0]).join("")}
          <span className="text-(--accent)">.</span>
        </a>

        <ul className="flex items-center">
          {site.nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-droplet"
                    className="absolute inset-0 rounded-full bg-white/10"
                    style={{
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                    }}
                    transition={SPRING}
                  />
                )}
                <a
                  href={item.href}
                  className={`relative block rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 sm:px-4 ${
                    isActive ? "text-(--fg)" : "text-(--muted) hover:text-(--fg)"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </motion.header>
  );
}
