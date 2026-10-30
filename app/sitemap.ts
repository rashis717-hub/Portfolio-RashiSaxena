import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllProjects } from "@/lib/mdx";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  // Filter out private case studies from the sitemap (P10 requirement)
  const publicProjects = projects.filter(
    (project) => project.visibility !== "private"
  );

  const workUrls: MetadataRoute.Sitemap = publicProjects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${site.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...workUrls,
  ];
}
