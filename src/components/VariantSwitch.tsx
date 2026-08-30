import Link from "next/link";

/**
 * Variant switcher as material swatches (theme-switcher pattern: the
 * control previews the world it leads to). Each orb is a miniature of
 * its variant — the dark room with a lit glass capsule, and the cream
 * Memphis world with vivid geometry. Compact by design; names live in
 * the accessible label and tooltip.
 */

function GlassSwatch() {
  return (
    <span
      aria-hidden
      className="relative block h-full w-full overflow-hidden rounded-full"
      style={{
        background:
          "radial-gradient(70% 70% at 30% 75%, rgba(227,178,113,0.45), transparent 70%), radial-gradient(60% 60% at 75% 20%, rgba(150,170,200,0.25), transparent 70%), #08080b",
      }}
    >
      {/* miniature glass capsule floating in the dark room */}
      <span
        className="absolute left-1/2 top-1/2 h-[10px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "rgba(255,255,255,0.14)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      />
    </span>
  );
}

function MemphisSwatch() {
  return (
    <span
      aria-hidden
      className="relative block h-full w-full overflow-hidden rounded-full"
      style={{ background: "#f2efe6" }}
    >
      <span
        className="absolute -left-1 -bottom-1.5 h-4 w-4 rounded-full"
        style={{ background: "#ffc531" }}
      />
      <span
        className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-full"
        style={{ border: "3px solid #2b5cff" }}
      />
      <span
        className="absolute bottom-[9px] right-[7px] h-2 w-2 rounded-full"
        style={{ background: "#ff5d4d" }}
      />
      <span
        className="absolute left-[7px] top-[7px] h-[5px] w-[5px]"
        style={{
          background: "#21b39b",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </span>
  );
}

const VARIANTS = [
  {
    key: "glass",
    href: "/",
    label: "Liquid Glass — dark · editorial · optical",
    Swatch: GlassSwatch,
  },
  {
    key: "memphis",
    href: "/memphis",
    label: "Neo-Memphis — vivid · geometric · playful",
    Swatch: MemphisSwatch,
  },
] as const;

export default function VariantSwitch({
  current,
}: {
  current: (typeof VARIANTS)[number]["key"];
}) {
  return (
    <nav
      aria-label="Design variant"
      className="glass fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full p-1.5 lg:bottom-auto lg:right-6 lg:top-5"
    >
      {VARIANTS.map(({ key, href, label, Swatch }) => {
        const active = key === current;
        return (
          <Link
            key={key}
            href={href}
            title={label}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`block h-9 w-9 rounded-full transition-all duration-300 ${
              active
                ? "ring-2 ring-(--accent)/70"
                : "opacity-55 hover:scale-110 hover:opacity-100"
            }`}
            style={{ transitionTimingFunction: "var(--ease)" }}
          >
            <Swatch />
          </Link>
        );
      })}
    </nav>
  );
}
