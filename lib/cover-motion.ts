// Projects whose home-page cover has a motion layer (components/site/cover-motion.tsx).
export const coverMotionSlugs = ["infrabot", "a2ui", "agent-registry", "salespulze", "sales-ai"] as const;

export const hasCoverMotion = (slug: string) => (coverMotionSlugs as readonly string[]).includes(slug);
