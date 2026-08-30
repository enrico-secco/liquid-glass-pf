import {
  Circle,
  Ring,
  Semi,
  Dots,
  ZigZag,
  Cross,
} from "@/components/memphis/MemphisShape";

/**
 * Layers 1–2 of the controlled-chaos hierarchy (MEMPHIS_SPEC §06):
 * large, slow Neo-Memphis forms + atmosphere. Density lives at the
 * edges; the center stays quiet so content (layer 4) always wins.
 *
 * Motion model: the wrapper follows the pointer; two inner layers move
 * against/with the scroll at different rates (§21 — the composition
 * rearranges as you navigate), and each shape keeps its own slow drift.
 * On mobile, secondary shapes are dropped (§27 — reduced density).
 */
export default function Environment() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate3d(calc(var(--px) * 14px), calc(var(--py) * 14px), 0)",
        }}
      >
        {/* Scroll layer A — recedes upward slightly faster than the page */}
        <div
          className="absolute inset-0"
          style={{
            transform:
              "translate3d(0, calc(var(--scroll, 0) * -0.035px), 0)",
          }}
        >
          <Ring
            size={340}
            thickness={26}
            color="var(--m-blue)"
            className="m-drift absolute -right-24 top-[8%] opacity-90"
          />
          <Circle
            size={260}
            color="var(--m-yellow)"
            className="m-bob absolute -left-20 top-[34%]"
          />
          <Dots
            size={240}
            color="rgba(27,29,46,0.28)"
            className="absolute left-[6%] top-[6%] hidden sm:block"
          />
          <Cross
            size={34}
            color="var(--m-yellow)"
            className="m-spin absolute left-[40%] top-[16%] hidden sm:block"
          />
        </div>

        {/* Scroll layer B — sinks gently with the scroll (opposite depth) */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate3d(0, calc(var(--scroll, 0) * 0.025px), 0)",
          }}
        >
          <Semi
            size={300}
            color="var(--accent)"
            className="m-drift absolute -bottom-10 right-[12%] rotate-[18deg]"
          />
          <Circle
            size={120}
            color="var(--m-teal)"
            className="m-bob-late absolute right-[3%] top-[46%] hidden opacity-90 sm:block"
          />
          <Ring
            size={150}
            thickness={14}
            color="var(--m-pink)"
            className="m-spin absolute bottom-[14%] left-[16%] hidden sm:block"
          />
          <ZigZag
            width={170}
            color="var(--m-blue)"
            className="m-bob absolute right-[8%] top-[68%] hidden sm:block"
          />
          <Cross
            size={26}
            color="var(--accent)"
            className="absolute bottom-[30%] left-[46%] opacity-80"
          />
        </div>

        {/* Layer 2 — atmosphere: soft central light keeps shapes from
            competing with content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 42%, rgba(242,239,230,0.92), rgba(242,239,230,0.35) 60%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
