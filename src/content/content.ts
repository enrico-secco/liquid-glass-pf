/**
 * Single source of truth for all portfolio content (spec §13).
 * No content strings are hardcoded inside components.
 *
 * Case-study narratives are grounded in the CV facts — review the
 * wording before shipping, but no metric here is invented.
 */

export type Project = {
  id: string;
  index: string;
  title: string;
  description: string;
  role: string;
  tech: string[];
  impact: string;
  /** Visual layout variant per spec §8.3 — projects must not look identical. */
  layout: "full" | "split" | "split-reverse";
  caseStudy: {
    problem: string;
    challenge: string;
    decision: string;
    implementation: string;
    result: string;
  };
  placeholder: boolean;
};

export const site = {
  name: "Enrico Secco",
  role: "Frontend Software Engineer",
  statement:
    "Building interfaces where engineering, performance and product experience meet.",
  email: "enricoluizsecco@gmail.com",
  // TODO: set the real production domain once deployed (used by SEO files).
  url: "https://enricosecco.dev",
  description:
    "Frontend Engineer with 5+ years of experience in React, TypeScript and GraphQL — driving frontend modernization, leading technical initiatives and contributing to scalable architectures for business-critical systems.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    // TODO: replace with your real LinkedIn profile URL.
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/enrico-secco" },
  ],
};

export const hero = {
  currently: "Wiley",
  location: "Brazil · Remote",
  stack: ["React", "TypeScript", "Next.js", "GraphQL"],
  stats: [
    { value: "5+", label: "years building for the web" },
    { value: "90%", label: "ops cost cut at Wiley's ecommerce" },
  ],
};

export const projects: Project[] = [
  {
    id: "wiley-replatform",
    index: "01",
    title: "Wiley ecommerce replatform",
    description:
      "Key features of the new storefront behind a global publishing, education and research business — built with React, Node and GraphQL.",
    role: "Frontend engineer",
    tech: ["React", "Node.js", "GraphQL"],
    impact: "90% lower operational costs and 10% revenue growth.",
    layout: "full",
    caseStudy: {
      problem:
        "Wiley's legacy ecommerce platform was expensive to operate and slow to evolve.",
      challenge:
        "Replatforming business-critical purchase flows without disrupting a live global storefront.",
      decision:
        "A modern React + Node + GraphQL stack, with the E2E suites refactored in Cypress and Playwright to keep the migration safe.",
      implementation:
        "Delivered key storefront features, mentored Quality Engineers and cut E2E pipeline time by over 60%; local Docker environments with Make commands took setup from 1 hour to 20 minutes.",
      result:
        "90% reduction in operational costs and 10% increase in revenue.",
    },
    placeholder: false,
  },
  {
    id: "health-plan-sales",
    index: "02",
    title: "Online health plan sales platform",
    description:
      "An end-to-end purchase experience for health plans at Solus Saúde — from browsing to payment.",
    role: "Led development",
    tech: ["React", "TypeScript", "Node.js"],
    impact: "15% increase in health plan sales.",
    layout: "split",
    caseStudy: {
      problem:
        "Buying a health plan depended on slow, manual purchase processes.",
      challenge:
        "Designing a purchase flow reliable enough for a regulated health product — payments included.",
      decision:
        "A modern React + TypeScript front end backed by a new credit card processing solution.",
      implementation:
        "Led development of the platform and built the payments integration that reduced payment issues by 30%.",
      result: "15% more health plan sales and a smoother purchase experience.",
    },
    placeholder: false,
  },
  {
    id: "legacy-modernization",
    index: "03",
    title: "Legacy web app modernization",
    description:
      "Refactor of a legacy application into a modern React + TypeScript stack — performance, UI consistency and maintainability.",
    role: "Fullstack engineer",
    tech: ["React", "TypeScript", "Node.js"],
    impact: "20% more sales and 30% fewer support tickets.",
    layout: "split-reverse",
    caseStudy: {
      problem:
        "A legacy web application was dragging down performance, UI consistency and support load.",
      challenge: "Refactoring in production while the business kept selling.",
      decision:
        "Incremental migration to React + TypeScript, with the reimbursement architecture rebuilt from the ground up.",
      implementation:
        "Refactored the application and rebuilt the reimbursement flow, eliminating performance bottlenecks and increasing system reliability by 20%.",
      result: "20% increase in sales and a 30% drop in support tickets.",
    },
    placeholder: false,
  },
];

export const experience = [
  {
    company: "Wiley",
    role: "Frontend Software Engineer",
    period: "2023 — Present",
    summary:
      "Ecommerce replatform for a global leader in publishing, education and research — React, Node and GraphQL on business-critical purchase flows. Remote.",
    stack: ["React", "TypeScript", "GraphQL", "Node.js"],
    highlights: [
      "Contributed key features to Wiley's ecommerce replatform (React, Node, GraphQL), cutting operational costs by 90% and increasing revenue by 10%.",
      "Mentored Quality Engineers and refactored E2E suites in Cypress and Playwright, reducing pipeline execution time by over 60%.",
      "Streamlined local development with Docker environments and custom Make commands — setup went from 1 hour to 20 minutes.",
      "Led a JavaScript → TypeScript modernization, improving code maintainability by 20% and raising unit test coverage with Jest.",
      "Authored Technical Design Documents guiding the implementation of three successful technical discoveries.",
    ],
  },
  {
    company: "Solus Saúde",
    role: "Fullstack Software Engineer",
    period: "2021 — 2023",
    summary:
      "Health-tech in Londrina: sales platform, payments and the modernization of business-critical systems for health plan operators.",
    stack: ["React", "TypeScript", "Node.js", "Delphi"],
    highlights: [
      "Led the development of an online health plan sales platform, improving the purchase experience — 15% increase in sales.",
      "Refactored a legacy web application into a modern React + TypeScript stack: 20% more sales and 30% fewer support tickets.",
      "Developed a new credit card processing solution, reducing payment issues by 30%.",
      "Rebuilt the reimbursement architecture, eliminating performance bottlenecks and increasing reliability by 20%.",
    ],
  },
  {
    company: "UniFil — Centro Universitário Filadélfia",
    role: "Frontend Developer · Internship",
    period: "2020",
    summary:
      "IT department internship building web and mobile applications for academic and institutional use in Londrina.",
    stack: ["React", "Spring Boot"],
    highlights: [
      "Modernized a legacy electronic voting system — Class Components to Functional Components with React Hooks, improving maintainability.",
      "Increased data processing efficiency by 75% by automating the candidate import process with Spring Boot, replacing CSV uploads.",
    ],
  },
];

export const engineering = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "React Native", "GraphQL", "TailwindCSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL", "Prisma", "REST"],
  },
  {
    category: "Quality",
    items: ["Playwright", "Cypress", "Jest", "TDD"],
  },
  {
    category: "DevOps",
    items: ["Docker", "Nginx", "GitHub Actions", "CI/CD"],
  },
];

export const about = {
  lead: "I care about the part of software people actually touch.",
  body: [
    "Frontend engineer with 5+ years across React, TypeScript and GraphQL — driving frontend modernization, leading technical initiatives and shipping scalable architectures for business-critical systems.",
    "Away from the codebase, I organize tech meetups for Google Developers Group Londrina, helping local developers share knowledge.",
  ],
  facts: [
    {
      label: "Education",
      value: "BSc Software Engineering — UniFil (2019–2023)",
    },
    { label: "Languages", value: "English (C1) · Portuguese (native)" },
    { label: "Community", value: "Organizer @ GDG Londrina (2024 — Present)" },
    { label: "Base", value: "Brazil · Remote" },
  ],
};
