"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * Editorial Hero inspired by jithinrp.com:
 * - Top: High-impact lede statement
 * - Right: Metadata strip with accent '+' dividers
 * - Bottom: Full-width name rendered in Geist Pixel in signature pixel pink (#FF2E88)
 *   with interactive letter-by-letter melting hover interaction.
 */
export function Hero({ resume }: { resume?: string }) {
  const { headline, location } = site.hero;
  const name = site.name.toUpperCase();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex flex-col justify-between pt-16 md:pt-24 pb-10 md:pb-16 border-b border-border"
    >
      <div className="container-site flex flex-col">
        {/* Top: Lede Headline (large, calm, editorial) */}
        <div className="max-w-3xl">
          <p className="label mb-4 text-accent-strong tracking-widest">
            01 / Lead Statement
          </p>
          <h1
            id="hero-title"
            className="text-h2 md:text-[36px] font-normal leading-[1.3] tracking-tight text-foreground text-balance"
          >
            {headline}
          </h1>
        </div>

        {/* Middle: Meta row + Action pills */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <ul
            className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground"
            aria-label="At a glance"
          >
            <li>UX Lead, Enterprise AI</li>
            <li className="text-accent font-bold select-none text-sm" aria-hidden="true">+</li>
            <li>7+ AI Products</li>
            <li className="text-accent font-bold select-none text-sm" aria-hidden="true">+</li>
            <li>{location}</li>
          </ul>

          {/* Quick Actions (LinkedIn + Resume) */}
          <div className="flex items-center gap-3 shrink-0">
            <Button asChild variant="default" size="default" className="rounded-full shadow-xs">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            {resume && (
              <Button asChild variant="outline" size="default" className="rounded-full">
                <a href={resume} target="_blank" rel="noopener">
                  <span>Resume</span>
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Bottom: Full-Width Giant Pixel Name in signature Pixel Pink */}
        <div className="mt-6 sm:mt-8 md:mt-10 overflow-hidden w-full select-none">
          <p
            className="hero-pixel-name"
            aria-label={site.name}
          >
            {name.split("").map((char, i) => (
              <span
                key={i}
                className={`hero-pixel-char${char === " " ? " w-[0.45em]" : ""}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
