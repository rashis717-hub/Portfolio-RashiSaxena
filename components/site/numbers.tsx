"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { stats as defaultStats, type StatItem } from "@/content/site";

export type ResolvedStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  detail: readonly string[];
  isFallback?: boolean;
};

// Warning tracker to ensure build/runtime log fires cleanly
const warned = new Set<string>();

export function resolveStats(rawStats: readonly StatItem[]): ResolvedStat[] {
  const resolved: ResolvedStat[] = [];
  for (const stat of rawStats) {
    if (stat.value !== null) {
      resolved.push({
        id: stat.id,
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
        detail: stat.detail,
      });
    } else if (stat.fallback) {
      if (!warned.has(stat.id)) {
        console.warn(`stats.${stat.id} has no value; showing fallback`);
        warned.add(stat.id);
      }
      resolved.push({
        id: stat.id,
        value: stat.fallback.value,
        suffix: stat.fallback.suffix,
        label: stat.fallback.label,
        detail: stat.detail,
        isFallback: true,
      });
    } else {
      if (!warned.has(stat.id)) {
        console.warn(`stats.${stat.id} has no value and no fallback; omitting in production`);
        warned.add(stat.id);
      }
      if (process.env.NODE_ENV !== "production") {
        resolved.push({
          id: stat.id,
          value: 0,
          suffix: stat.suffix,
          label: `${stat.label} [YOUR INPUT]`,
          detail: stat.detail,
        });
      }
    }
  }
  return resolved;
}

import { countUp } from "@/lib/motion";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const digits = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = digits.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = String(value);
      return;
    }

    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = "0";
    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        cleanup = countUp(value, (curr) => {
          if (el) el.textContent = String(curr);
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cleanup?.();
      if (el) el.textContent = String(value);
    };
  }, [value]);

  return (
    <>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span
        aria-hidden
        className="inline-block text-left tabular-nums transition-opacity duration-150 motion-reduce:transition-none"
        style={{ minWidth: `${String(value).length}ch` }}
      >
        <span ref={digits}>{value}</span>
        {suffix}
      </span>
    </>
  );
}

function StatCard({ stat }: { stat: ResolvedStat }) {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => setOpen(true), 120);
    }
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => setOpen(false), 160);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className="group relative flex flex-col justify-between"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex w-full flex-col-reverse items-start gap-4 rounded-md text-left transition-colors duration-(--duration-hover) outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            aria-label={`${stat.value}${stat.suffix} ${stat.label}. Select to view details.`}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
              }
            }}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <span className="label text-muted-foreground transition-colors group-hover:text-foreground">
                {stat.label}
              </span>
              <span className="label text-[10px] text-muted-foreground/60 transition-opacity group-hover:text-accent-strong">
                Details ↗
              </span>
            </div>
            <div className="text-display font-medium tracking-tight text-foreground">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-72 max-w-[calc(100vw-2rem)] border-border bg-popover p-4 shadow-sm"
          onPointerEnter={() => {
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
          }}
          onPointerLeave={onPointerLeave}
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <p className="label text-muted-foreground">{stat.label}</p>
              {stat.isFallback && (
                <span className="label text-[10px] text-accent-strong">Fallback</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {stat.detail.map((item, idx) => (
                <Badge key={idx} variant="chip" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}

export function Numbers({ items }: { items?: readonly StatItem[] }) {
  const resolved = resolveStats(items ?? defaultStats);

  return (
    <section aria-labelledby="numbers-title" className="border-y border-border">
      <div className="container-site py-section">
        <h2 id="numbers-title" className="sr-only">
          Portfolio numbers and reach
        </h2>
        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-y-0 md:divide-x md:divide-border">
          {resolved.map((stat, idx) => (
            <div
              key={stat.id}
              className={`py-8 md:py-0 ${
                idx === 0
                  ? "md:pr-8 lg:pr-12"
                  : idx === 1
                  ? "md:px-8 lg:px-12"
                  : "md:pl-8 lg:pl-12"
              }`}
            >
              <StatCard stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
