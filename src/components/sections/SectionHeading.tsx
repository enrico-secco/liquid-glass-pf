import Reveal from "@/components/primitives/Reveal";

export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[13px] text-(--accent)">{index}</span>
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-[-0.025em]">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
