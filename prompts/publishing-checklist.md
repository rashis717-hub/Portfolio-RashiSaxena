# Case Study Publishing & Quality Checklist

Run through this checklist before publishing or shipping any new or modified case study.

## 1. Confidentiality & Sanitisation
- [ ] **Data Redaction**: Sensitive client data, real user names, revenue numbers, and proprietary API keys in screenshot mockups are blurred or sanitized.
- [ ] **Client Authorization**: Confirm client names are approved for public display (or keep `redact: true` / `visibility: private`).
- [ ] **Passcode Gate**: If `visibility: private`, ensure `NEXT_PUBLIC_PRIVATE_GATE_HASH` is set and page has `noindex, nofollow`.

## 2. Accessibility & Standards
- [ ] **Alt Text**: Every image, diagram, and figure has descriptive alternative text.
- [ ] **Captions**: Every figure has a single-line editorial caption stating what to observe.
- [ ] **Headings**: Headings follow strict sequential hierarchy (`h1` title → `h2` section headlines → `h3` cards).
- [ ] **Contrast**: All text and badges satisfy 4.5:1 minimum contrast.
- [ ] **Touch Targets**: All interactive elements, buttons, and links maintain a 44x44px minimum tap area.

## 3. Placeholders & Evidence
- [ ] **No Placeholders**: All `[YOUR INPUT]` blocks have been filled with verified facts or removed.
- [ ] **Metric Verification**: Numbers align across frontmatter, narrative text, and home page stats strip.
- [ ] **Voice**: Plain, specific, first-person voice. Zero generic SaaS filler ("passionate", "seamless", "innovative").

## 4. Build & Production Validation
- [ ] **Validation Commands**:
  ```bash
  pnpm lint       # Must pass with 0 errors
  pnpm typecheck  # TypeScript types validate cleanly
  pnpm build      # Static export builds to /out with 0 errors
  ```
- [ ] **Open Graph Card**: Check `/work/<slug>/opengraph-image` static asset renders correctly.
- [ ] **Sitemap**: Verify public study appears in `/sitemap.xml` (or is properly excluded if private).
