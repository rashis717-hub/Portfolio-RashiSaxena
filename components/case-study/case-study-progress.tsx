"use client";

import React from "react";

/**
 * Optional fixed vertical status badge on the left edge (like the Jithin RP award ribbon).
 * Reading progress is now hosted directly at the top of the sticky contents rail (C09 spec).
 */
export function CaseStudyProgress({ status }: { status?: string }) {
  if (!status) return null;

  return (
    <aside
      aria-label="Project status"
      className="fixed left-0 top-1/2 z-40 -translate-y-1/2 hidden lg:flex items-center"
    >
      <div className="bg-foreground text-background font-mono text-[10px] uppercase tracking-widest py-3 px-2 [writing-mode:vertical-rl] rotate-180 border-r border-border rounded-r-xs shadow-xs select-none hover:bg-accent hover:text-white transition-colors">
        {status}
      </div>
    </aside>
  );
}
