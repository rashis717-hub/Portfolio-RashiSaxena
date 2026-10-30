---
target: P4 home hero
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/rashisaxena/Desktop/My Portfolio/components/site/hero.tsx"
target_fingerprint: "sha256:5a43ff993e7da4e86a3e814c3ba59a67f170cc8d417ae76410da292544378651"
target_path: /Users/rashisaxena/Desktop/My Portfolio/components/site/hero.tsx
timestamp: 2026-10-30T12-04-57Z
slug: components-site-hero-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector + browser sub-agent)
Target: home hero (P4).

## Design Health Score: 23/32 (Good). Heuristics 7 and 10 n/a (single-statement Experience surface).
1 Status 3 · 2 Real world 3 · 3 Control 3 · 4 Consistency 3 · 5 Error prevention 3 · 6 Recognition 2 (one of three phrases visible at a time) · 8 Minimalist 3 · 9 Error recovery 3

## Design specificity
Built precisely on DESIGN.md but visually generic (Geist, mono label, dot grid, pill CTA, rotating subline); identity rests on the copy. Accent unused in the hero.
Detector: 0 real findings. oversized-h1, hero-eyebrow-chip / kicker-above-heading and overused-font are false positives mandated by DESIGN.md and the approved brief. No overflow, no console errors at 390/768/1280/1536.
Browser checks: LCP 72ms (390px, 4x CPU), CLS 0, rotation 3s with reserved width, pause on hover/focus/control, reduced motion static.

## Priority issues (no P0/P1)
- [P2] Rotating line shows one of three phrases at a time and two of them restate the headline; first swap interrupts reading. Options: one pass then rest on the static line, static by default, or delay the first swap.
- [P2] Pause control looks like a static mono label; it is the first Tab stop in the hero, before View work.
- [P2] No product-specific visual moment; the single accent is spent nowhere in the hero.
- [P3] Headline reveal uneven: words 6-12 share one stagger step. Spread steps evenly.
- [P3] Scroll cue sits far right away from the reading column; on mobile about 200px of empty band above the label.

## Persona red flags
Hiring manager skimming: sees only "Agent experience." in the glance window; no seniority/scale signal (needs Rashi's input); View work dead until P5.
Screen reader: first hero Tab stop is Pause; verify VoiceOver reads the word-span h1 as one heading.
Mobile: headline sits low; PAUSE is the only way to stop rotation on touch.
First-time recruiter: "Platform UX", "Agent experience" are insider terms; PAUSE reads as a tag.

## Minor
Hover pause has no visible state; CTA small next to the 89px headline (per spec); hero min-height hard-codes the 4rem header; do not deploy P4 without P5.
