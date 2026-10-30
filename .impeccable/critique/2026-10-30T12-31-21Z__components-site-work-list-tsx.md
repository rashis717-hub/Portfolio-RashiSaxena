---
target: P5 home sections
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/rashisaxena/Desktop/My Portfolio/components/site/work-list.tsx"
target_fingerprint: "sha256:9b512438d67baa773def503ec27ba045dc49d6f76ad5e8cd8f8a453007146562"
target_path: /Users/rashisaxena/Desktop/My Portfolio/components/site/work-list.tsx
timestamp: 2026-10-30T12-31-21Z
slug: components-site-work-list-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector + browser sub-agent). Assessed with four temporary fixture case studies (removed afterwards).
Target: home sections below the hero (P5): selected work, numbers, how I work, contact.

## Design Health Score: 24/32 (Good). Heuristics 7 and 10 n/a.
1 Status 3 · 2 Real world 3 · 3 Control 3 · 4 Consistency 3 · 5 Error prevention 3 · 6 Recognition 3 · 8 Minimalist 3 · 9 Error recovery 3

## Design specificity
On-system (one accent, hairlines, Geist, flat). The cursor-following cover list is a common creative-portfolio pattern; rows identify projects but do not argue for opening one. No DESIGN.md conflicts.
Detector: 0 findings in P5 sections; hero flags are approved patterns (false positives). No overflow, no console errors at 390-1536. Dimmed chips measured 2.97:1 in light at 65% (fixed: now 70%).

## Priority issues
- [P1, fixed] Contact section was a dead end in production (no email/LinkedIn supplied). Now renders only when at least one channel exists.
- [P1, fixed] Reduced-motion mouse users lost the cursor over rows (cursor hidden, no View label). Cursor now hidden only while the View label follows.
- [P1-adjacent, fixed] Dimmed tag chips 2.97:1 in light; dim raised from 65% to 70%.
- [P2] Cursor preview clips at the right/top/bottom edges; keyboard-anchored preview drifts on scroll.
- [P2] Numbers lack context (CAMS, Agent Registry, "2 customers"), do not link to case studies; count-up to 2 reads as a glitch.
- [P3] Focused row shows two pink lines (focus ring + hairline); ring square-cornered.

## Persona red flags
Hiring manager: rows give no role/scale/outcome to choose between; evidence sits in a separate strip. Mobile: tags hidden below md, tall numbers stack. Stress tester: edge clipping; redacted row shows View label without preview.

## Minor
Numbers strip heading sr-only only; repeated year column; gap between tagline and tags at 1280; three display-size moments compete; cover swap may flash (preload); confirm private covers are fine to show as touch thumbnails.
