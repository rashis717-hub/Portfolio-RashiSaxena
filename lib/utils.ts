import { createCn } from "cn/config"

// The DESIGN.md type scale adds text-display, text-h2, text-h3 and text-body (globals.css).
// Registering them as font sizes stops cn from treating them as colours and dropping them when a
// text colour such as text-muted-foreground is passed in the same call.
export const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: ["display", "h2", "h3", "body"] }] } },
})
