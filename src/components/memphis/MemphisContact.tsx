import { site } from "@/content/content";
import Reveal from "@/components/primitives/Reveal";
import GlassSurface from "@/components/primitives/GlassSurface";
import MagneticButton from "@/components/primitives/MagneticButton";
import { Circle, Squiggle } from "@/components/memphis/MemphisShape";

/**
 * The conclusion of the visual journey (MEMPHIS_SPEC §23): a confident
 * closing statement surrounded by forms, with the contact interface as
 * a dense glass panel.
 */
export default function MemphisContact() {
  return (
    <>
      <section
        id="contact"
        className="relative flex min-h-[75vh] flex-col justify-center px-6 py-32 sm:px-12 lg:px-24"
      >
        <div className="relative mx-auto w-full max-w-6xl">
          <Circle
            size={90}
            color="var(--m-yellow)"
            className="m-bob absolute -top-16 right-[16%] hidden lg:block"
          />
          <Squiggle
            width={140}
            color="var(--m-blue)"
            className="absolute -left-6 -top-10 hidden lg:block"
          />

          <Reveal>
            <h2 className="text-[clamp(2.6rem,7vw,6rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
              Let&apos;s build
              <br />
              <span className="text-(--accent)">something</span>
              <br />
              great.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <GlassSurface
              className="glass-dense mt-14 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center lg:p-10"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <a
                href={`mailto:${site.email}`}
                className="email-link text-xl font-semibold tracking-tight sm:text-2xl"
              >
                {site.email}
              </a>
              <nav className="flex items-center gap-2">
                {site.socials.map((social) => (
                  <MagneticButton
                    key={social.label}
                    href={social.href}
                    className="chip px-4 py-2 text-[13px] font-medium text-(--fg)"
                  >
                    {social.label}
                  </MagneticButton>
                ))}
              </nav>
            </GlassSurface>
          </Reveal>
        </div>
      </section>

      <footer className="px-6 pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-(--faint)/30 pt-6 font-mono text-[12px] text-(--faint) sm:flex-row">
          <p>
            {site.name} — {site.role}
          </p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
