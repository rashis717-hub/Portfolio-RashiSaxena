"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { focusHash } from "@/lib/focus";

// After a client-side navigation, moves focus to the URL's #target if there is one, otherwise to
// the new page's h1 (or <main>), so screen reader and keyboard users start at the new content.
// Skips the initial page load.
export function RouteFocus() {
  const pathname = usePathname();
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    if (location.hash && focusHash(location.hash)) return;
    const target = document.querySelector<HTMLElement>("main h1") ?? document.getElementById("main");
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
