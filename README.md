# Rashi Saxena — Portfolio

Portfolio site for a UX Lead specialising in enterprise and agentic AI product design.
Built with Next.js (App Router, static export), Tailwind CSS, shadcn/ui, motion and MDX.

Project rules for people and AI agents live in [AGENTS.md](AGENTS.md) and [.agents/rules](.agents/rules).

## Run locally

Requires Node.js 20+ and pnpm. If pnpm is missing, run `corepack enable pnpm` once.

```bash
pnpm install
pnpm dev         # http://localhost:3000
```

| Script           | What it does                                  |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Development server with hot reload            |
| `pnpm build`     | Static export to `/out`                       |
| `pnpm lint`      | ESLint                                        |
| `pnpm typecheck` | TypeScript, no output                         |

## Project structure

```
app/                 Routes
components/
  site/              Header, footer, navigation and other shell pieces
  case-study/        Components used inside case-study MDX
  ui/                shadcn/ui primitives (restyled to the design tokens)
content/
  site.ts            Name, links, navigation, footer text
  work/              One MDX file per case study
lib/                 Utilities, MDX loading, frontmatter schema
public/work/<slug>/  Images for each case study
prompts/             The prompt pack used to build this site
```

## Add a case study

1. Copy `content/work/_template.mdx` to `content/work/<slug>.mdx`.
2. Fill in the frontmatter. It is validated at build time; an invalid field fails the build and names the field.
3. Put images in `public/work/<slug>/` (a cover plus 5 to 8 screens). Every image needs alt text and a caption.
4. Set `order` in the frontmatter to place it in the home page "Selected work" list.
5. Run `pnpm lint` and `pnpm build`.

No component changes are needed. In Antigravity, the `/new-case-study` workflow walks through these steps.

## Private case studies

Case studies can be marked `visibility: private` in their MDX frontmatter. Private studies are protected by a client-side gate component asking for a passcode.

> [!IMPORTANT]
> **A client-side gate is a courtesy lock, not security.** The page HTML is exported as static content. For genuinely confidential work, use hosting-level protection (such as Vercel password protection, Cloudflare Access rules, or HTTP Basic Auth) or do not publish it.

To set up the passcode for private case studies:
1. Hash your chosen passcode with SHA-256:
   ```bash
   echo -n "your-passcode" | shasum -a 256
   ```
2. Set the environment variable in `.env.local` (and in your hosting provider's dashboard):
   ```bash
   NEXT_PUBLIC_PRIVATE_GATE_HASH="<resulting-sha256-hex-hash>"
   ```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_PRIVATE_GATE_HASH` | Optional | SHA-256 hash of the passcode for private case studies. Generate with `echo -n "pass" \| shasum -a 256`. |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Optional | Domain for privacy-friendly analytics (e.g. `rashisaxena.com`). Disabled if omitted. |
| `NEXT_PUBLIC_ANALYTICS_SRC` | Optional | Custom script URL for analytics (defaults to `https://plausible.io/js/script.js`). |

## Deploy

`pnpm build` writes a fully static site to `/out`. Any static host works:

- **Vercel / Netlify / Cloudflare Pages:** connect the repository, build command `pnpm build`, output directory `out`.
- **Anywhere else:** upload the contents of `/out`.

To preview the production build locally:

```bash
pnpm build
pnpm dlx serve out
```

Static export has no server, so cookies, rewrites, redirects and API routes are not available.

### Deployment Checklist

- [ ] **1. Connect repository:** Push to GitHub and link to Vercel, Netlify, or Cloudflare Pages.
- [ ] **2. Configure environment variables:**
  - Set `NEXT_PUBLIC_PRIVATE_GATE_HASH` if hosting private case studies.
  - Set `NEXT_PUBLIC_ANALYTICS_DOMAIN` if using analytics.
- [ ] **3. Add custom domain:**
  - Map `rashisaxena.com` and `www.rashisaxena.com` in DNS.
  - Verify ALIAS/CNAME records resolve to host.
- [ ] **4. Enable HTTPS & HSTS:**
  - Confirm SSL certificate is active (automatic on Vercel/Netlify/Cloudflare).
- [ ] **5. Verify sitemap & robots:**
  - Check `https://rashisaxena.com/sitemap.xml` includes all public case studies and excludes private ones.
  - Check `https://rashisaxena.com/robots.txt` resolves and references sitemap.
- [ ] **6. Verify Open Graph cards:**
  - Test `https://rashisaxena.com/` and `https://rashisaxena.com/work/a2ui` in [OpenGraph.xyz](https://www.opengraph.xyz/) or Twitter Card Validator.
  - Confirm dynamically generated 1200x630 preview images render.


