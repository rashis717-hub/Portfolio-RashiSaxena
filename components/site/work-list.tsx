"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type WorkRow = {
  n: string;
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  year: number;
  private: boolean;
  /** Present only when the file exists and the project is not redacted. */
  cover?: string;
  coverHover?: string;
  coverThumb?: string;
};

const PREVIEW_W = 360;
const PREVIEW_H = 240;
const MAX_TILT = 3; // degrees

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Numbered list of case studies. One state drives hover and keyboard focus alike: the active row's
 * text shifts 8px, an accent hairline fills along its bottom and the other rows dim to 70% (every
 * element, tag chips included, stays at or above 3:1). On a fine pointer a cover preview follows the
 * cursor; keyboard focus and reduced motion anchor the preview above the row. Touch devices get a small
 * thumbnail per row and a pressed state, never the preview.
 */
export function WorkList({ title, empty, rows }: { title: string; empty: string; rows: WorkRow[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [mode, setMode] = useState<"pointer" | "anchored" | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const motion = useRef({ x: 0, y: 0, tilt: 0, lastX: 0, lastT: 0, frame: 0 });
  const anchoredRow = useRef<HTMLElement | null>(null);

  useEffect(() => () => cancelAnimationFrame(motion.current.frame), []);

  // Writes positions straight to the DOM once per frame; the tilt eases back to 0 when the cursor rests.
  const paint = () => {
    const m = motion.current;
    m.frame = 0;
    if (preview.current) preview.current.style.transform = `translate3d(${m.x}px, ${m.y}px, 0) rotate(${m.tilt}deg)`;
    if (Math.abs(m.tilt) > 0.05) {
      m.tilt *= 0.85;
      m.frame = requestAnimationFrame(paint);
    }
  };
  const schedule = () => {
    if (!motion.current.frame) motion.current.frame = requestAnimationFrame(paint);
  };

  const follow = (event: React.PointerEvent) => {
    const m = motion.current;
    const now = event.timeStamp;
    const velocity = (event.clientX - m.lastX) / Math.max(now - m.lastT, 1); // px per ms
    m.tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, velocity * 4));
    m.lastX = event.clientX;
    m.lastT = now;
    // Right of the cursor, flipping left near the right edge; kept clear of the header and the bottom.
    const right = event.clientX + 32;
    m.x = right + PREVIEW_W > window.innerWidth - 16 ? event.clientX - 32 - PREVIEW_W : right;
    m.y = Math.min(Math.max(event.clientY - PREVIEW_H / 2, 72), window.innerHeight - PREVIEW_H - 16);
    schedule();
  };

  // Keyboard focus (and reduced motion) pin the preview at the row's right edge, above the row (or
  // below it near the top of the screen) so the focused row itself stays fully readable.
  const anchor = (row: HTMLElement) => {
    anchoredRow.current = row;
    const r = row.getBoundingClientRect();
    const m = motion.current;
    m.tilt = 0;
    m.x = Math.max(16, r.right - PREVIEW_W);
    m.y = r.top - PREVIEW_H - 8 >= 72 ? r.top - PREVIEW_H - 8 : r.bottom + 8;
    schedule();
  };

  const clear = () => {
    anchoredRow.current = null;
    setActive(null);
    setMode(null);
  };

  // An anchored preview stays attached to its row while the page scrolls.
  useEffect(() => {
    if (mode !== "anchored") return;
    const onScroll = () => anchoredRow.current && anchor(anchoredRow.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const current = active === null ? undefined : rows[active];
  const showPreview = !!(current?.coverHover || current?.cover) && mode !== null;

  return (
    <section id="work" aria-labelledby="work-title" className="container-site py-section">
      <h2 id="work-title" className="label">
        {title}
      </h2>

      {rows.length === 0 ? (
        <p className="text-body mt-6 text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-6 border-t">
          {rows.map((row, i) => (
            <li
              key={row.slug}
              className={cn("transition-opacity duration-200", active !== null && active !== i && "opacity-70")}
            >
              <Link
                href={`/work/${row.slug}`}
                data-active={active === i}
                data-work-row
                onPointerEnter={(event) => {
                  if (event.pointerType !== "mouse" || !finePointer()) return;
                  setActive(i);
                  if (reducedMotion()) {
                    setMode("anchored");
                    anchor(event.currentTarget);
                  } else {
                    setMode("pointer");
                    follow(event);
                  }
                }}
                onPointerMove={(event) => {
                  if (mode === "pointer" && event.pointerType === "mouse") follow(event);
                }}
                onPointerLeave={clear}
                onFocus={(event) => {
                  if (!event.currentTarget.matches(":focus-visible")) return;
                  setActive(i);
                  setMode("anchored");
                  anchor(event.currentTarget);
                }}
                onBlur={clear}
                className={cn(
                  "group/row relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b py-6 active:bg-muted md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,15rem)_3.5rem_auto] md:gap-x-6",
                )}
              >
                <span className="label self-baseline pt-1">{row.n}</span>

                <span className="flex min-w-0 flex-col gap-1 transition-transform duration-(--duration-hover) ease-out motion-safe:group-data-[active=true]/row:translate-x-2">
                  <span className="text-h3 flex flex-wrap items-center gap-x-3">
                    {row.title}
                    {row.private && (
                      <span className="label inline-flex items-center gap-1">
                        <Lock className="size-3" aria-hidden />
                        Private
                      </span>
                    )}
                  </span>
                  <span className="text-muted-foreground">{row.tagline}</span>
                  <span className="label md:hidden">{row.year}</span>
                </span>

                <span className="hidden flex-wrap gap-2 md:flex">
                  {row.tags.map((tag) => (
                    <Badge key={tag} variant="chip">
                      {tag}
                    </Badge>
                  ))}
                </span>

                <span className="label hidden md:block">{row.year}</span>

                <span className="flex items-center gap-3">
                  {(row.coverThumb || row.cover) && (
                    // Touch devices get a small thumbnail instead of the cursor preview.
                    <Image
                      src={row.coverThumb || row.cover!}
                      alt=""
                      width={56}
                      height={56}
                      className="hidden size-14 rounded-sm border object-cover pointer-coarse:block"
                    />
                  )}
                  <ArrowRight
                    aria-hidden
                    className="size-5 transition-transform duration-(--duration-hover) motion-safe:group-data-[active=true]/row:translate-x-1"
                  />
                </span>

                {/* Hairline that fills across the row bottom (240ms); the focus ring replaces it for keyboard focus. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-240 ease-out group-data-[active=true]/row:scale-x-100 group-focus-visible/row:hidden motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Cover preview. Decorative: the row link carries the name. */}
      <div
        ref={preview}
        aria-hidden
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-30 overflow-hidden rounded-md border bg-muted transition-opacity duration-200",
          showPreview ? "opacity-100" : "opacity-0",
        )}
        style={{ width: PREVIEW_W, height: PREVIEW_H }}
      >
        {(current?.coverHover || current?.cover) && (
          <Image
            src={current.coverHover || current.cover!}
            alt=""
            width={PREVIEW_W}
            height={PREVIEW_H}
            className="size-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
