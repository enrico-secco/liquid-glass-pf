import { site } from "@/content/content";
import Reveal from "@/components/primitives/Reveal";

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="flex min-h-[70vh] flex-col justify-center px-6 py-32 sm:px-12 lg:px-24"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-(--muted)">
              Have a project in mind?
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={`mailto:${site.email}`}
              className="email-link mt-8 block break-all text-[clamp(2rem,6.5vw,5.5rem)] font-semibold tracking-[-0.03em]"
            >
              {site.email}
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="relative px-4 pb-6">
        {/* Backlight under the footer glass */}
        <div
          aria-hidden
          className="absolute inset-x-0 -bottom-10 mx-auto h-40 max-w-4xl"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(227,178,113,0.10), transparent 70%)",
          }}
        />
        <div className="glass glass-shallow mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-[20px] px-6 py-5 sm:flex-row">
          <p className="text-[13px] text-(--faint)">
            © {new Date().getFullYear()} {site.name}
          </p>
          {/* Plain links — magnetism is reserved for the primary CTA */}
          <nav className="flex items-center gap-2">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="px-3 py-1.5 font-mono text-[12px] text-(--muted) transition-colors duration-300 hover:text-(--fg)"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
