# P0. Scaffold

GOAL
Create the project scaffold for my portfolio.

CONTEXT
Read AGENTS.md and the files in .agents/rules first. Stack: Next.js App Router with TypeScript and static export, Tailwind, shadcn/ui, motion, MDX, zod, pnpm.

REQUIREMENTS
1. Initialise the project and configure static export.
2. Initialise shadcn/ui and add: button, badge, tabs, tooltip, dialog, sheet, command, hover-card, separator, progress, toggle-group, slider.
3. Install: motion, zod, lucide-react, @next/mdx (with remark-gfm), next-themes, clsx.
4. Folder structure:
   /app (routes), /components (site, case-study, ui), /content/work (MDX), /content/site.ts (profile, links, nav), /lib (utils, mdx, schema), /public/work/<slug>/ (images), /prompts (this pack).
5. Add scripts: dev, build, lint, typecheck.
6. Add a README with how to run, how to add a case study, how to deploy.

ACCEPTANCE CRITERIA
- pnpm dev serves a blank styled page. pnpm build succeeds.
- No placeholder boilerplate left from create-next-app.

DO NOT
- Build any page UI yet.

VERIFY
Run pnpm lint, pnpm typecheck, pnpm build and paste results in the Walkthrough.
