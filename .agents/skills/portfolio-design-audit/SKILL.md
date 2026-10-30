---
name: portfolio-design-audit
description: Token compliance check against /DESIGN.md (hard-coded values, globals.css versus DESIGN.md, text under 4.5:1). Use after building or changing any page or component. Broader design and accessibility review belongs to /impeccable critique and /impeccable audit.
---
# Portfolio design audit (token compliance only)
1. Compare app/globals.css with /DESIGN.md: every colour in light and dark, type size, radius and spacing value. List any mismatch beyond rounding, and any token present in one file but not the other.
2. List any hard-coded colour, font size, radius or duration in components that is not a token.
3. Flag any text that fails 4.5:1 contrast against its background in either theme. The "Text contrast" list on /styleguide measures the rendered values.
4. Output: pass/fail table plus exact file and line to fix. Do not fix silently.
