"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { focusHash } from "@/lib/focus";
import { cn } from "@/lib/utils";

/** Smooth-scrolls to the selected work (instantly under reduced motion) and moves focus there. */
export function ViewWorkButton({ label }: { label: string }) {
  return (
    <Button asChild>
      <a
        href="#work"
        onClick={(event) => {
          const target = document.getElementById("work");
          if (!target) return;
          event.preventDefault();
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          history.replaceState(null, "", "#work");
          focusHash("#work");
        }}
      >
        {label}
        <ArrowRight data-icon="inline-end" aria-hidden />
      </a>
    </Button>
  );
}

/** A short vertical line that fades out once the visitor has scrolled 40px. */
export function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY <= 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      aria-hidden
      className={cn("block h-8 w-px bg-muted-foreground transition-opacity duration-300 ease-out", !visible && "opacity-0")}
    />
  );
}
