"use client";

import { projects, type Project } from "@/content/content";
import Reveal from "@/components/primitives/Reveal";
import GlassSurface from "@/components/primitives/GlassSurface";
import SectionHeading from "@/components/sections/SectionHeading";
import { CaseStudy } from "@/components/sections/Work";
import {
  Circle,
  Ring,
  Semi,
  Triangle,
  ZigZag,
  Dots,
} from "@/components/memphis/MemphisShape";

/** Per-project Memphis mini-composition — each project owns an accent
 *  family so the three panels read as siblings, not clones (spec §16). */
function ProjectComposition({ project }: { project: Project }) {
  return (
    <div className="relative h-56 overflow-visible lg:h-64">
      {project.layout === "full" && (
        <>
          <Circle size={150} color="var(--m-yellow)" className="m-bob absolute left-4 top-2" />
          <Ring size={120} thickness={14} color="var(--m-blue)" className="m-drift absolute right-8 top-10" />
          <ZigZag width={130} color="var(--accent)" className="absolute bottom-2 left-[38%]" />
        </>
      )}
      {project.layout === "split" && (
        <>
          <Semi size={170} color="var(--m-teal)" className="m-bob absolute left-6 top-8 rotate-[12deg]" />
          <Dots size={130} color="rgba(27,29,46,0.3)" className="absolute right-6 top-2" />
          <Circle size={70} color="var(--accent)" className="m-bob-late absolute bottom-4 right-[30%]" />
        </>
      )}
      {project.layout === "split-reverse" && (
        <>
          <Triangle size={130} color="var(--m-pink)" className="m-bob absolute left-8 top-4 rotate-[6deg]" />
          <Ring size={90} thickness={11} color="var(--m-yellow)" className="m-spin absolute right-16 top-0" />
          <Squiggleish />
        </>
      )}
    </div>
  );
}

function Squiggleish() {
  return (
    <Dots
      size={150}
      color="rgba(43,92,255,0.4)"
      className="absolute bottom-0 right-2"
    />
  );
}

function ProjectPanel({ project }: { project: Project }) {
  const meta = (
    <div>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-2xl font-bold text-(--accent)">
          {project.index}
        </span>
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
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

  // Layout variation (spec §16): wide / tall-offset / asymmetric.
  if (project.layout === "full") {
    return (
      <GlassSurface className="p-8 lg:p-12" style={{ borderRadius: "var(--radius-card)" }}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {meta}
          <ProjectComposition project={project} />
        </div>
      </GlassSurface>
    );
  }
  if (project.layout === "split") {
    return (
      <div className="lg:ml-auto lg:w-[62%]">
        <GlassSurface className="p-8 lg:p-10" style={{ borderRadius: "var(--radius-card)" }}>
          <ProjectComposition project={project} />
          <div className="mt-8">{meta}</div>
        </GlassSurface>
      </div>
    );
  }
  return (
    <div className="lg:w-[70%]">
      <GlassSurface className="p-8 lg:p-10" style={{ borderRadius: "var(--radius-card)" }}>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ProjectComposition project={project} />
          {meta}
        </div>
      </GlassSurface>
    </div>
  );
}

export default function MemphisWork() {
  return (
    <section id="work" className="relative px-6 py-32 sm:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Selected work" />
        <div className="mt-16 space-y-20 lg:space-y-28">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectPanel project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
