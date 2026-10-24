import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Runtime from "@/components/Runtime";
import LensFilter from "@/components/LensFilter";
import Cursor from "@/components/Cursor";
import { site } from "@/content/content";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "frontend engineer",
    "React",
    "TypeScript",
    "Next.js",
    "GraphQL",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

// Structured data: lets search engines read the portfolio as a Person
// entity (name, role, employer, links) instead of just a web page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  worksFor: { "@type": "Organization", name: "Wiley" },
  alumniOf: "UniFil — Centro Universitário Filadélfia",
  address: { "@type": "PostalAddress", addressCountry: "BR" },
  knowsLanguage: ["en", "pt-BR"],
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Runtime />
        <LensFilter />
        {children}
        <Cursor />
        <div aria-hidden className="grain" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
