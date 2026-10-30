---
description: Scaffold a new case study MDX file, image folder and home page entry
---

# /new-case-study
1. Ask for: title, slug, role, platforms, timeline, visibility (public/private), one-paragraph summary.
2. Create /content/work/<slug>.mdx from /content/work/_case-study-template.mdx with validated frontmatter.
3. Create /public/work/<slug>/ and list the image files Rashi should add (cover, 5-8 screens).
4. Add the project to the home page "Selected work" order via frontmatter `order`.
5. Run pnpm lint and pnpm build. Report any `[YOUR INPUT]` placeholders left.
