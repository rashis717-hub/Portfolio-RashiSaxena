// Site-wide profile, links and navigation. Anything not yet supplied is a [YOUR INPUT] placeholder.

export type NavItem = {
  label: string;
  href: string;
  /** Path prefix that marks this item as the current page. */
  match?: string;
  /** Opens a file or another site rather than a page of this site. */
  external?: boolean;
};

export type StatItem = {
  id: string;
  value: number | null;
  suffix: string;
  label: string;
  detail: readonly string[];
  fallback?: { value: number; suffix: string; label: string };
};

export const stats = [
  {
    id: "clients",
    value: 6,
    suffix: "+",
    label: "Enterprise clients",
    detail: ["Financial services", "Manufacturing", "Enterprise technology", "Sales-led enterprise"], // MYK's industry: [YOUR INPUT]
  },
  {
    id: "industries",
    value: 3,
    suffix: "+",
    label: "Industries",
    detail: ["Financial services", "Manufacturing", "Enterprise technology and IT infrastructure"],
  },
  {
    id: "reach",
    value: null, // [YOUR INPUT: people using the platforms]
    suffix: "+",
    label: "People using the platforms",
    detail: ["Counted across deployed platforms in my case studies"],
    fallback: { value: 150, suffix: "+", label: "Teams using the platforms" },
  },
] as const;

export const site = {
  name: "Rashi Saxena",
  url: "https://portfolio-rashi-saxena.vercel.app",
  role: "UX Lead, enterprise and agentic AI product design",
  positioning: "UX Lead specialising in enterprise B2B AI platforms, agent experience (AX), and human-in-the-loop systems.",
  description: "UX Lead specialising in enterprise and agentic AI product design.",
  email: "rashis717@gmail.com",
  phone: "+91 8840295743",
  linkedin: "https://www.linkedin.com/in/rashi-saxena-2k2710",
  // Add the file at /public/resume.pdf.
  resume: "/resume.pdf",
  nav: [
    { label: "Works", href: "/#work", match: "/#work" },
    { label: "About Me", href: "/#about", match: "/about" },
    { label: "Contact", href: "/#contact", match: "/#contact" },
    { label: "Resume", href: "/resume.pdf", external: true },
  ] satisfies NavItem[],
  footer: "Enterprise AI platforms where people and agents work together.",
  hero: {
    label: "UX Lead, enterprise AI",
    headline: "I design enterprise AI platforms where people and agents work together.",
    rotating: ["Agent experience.", "Design systems.", "Platform UX."],
    // Screen readers hear this sentence instead of the rotating phrases.
    rotatingSentence: "Agent experience, design systems and platform UX.",
    workCta: "View work",
    resumeCta: "Resume",
    location: "New Delhi, India",
  },
  work: {
    title: "Selected work",
    // Shown until the first case study exists in content/work.
    empty: "Case studies are being written up.",
    showPrivateInList: false,
  },
  // Grey logo strip above Selected work. Heights balance the set: wide wordmarks sit lower than
  // squarer marks. Sources and licence notes: /public/logos/SOURCES.md.
  logos: {
    label: "Companies I have worked with",
    items: [
      { name: "Godrej", src: "/logos/godrej.svg", height: 26 },
      { name: "Avendus", src: "/logos/avendus.svg", height: 18 },
      { name: "Zebra Technologies", src: "/logos/zebra.svg", height: 26 },
      { name: "Covasant", src: "/logos/covasant.svg", height: 18 },
      { name: "IBM", src: "/logos/ibm.svg", height: 22 },
      { name: "BCG", src: "/logos/bcg.svg", height: 19 },
      { name: "MYK Laticrete", src: "/logos/myk.svg", height: 14 },
    ],
  },
  // Portfolio-level headline metrics (Correction C04).
  stats,
  contact: {
    line: "Have an idea for enterprise AI? Let's talk.",
    emailCta: "Email me",
    linkedinCta: "LinkedIn",
  },
};
