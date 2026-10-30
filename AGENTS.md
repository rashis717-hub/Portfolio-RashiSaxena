# Portfolio: Rashi Saxena

## Identity
A custom portfolio for a UX Lead specialising in enterprise and agentic AI product design.
Audience: hiring managers, design and product leads, recruiters. Visitors skim first, then read one case study deeply.

## Stack (do not change without asking)
- Next.js (App Router, TypeScript, static export), React
- Tailwind CSS (latest stable), shadcn/ui components copied into /components/ui
- motion (import from "motion/react") for animation
- MDX for case studies, with frontmatter validated by zod
- next/font for Geist and Geist Mono
- lucide-react for icons
- Package manager: pnpm

## Principles
1. Content lives in /content (MDX and TS), never hard-coded inside components.
2. Adding a new case study must require only a new MDX file plus images.
3. Never invent facts, metrics, client names or quotes. Use `[YOUR INPUT]` placeholders.
4. Accessible by default: semantic HTML, visible focus, 4.5:1 contrast, keyboard operable, `prefers-reduced-motion` respected.
5. Fast by default: next/image, no layout shift, no unused dependencies, Lighthouse mobile 90+.
6. One accent colour. Hairline borders. Generous whitespace. No gradients-for-decoration, no stock illustrations, no emoji in UI.
7. Design source of truth is /DESIGN.md.

## Working rules
- Work on ONE task at a time and stop when its acceptance criteria are met.
- Before finishing a task: run `pnpm lint` and `pnpm build`; fix all errors.
- Verify UI with the browser agent at widths 390, 768, 1280 and 1536; attach screenshots to the Walkthrough.
- Do not install a new dependency without stating why and what it replaces.
- Corrections arrive as separate Correction Prompts. Apply them without rewriting earlier work.
- Design workflow: Shape (/impeccable shape) -> Build -> Critique and Audit (/impeccable critique, /impeccable audit) -> Fix -> Polish (/impeccable polish). DESIGN.md is the source of truth; see .agents/rules/impeccable.md.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
