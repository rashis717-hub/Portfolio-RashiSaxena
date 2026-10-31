---
name: Quiet Precision
colors:
  background: "#FAFAF9"
  foreground: "#0C0D12"
  muted: "#F2F2EF"
  muted-foreground: "#53555B"
  border: "#0C0D121A"
  accent: "#FF2E88"
  accent-strong: "#D6005F"
  on-accent-strong: "#FFFFFF"
colors-dark:
  background: "#090A0E"
  foreground: "#F6F5F3"
  muted: "#15161A"
  muted-foreground: "#96989F"
  border: "#FFFFFF17"
  accent: "#FF4D94"
  accent-strong: "#FF4D94"
  on-accent-strong: "#090A0E"
typography:
  display:
    fontFamily: "Geist"
    fontSize: 96px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.04em
  h2:
    fontFamily: "Geist"
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.03em
  h3:
    fontFamily: "Geist"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.02em
  body:
    fontFamily: "Geist"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.08em
rounded:
  sm: 8px
  md: 12px
  pill: 999px
spacing:
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 160]
  container: 1200px
  section-mobile: 96px
  section-desktop: 160px
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.on-accent-strong}"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  link:
    textColor: "{colors.accent-strong}"
---

## Overview

Quiet Precision is a calm, editorial, precise look for a UX Lead's portfolio in enterprise and agentic AI. The work leads; the interface stays out of the way. A visitor should know who this is within ten seconds and be able to read one case study deeply without distraction.

Layout: a 1200px container on a 12-column grid, one idea per screen, generous whitespace. Section spacing is 96px on mobile and 160px on desktop. Text is capped at about 68 characters per line.

Motion: small and purposeful. Movement of 6 to 16px, 150 to 600ms, using transform and opacity only. Entrances use cubic-bezier(0.22, 1, 0.36, 1). Every animation has a reduced-motion version. Hover reveals extra detail, never essential content.

Voice: plain, specific, first person. No filler words.

## Colors

Near-black and warm off-white, plus one accent. Light and dark themes share the same roles.

- **background / foreground:** the page and its text. Contrast is above 15:1.
- **muted / muted-foreground:** secondary surfaces and secondary text. Secondary text is above 6.8:1 in both themes.
- **border:** a hairline, 10% foreground in light and 9% white in dark, always 1px.
- **accent:** the stark hot pink. Decorative and large elements only: dots, progress bars, focus rings, large icons. In light theme it reaches 3.35:1, enough for non-text and large elements but not for small text.
- **accent-strong:** the deeper pink (5.0:1 on the light background) for links, small accent text and filled hover states with white text. In dark theme it equals the accent.

One accent hue only, and it is used rarely. Never introduce a second accent. The one exception is **cover-a2ui** (#2F5BFF), the blue of the large "A2UI" lettering on the A2UI project cover; it is a project colour, used on that cover only and nowhere in the interface. Never use the accent for errors or warnings. Never hard-code a colour value in a component; use tokens.

## Typography

Geist for all text, Geist Mono for small uppercase labels.

- **display:** the home headline. Fluid from 44px on mobile up to 96px on desktop, tight tracking.
- **h2:** section headlines in case studies. Each headline states a point rather than naming a topic.
- **h3:** card and subsection titles.
- **body:** 17px with a generous 1.65 line height, never wider than 68ch.
- **label:** Geist Mono, uppercase, tracked, muted. Used for section numbers ("01 / The Challenge"), metadata and captions.

## Elevation

Flat by default. Surfaces are separated by 1px hairline borders, not shadows. The only blur is the header after scroll (background blur with a hairline bottom border). Radius: 8px for small controls, 12px for cards and images, fully round for buttons, chips and the cursor label.

## Components

- **Primary button:** foreground fill, background-coloured text, pill shape. On hover it shifts to accent-strong with white text (dark text in dark theme) and the arrow nudges 4px.
- **Secondary button:** outlined with a hairline border; hover draws an underline left to right.
- **Card:** background fill, 12px radius, 1px hairline border, 24px padding. Hover lifts 2px and brightens the border.
- **Chip:** muted fill, muted-foreground text, pill shape, used for tags.
- **Link:** accent-strong text with an underline that draws on hover.
- **Focus ring:** 2px accent outline with a 2px offset, visible on keyboard focus only.
- **Case study section header:** a Geist Mono label ("01 / The Challenge") above an h2 headline that states a point.
- **Stakeholder card:** team name, then "What I heard" and "How it shaped the design" as two short blocks.
- **Metric:** very large number in display weight with a small mono label beneath.

## Do's and Don'ts

- Do use tokens for every colour, size, radius and duration.
- Do keep the accent rare, so it means something when it appears.
- Do give every image alt text and a one-line caption that says what to notice.
- Do respect reduced motion and keep hover effects optional.
- Don't use accent for small body text on the light theme; use accent-strong.
- Don't add shadows, gradients for decoration, stock illustrations or emoji.
- Don't animate layout properties.
- Don't show a photograph; the identity is typographic.
- Don't invent numbers, quotes or client names.
- Don't use pink for error or warning states; use foreground text, an icon and a short sentence.
- Don't use bright pink for small text on the light theme; use accent-strong.
