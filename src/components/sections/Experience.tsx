"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { experience } from "@/content/content";
import SectionHeading from "@/components/sections/SectionHeading";
import { EASE } from "@/components/primitives/Reveal";

/**
 * Focus stack (spec §8.4): the role crossing the center band of the
 * viewport is emphasized; the others stay quiet. Each block expands to
 * reveal CV-grade highlights inside a shallow glass panel.
 */
function RoleBlock({ role }: { role: (typeof experience)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const focused = useInView(ref, { margin: "-35% 0px -45% 0px" });
  const [open, setOpen] = useState(false);
  const active = reduced || open ? true : focused;
  const panelId = `highlights-${role.company.replace(/[^a-zA-Z]+/g, "-")}`;

  return (
    <motion.div
      ref={ref}
      className="border-t border-white/8 transition-opacity duration-500 hover:opacity-100!"
      animate={{ opacity: active ? 1 : 0.35 }}
      transition={{ duration: 0.6, ease: [...EASE] }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        data-cursor={open ? "Close" : "Highlights →"}
        className="group grid w-full gap-2 py-10 text-left lg:grid-cols-12 lg:gap-8 lg:py-14"
      >
        <div className="flex items-start justify-between gap-4 lg:col-span-6 lg:block">
          <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.02em]">
            {role.company}
          </h3>
          {/* Expand affordance — glass chip, rotates to × when open */}
          <span
            aria-hidden
            className="chip mt-2 transition-colors duration-300 group-hover:text-(--fg) lg:hidden"
          >
            {open ? "−" : "+"}
          </span>
        </div>
        <div className="lg:col-span-3">
          <p className="text-sm text-(--muted)">{role.role}</p>
          <p className="mt-1 font-mono text-[12px] text-(--faint)">
            {role.period}
          </p>
        </div>
        <div className="flex items-start justify-between gap-6 lg:col-span-3">
          <p className="text-sm leading-relaxed text-(--muted)">
            {role.summary}
          </p>
          <motion.span
            aria-hidden
            className="chip mt-0.5 hidden shrink-0 transition-colors duration-300 group-hover:text-(--fg) lg:inline-flex"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [...EASE] }}
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease: [...EASE] }}
            className="overflow-hidden"
          >
            <div
              className="glass glass-shallow mb-12 p-8 lg:p-10"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--faint)">
                Key contributions
              </p>
              <ul className="mt-6 grid gap-x-12 gap-y-4 lg:grid-cols-2">
                {role.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-(--muted)">
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {role.stack.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-32 sm:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" title="Experience" />
        <div className="mt-16 border-b border-white/8">
          {experience.map((role) => (
            <RoleBlock key={role.company} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
