---
trigger: model_decision
description: When editing content or MDX
---

# Content rules

- Voice: plain, specific, first person ("I led", "I defined"). No filler such as "passionate" or "innovative".
- Every case study headline states a point, not a label ("Governance that scales, not a permissions grid", not "Research").
- Every image has alt text and a one-line caption that says what to notice.
- Numbers only if supplied by Rashi. If missing, render `[YOUR INPUT: metric]` in dev and hide in production build (build must warn).
- Client names and screenshots: check frontmatter `visibility` and `redact` fields before showing.
- Every case study follows the B2B structure in /content/work/_case-study-template.mdx: header with project details, three metrics and a hero video; then sections 01 to 07 in that order. Each section needs real text: the problem solved, the user flows, the decisions and the reasoning, not images alone. Images are unboxed and captioned above. Never invent research, testing or metrics; use a [YOUR INPUT] placeholder.
