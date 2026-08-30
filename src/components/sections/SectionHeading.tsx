import Reveal from "@/components/primitives/Reveal";

/** Section heading with per-section alignment (art direction revision:
 *  sections should not share one mechanical layout). */
export default function SectionHeading({
  index,
  title,
  align = "left",
}: {
  index: string;
  title: string;
  align?: "left" | "right";
}) {
  return (
    <Reveal>
      <div
        className={`flex items-baseline gap-5 ${
          align === "right" ? "flex-row-reverse text-right" : ""
        }`}
      >
        <span className="font-mono text-[13px] text-(--accent)">{index}</span>
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-[-0.025em]">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
