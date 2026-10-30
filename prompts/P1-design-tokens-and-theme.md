# P1. Design tokens and theme

GOAL
Implement the design tokens, typography and light/dark theme.

CONTEXT
Follow .agents/rules/design-system.md exactly.

REQUIREMENTS
1. Define all CSS variables in globals.css for light and dark, mapped to Tailwind and shadcn tokens.
2. Load Geist and Geist Mono with next/font. Create utility classes: .text-display, .text-h2, .text-body, .label.
3. Theme: system default, with a manual toggle later. Use next-themes, no flash on load.
4. Create a hidden /styleguide route showing: colours, type scale, buttons, badges, cards, focus rings, both themes side by side.

INTERACTION
- Theme switch crossfades colours over 200ms (transition on background-color and color only).
- Focus ring: 2px accent outline with 2px offset, visible on keyboard focus only.

ACCEPTANCE CRITERIA
- /styleguide renders cleanly in both themes with no hard-coded colours.
- Contrast meets 4.5:1 for body text in both themes.

VERIFY
Use the browser agent to screenshot /styleguide in light and dark at 390 and 1280.
