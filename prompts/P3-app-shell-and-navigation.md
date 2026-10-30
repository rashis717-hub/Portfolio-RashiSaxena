# P3. App shell and navigation

GOAL
Build the global shell: header, footer, theme toggle, command menu, page transitions.

REQUIREMENTS
1. Header: wordmark "Rashi Saxena" (left), links Work, About, Resume (right), theme toggle, and a "⌘K" hint button on desktop.
2. Mobile: hamburger opens a shadcn Sheet from the right with large links.
3. Command menu (shadcn Command, opens on ⌘K or Ctrl+K and from the header button): lists Projects, Pages, Theme toggle, Copy email, Open LinkedIn, Open resume.
4. Footer: contact line, LinkedIn, resume, small "Back to top".
5. Skip-to-content link as the first focusable element.

INTERACTION
- Header: transparent at top; after 24px scroll it gains a hairline border and a blurred background. Hides on scroll down, returns on scroll up (200ms).
- Nav link hover: underline draws left to right in 180ms. Active page link stays underlined.
- Command menu: opens with a 160ms scale from 0.98 plus fade; arrow keys move; Enter runs; Esc closes and returns focus to the trigger.
- Page transition: content fades and rises 12px over 350ms; skipped under reduced motion.
- Scroll restoration on navigation; focus moves to the page h1 after route change.

ACCEPTANCE CRITERIA
- Fully keyboard operable. Works at 390 and 1536 widths. No layout shift when the header changes state.
