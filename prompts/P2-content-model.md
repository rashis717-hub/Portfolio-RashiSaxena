# P2. Content model

GOAL
Create the typed content system so I can add case studies by writing MDX only.

REQUIREMENTS
1. /lib/schema.ts with zod schema for case study frontmatter:
   title, slug, tagline, summary, role, platforms (string[]), timeline, year, cover (path), order (number),
   visibility ("public" | "private"), redact (boolean), tags (string[]),
   metrics (array of { value: string, suffix?: string, label: string }), links (optional: live, figma, video).
2. /lib/mdx.ts to load all MDX from /content/work, validate frontmatter, sort by order, and expose getAllProjects(), getProject(slug), getNextProject(slug).
3. /content/site.ts: name, role line, one-line positioning, email [YOUR INPUT], linkedin, resume path, nav items, footer text.
4. /content/work/_template.mdx: a complete case study using every MDX component (components are built in P7, so use stubs now).
5. Build must FAIL with a clear message if frontmatter is invalid.

ACCEPTANCE CRITERIA
- Adding a valid MDX file makes it appear in getAllProjects(). An invalid one fails the build with the field name.

DO NOT
- Hard-code any project data inside components.
