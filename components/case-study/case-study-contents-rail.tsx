"use client";

import React, { useEffect, useState } from "react";
import { ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface SectionItem {
  id: string;
  n: string;
  title: string;
}

const B2B_DEFAULT_SECTIONS: SectionItem[] = [
  { id: "section-01", n: "01", title: "Context & Business Problem" },
  { id: "section-02", n: "02", title: "Role & Constraints" },
  { id: "section-03", n: "03", title: "Research & Discovery" },
  { id: "section-04", n: "04", title: "Strategy & Information Architecture" },
  { id: "section-05", n: "05", title: "Final Solutions" },
  { id: "section-06", n: "06", title: "Validation & Testing" },
  { id: "section-07", n: "07", title: "Impact & Takeaways" },
];

export function CaseStudyContentsRail({
  defaultSections,
}: {
  defaultSections?: SectionItem[];
}) {
  const [sections, setSections] = useState<SectionItem[]>(defaultSections || B2B_DEFAULT_SECTIONS);
  const [activeId, setActiveId] = useState<string>("section-01");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Track scroll reading progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = window.scrollY;
      const pct = Math.min(100, Math.max(0, Math.round((scrolled / docHeight) * 100)));
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Discover sections from DOM if custom sections exist
  useEffect(() => {
    const sectionEls = document.querySelectorAll<HTMLElement>("section[data-section-id]");
    if (sectionEls.length > 0) {
      const items: SectionItem[] = Array.from(sectionEls).map((el) => ({
        id: el.id || el.getAttribute("data-section-id") || "",
        n: el.getAttribute("data-section-n") || "",
        title: el.getAttribute("data-section-title") || el.querySelector("h2")?.textContent || "",
      }));
      requestAnimationFrame(() => {
        setSections(items);
        if (items.length > 0) {
          setActiveId((prev) => prev || items[0].id);
        }
      });
    }
  }, []);

  // Scrollspy: update activeId as user scrolls
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 110; // offset for top + second bar
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Move focus to heading
    const heading = el.querySelector("h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }

    setSheetOpen(false);
  };

  if (sections.length === 0) return null;

  return (
    <>
      {/* Mobile (< 1024px): "Contents" button that opens a sheet */}
      <div className="lg:hidden sticky top-24 z-30 mb-8 border-b border-border bg-background/95 backdrop-blur-md py-2.5 px-4 flex items-center justify-between">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs uppercase tracking-wider flex items-center gap-2"
              aria-label="Open contents sheet"
            >
              <ListOrdered className="size-3.5 text-accent-strong" />
              <span>Contents</span>
              <span className="ml-1 text-[11px] text-muted-foreground font-medium">({progress}%)</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:w-[380px] p-6 flex flex-col gap-6">
            <SheetHeader className="border-b border-border pb-4">
              <SheetTitle className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                <span>Table of Contents</span>
                <span className="tabular-nums text-foreground">{progress}%</span>
              </SheetTitle>
              <div className="relative h-[2px] w-full bg-border overflow-hidden rounded-full mt-2">
                <div
                  className="absolute top-0 left-0 h-full bg-accent transition-[width] duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </SheetHeader>
            <nav aria-label="Mobile table of contents" className="flex flex-col gap-2 overflow-y-auto pr-2">
              {sections.map((sec) => {
                const isActive = sec.id === activeId;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-start gap-3 p-2.5 text-left text-xs font-mono transition-colors rounded-sm ${
                      isActive
                        ? "bg-accent/10 text-accent-strong font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="shrink-0 font-bold">{sec.n}</span>
                    <span className="font-sans text-sm truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {progress}% read
        </span>
      </div>

      {/* Desktop Sticky Rail (approx 26% width on right, with reading progress at top) */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto"
      >
        {/* Reading progress percentage and thin filling line at top of right rail */}
        <div className="flex flex-col gap-2 mb-8 pr-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
            <span>Contents</span>
            <span className="tabular-nums font-semibold text-foreground">{progress}%</span>
          </div>
          <div className="relative h-[2px] w-full bg-border overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-accent transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ol className="flex flex-col gap-6 pr-2">
          {sections.map((sec) => {
            const isActive = sec.id === activeId;
            return (
              <li key={sec.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`group flex items-start gap-3 text-left transition-colors text-sm ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-xs shrink-0 transition-colors ${
                      isActive ? "text-accent-strong font-bold" : "text-muted-foreground/70"
                    }`}
                  >
                    {sec.n}
                  </span>
                  <span className="leading-snug">{sec.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
