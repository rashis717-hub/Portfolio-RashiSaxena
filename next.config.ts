import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Static HTML export to /out. No server features (cookies, rewrites, ISR).
  output: "export",
  // The default image loader needs a server; images are served as-is.
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack needs plugins referenced by name, not imported.
    // remark-frontmatter + remark-mdx-frontmatter turn YAML frontmatter into `export const frontmatter`.
    remarkPlugins: ["remark-gfm", "remark-frontmatter", "remark-mdx-frontmatter"],
  },
});

export default withMDX(nextConfig);
