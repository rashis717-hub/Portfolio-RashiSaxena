// About page content and career history drawn directly from Rashi's resume.
// No claims beyond what is in the resume.

export type TimelineEntry = {
  id: string;
  period: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  isEducation?: boolean;
};

export type SkillCategory = {
  name: string;
  skills: readonly string[];
};

export const about = {
  title: "About",
  eyebrow: "UX Lead · Enterprise & Agentic AI",
  intro: [
    "I am a UX Lead specialising in enterprise B2B AI platforms, agent experience (AX), and human-in-the-loop governance.",
    "At Covasant, I lead product design across interconnected agent management, meeting intelligence, and market intelligence platforms deployed with enterprise customers including Motilal Oswal Financial Services and MYK.",
    "My focus is designing systems where people and autonomous agents collaborate with verifiable trust: clear hand-offs, visible progress, and auditable governance.",
  ],
  introDraftNotice: "Drafted from résumé for review",
  timeline: [
    {
      id: "covasant",
      period: "Jul 2025 – Present",
      company: "Covasant Technologies",
      role: "Senior UX Engineer (UX Lead, Enterprise AI Platforms)",
      location: "Hyderabad, India",
      summary:
        "Leading UX for an interconnected enterprise AI platform suite (agent builder, registry, observability, evaluation). Designed governance lifecycle across Dev/Staging/UAT/Prod for 50+ teams at Motilal Oswal Financial Services, A2UI interactive component schemas, and the company design system.",
    },
    {
      id: "contexIQ",
      period: "Jul 2024 – Jul 2025",
      company: "ContexIQ",
      role: "Product Designer",
      location: "Remote",
      summary:
        "Led end-to-end design of GenAI products: genIQ (no-code agent builder), Investment Agent (financial analytics for Avendus), and SQL Agent (conversational plant analytics for Godrej). Delivered bespoke design systems for each agent.",
    },
    {
      id: "quantum-leap",
      period: "Nov 2023 – Aug 2024",
      company: "Quantum Leap Studio",
      role: "Visual Designer",
      location: "New Delhi, India",
      summary:
        "Creative consultant to the Department of Commerce (Ministry of Commerce and Industry, Govt. of India) and design consultant to Bhubaneswar Development Authority (AMA BHOOMI, HCIM).",
    },
    {
      id: "mitocon",
      period: "Feb 2023 – Nov 2023",
      company: "Mitocon Biomed",
      role: "Design Manager",
      location: "Mumbai, India (Remote)",
      summary:
        "Led digital design, web platforms, and creative brand strategy; created brand and web assets that improved online traction by 52% and supported onboarding APTOS.",
    },
    {
      id: "triburg",
      period: "Jan 2022 – Dec 2022",
      company: "Triburg",
      role: "Product Development and Merchandising",
      location: "Gurugram, India",
      summary:
        "Managed product development and pre-production across multiple vendors for international apparel brands including American Eagle Outfitters, Aerie, Reitmans, and Penningtons.",
    },
    {
      id: "nift",
      period: "Jul 2018 – Jul 2022",
      company: "National Institute of Fashion Technology (NIFT)",
      role: "Bachelor's degree, Fashion Technology (Grade: 8.5)",
      location: "Bhubaneswar, India",
      summary:
        "Undergraduate degree with 8.5 grade; Chief Editor of the college annual magazine; active member of the Literary Club and Film Society Bhubaneswar.",
      isEducation: true,
    },
  ] satisfies TimelineEntry[],
  skillGroups: [
    {
      name: "Product & UX Leadership",
      skills: [
        "Requirements & PoC definition",
        "Customer workshops",
        "Information architecture",
        "Role-based dashboards",
        "Governance & admin consoles",
        "Approval & lifecycle flows",
      ],
    },
    {
      name: "AI & Agentic UX",
      skills: [
        "Agent experience (AX)",
        "Human-in-the-loop checkpoints",
        "Agent observability & trace graphs",
        "Multi-turn evaluation UX",
        "Conversational & no-code builders",
        "A2UI component schemas",
      ],
    },
    {
      name: "Design Systems",
      skills: [
        "Design tokens & architecture",
        "Figma component libraries",
        "Storybook documentation",
        "AI-readable design docs",
        "Untitled UI & shadcn/ui",
        "Cross-functional handoff",
      ],
    },
    {
      name: "Tools & Front-End",
      skills: [
        "Figma & FigJam",
        "Claude Code & Google Antigravity",
        "React & TypeScript (working knowledge)",
        "Tailwind CSS & Next.js",
        "Git & GitHub",
        "Jira & Notion",
      ],
    },
  ] satisfies SkillCategory[],
};
