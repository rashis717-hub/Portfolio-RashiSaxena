"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { withThemeTransition } from "@/lib/theme";

/** Switches between light and dark from whatever is showing now, with the theme crossfade. */
export function useToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  return () => withThemeTransition(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"));
}

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = useToggleTheme();
  // Icons switch through CSS, so the server render and the first client render match.
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark theme" className={className}>
      <Sun className="dark:hidden" aria-hidden />
      <Moon className="hidden dark:block" aria-hidden />
    </Button>
  );
}
