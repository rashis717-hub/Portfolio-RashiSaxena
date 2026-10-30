"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { withThemeTransition } from "@/lib/theme";

const subscribe = () => () => {};

export function ThemeControls() {
  const { theme, setTheme } = useTheme();
  // The stored theme is unknown on the server; render no selection until hydrated.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      aria-label="Page theme"
      value={mounted ? (theme ?? "") : ""}
      onValueChange={(value) => value && withThemeTransition(() => setTheme(value))}
    >
      <ToggleGroupItem value="system" className="px-3">System</ToggleGroupItem>
      <ToggleGroupItem value="light" className="px-3">Light</ToggleGroupItem>
      <ToggleGroupItem value="dark" className="px-3">Dark</ToggleGroupItem>
    </ToggleGroup>
  );
}
