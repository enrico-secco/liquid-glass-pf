"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/content/content";
import Reveal, { EASE } from "@/components/primitives/Reveal";
import SectionHeading from "@/components/sections/SectionHeading";

/**
 * Abstract procedural visual per project (no raster images). Each layout
 * variant gets its own composition so no two projects read the same.
 * Replace with real product imagery when available.
 */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      data-cursor="View project →"
      className="group relative w-full overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
        aspectRatio: project.layout === "full" ? "16 / 8" : "4 / 3",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-[1.03]"
        style={{
          transitionTimingFunction: "var(--ease)",
          background: "linear-gradient(135deg, #101014 0%, #09090b 100%)",
        }}
      >
        {/* Anchor lights: every visual carries light exactly where its two
            glass surfaces live — the index chip (top-left) and the hover
            control (bottom-right) — so the material never sits over void. */}
        <div
          className="absolute -left-[8%] -top-[18%] h-[55%] w-[38%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(227,178,113,0.10), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[18%] -right-[6%] h-[55%] w-[38%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(150,170,200,0.10), transparent 70%)",
          }}
        />
        {/* Composition varies by layout variant */}
        {project.layout === "full" && (
          <>
            <div
              className="absolute -left-[10%] top-[20%] h-[80%] w-[55%] rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(227,178,113,0.14), transparent 70%)",
              }}
            />
            <div className="absolute left-[16%] top-[30%] h-14 w-[46%] rounded-full border border-white/10 bg-white/4" />
            <div className="absolute left-[24%] top-[48%] h-14 w-[38%] rounded-full border border-white/8 bg-white/2" />
            <div className="absolute left-[32%] top-[66%] h-14 w-[30%] rounded-full border border-(--accent)/20 bg-(--accent)/5" />
          </>
        )}
        {project.layout === "split" && (
          <>
            <div
              className="absolute right-[-15%] top-[-20%] h-[90%] w-[70%] rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(168,178,196,0.14), transparent 70%)",
              }}
            />
            <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6" />
            <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--accent)/25 bg-white/3" />
          </>
        )}
        {project.layout === "split-reverse" && (
          <>
            <div
              className="absolute bottom-[-25%] left-[10%] h-[80%] w-[70%] rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(227,178,113,0.10), transparent 70%)",
              }}
            />
            {[18, 32, 46, 60, 74].map((left, i) => (
              <div
                key={left}
                className={`absolute top-1/2 w-[7%] -translate-y-1/2 rounded-full border ${
                  i === 2
                    ? "border-(--accent)/25 bg-(--accent)/6"
                    : "border-white/8 bg-white/3"
                }`}
                style={{ left: `${left}%`, height: `${38 + (i % 3) * 16}%` }}
              />
            ))}
          </>
        )}
      </div>
      {/* Light response on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />
      {/* Permanent glass-over-content crossing: the index chip samples the
          visual's glow — the material is always at work, like iOS chrome
          over scrolling content. */}
      <div className="glass absolute left-5 top-5 rounded-full px-4 py-2 font-mono text-[12px]">
        {project.index}
        <span className="ml-2 text-(--faint)">{project.role}</span>
      </div>
      {/* Glass control materializes over the visual on hover (spec §8.3) */}
      <div
        className="glass absolute bottom-5 right-5 translate-y-2 rounded-full px-5 py-2.5 text-[13px] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        View case study{" "}
        <span aria-hidden className="text-(--accent)">
          →
        </span>
      </div>
    </div>
  );
}

/** Progressive disclosure of the case study (spec §8.3). Exported for
 *  reuse by the Neo-Memphis variant. */
export function CaseStudy({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const rows = [
    ["Problem", project.caseStudy.problem],
    ["Challenge", project.caseStudy.challenge],
    ["Decision", project.caseStudy.decision],
    ["Implementation", project.caseStudy.implementation],
    ["Result", project.caseStudy.result],
  ] as const;

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="chip cursor-pointer py-2 text-[13px] font-medium transition-colors duration-300 hover:text-(--fg)"
      >
        {open ? "Close case study" : "Read case study"}{" "}
        <span aria-hidden className="text-(--accent)">
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.55, ease: [...EASE] }}
            className="overflow-hidden"
          >
            <dl
              className="glass glass-shallow mt-6 space-y-4 p-7"
              style={{ borderRadius: "20px" }}
            >
              {rows.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--faint)">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-(--muted)">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[13px] text-(--accent)">
          {project.index}
        </span>
        <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
          {project.title}
        </h3>
      </div>
      <p className="mt-4 max-w-md leading-relaxed text-(--muted)">
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="chip text-(--accent)">{project.role}</span>
        {project.tech.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm text-(--muted)">{project.impact}</p>
      <CaseStudy project={project} />
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="px-6 py-32 sm:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Selected work" />

        <div className="work-list mt-20 space-y-28 lg:space-y-40">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.05}>
              <article className="project">
                {project.layout === "full" ? (
                  <div>
                    <ProjectVisual project={project} />
                    <div className="mt-10 lg:max-w-2xl">
                      <ProjectMeta project={project} />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                      i % 2 ? "" : ""
                    }`}
                  >
                    <div
                      className={`lg:col-span-7 ${
                        project.layout === "split-reverse"
                          ? "lg:order-2 lg:col-start-6"
                          : ""
                      }`}
                    >
                      <ProjectVisual project={project} />
                    </div>
                    <div
                      className={`lg:col-span-5 ${
                        project.layout === "split-reverse"
                          ? "lg:order-1 lg:col-start-1"
                          : ""
                      }`}
                    >
                      <ProjectMeta project={project} />
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
