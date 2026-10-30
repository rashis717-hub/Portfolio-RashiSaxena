import { z } from "zod";

// Frontmatter for /content/work/<slug>.mdx. Strict: an unknown or misspelt key fails the build.
export const metricSchema = z.strictObject({
  value: z.string().min(1),
  suffix: z.string().optional(),
  label: z.string().min(1),
});

export const projectSchema = z.strictObject({
  title: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use lowercase words separated by hyphens, e.g. agent-console"),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  role: z.string().min(1),
  platforms: z.array(z.string().min(1)).min(1),
  timeline: z.string().min(1),
  year: z.number().int().min(1990).max(2100),
  cover: z.string().startsWith("/", "must be a path from /public, e.g. /work/<slug>/cover.jpg"),
  order: z.number(),
  visibility: z.enum(["public", "private"]),
  redact: z.boolean(),
  tags: z.array(z.string().min(1)),
  metrics: z.array(metricSchema),
  company: z.string().optional(),
  team: z.string().optional(),
  deliverables: z.array(z.string().min(1)).optional(),
  status: z.string().optional(),
  video: z.string().startsWith("/", "must be a path from /public").optional(),
  poster: z.string().startsWith("/", "must be a path from /public").optional(),
  videoCredit: z.string().optional(),
  /** Themed hero diagram base path; renders <base>.light.png and <base>.dark.png in place of a video. */
  heroDiagram: z.string().startsWith("/", "must be a path from /public").optional(),
  heroDiagramAlt: z.string().optional(),
  /** Optional full product logo shown in place of the text title (light theme / dark theme). */
  logo: z.string().optional(),
  logoDark: z.string().optional(),
  platformType: z.string().optional(),
  links: z
    .strictObject({
      live: z.url().optional(),
      figma: z.url().optional(),
      video: z.url().optional(),
    })
    .optional(),
});

export type Metric = z.infer<typeof metricSchema>;
export type ProjectFrontmatter = z.infer<typeof projectSchema>;
