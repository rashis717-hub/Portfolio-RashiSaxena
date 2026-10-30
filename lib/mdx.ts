import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { MDXContent } from "mdx/types";
import { z } from "zod";
import { projectSchema, type ProjectFrontmatter } from "./schema";
import { PLACEHOLDER } from "./placeholder";

const WORK_DIR = path.join(process.cwd(), "content", "work");

export type Project = ProjectFrontmatter & { Content: MDXContent };

// Every <slug>.mdx in /content/work. Files starting with "_" (the template) are skipped.
function workSlugs() {
  return fs
    .readdirSync(WORK_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.slice(0, -".mdx".length));
}

// The build warns once per file about [YOUR INPUT] placeholders left in a case study.
const warned = new Set<string>();
function warnPlaceholders(slug: string) {
  if (process.env.NODE_ENV !== "production" || warned.has(slug)) return;
  warned.add(slug);
  const source = fs.readFileSync(path.join(WORK_DIR, `${slug}.mdx`), "utf8");
  const found = source.match(new RegExp(PLACEHOLDER.source, "g"));
  if (found) {
    console.warn(
      `⚠ content/work/${slug}.mdx has ${found.length} [YOUR INPUT] placeholder(s); they are hidden in production:\n` +
        [...new Set(found)].slice(0, 5).map((p) => `    ${p}`).join("\n") +
        (new Set(found).size > 5 ? `\n    …and ${new Set(found).size - 5} more` : ""),
    );
  }
}

function warnVideoFileSize(slug: string) {
  if (warned.has(`${slug}:video`)) return;
  warned.add(`${slug}:video`);
  const source = fs.readFileSync(path.join(WORK_DIR, `${slug}.mdx`), "utf8");
  const videoMatches = source.matchAll(/["'](\/[^"']+\.(?:mp4|webm))["']/g);
  for (const match of videoMatches) {
    const videoPath = match[1];
    if (videoPath.includes("/full/")) continue;
    const absPath = path.join(process.cwd(), "public", videoPath);
    if (fs.existsSync(absPath)) {
      const stats = fs.statSync(absPath);
      const sizeMb = stats.size / (1024 * 1024);
      if (sizeMb > 10) {
        console.warn(
          `⚠ [Video Size Warning] In content/work/${slug}.mdx, "${videoPath}" is ${sizeMb.toFixed(1)} MB (> 10 MB limit for non-full videos).`,
        );
      }
    }
  }
}

async function loadProject(slug: string): Promise<Project> {
  const mod = await import(`@/content/work/${slug}.mdx`);
  const result = projectSchema.safeParse(mod.frontmatter);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in content/work/${slug}.mdx\n${z.prettifyError(result.error)}`);
  }
  if (result.data.slug !== slug) {
    throw new Error(
      `Invalid frontmatter in content/work/${slug}.mdx\n✖ slug "${result.data.slug}" must match the file name "${slug}"\n  → at slug`,
    );
  }
  warnPlaceholders(slug);
  warnVideoFileSize(slug);
  return { ...result.data, Content: mod.default };
}

/** All case studies, validated, sorted by `order` (then title). Invalid frontmatter fails the build. */
export const getAllProjects = cache(async (): Promise<Project[]> => {
  const projects = await Promise.all(workSlugs().map(loadProject));
  return projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
});

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getAllProjects()).find((project) => project.slug === slug);
}

/** The project after `slug` in order, wrapping to the first. Undefined when there is only one. */
export async function getNextProject(slug: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}
