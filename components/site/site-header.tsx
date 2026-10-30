"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/content/site";
import { focusHash } from "@/lib/focus";
import { cn } from "@/lib/utils";
import { CommandMenu, type ShellLinks, type ShellPage, type ShellProject } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";

const SCROLLED_AT = 24; // px before the header gains its border and blur
const HIDE_AFTER = 64; // px; never hide while the header still covers its own space

const noopSubscribe = () => () => {};
const isApple = () => /Mac|iPhone|iPad/i.test(navigator.userAgent);

// A link to an anchor on the current page (e.g. /#work from the home page) also moves keyboard
// focus to that section; the router only scrolls.
function NavLink({
  item,
  active,
  onClick,
  ...props
}: { item: NavItem; active: boolean } & Omit<React.ComponentProps<"a">, "href">) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener" onClick={onClick} {...props}>
        {item.label}
        <span className="sr-only"> (PDF, opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={(event) => {
        onClick?.(event);
        const url = new URL(item.href, location.href);
        if (url.hash && url.pathname === location.pathname) requestAnimationFrame(() => focusHash(url.hash));
      }}
      {...props}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader({
  name,
  role,
  nav,
  pages,
  projects,
  links,
}: {
  name: string;
  role: string;
  nav: NavItem[];
  pages: ShellPage[];
  projects: ShellProject[];
  links: ShellLinks;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const apple = useSyncExternalStore(noopSubscribe, isApple, () => true);
  const shortcut = apple ? "⌘K" : "Ctrl K";

  const [scrolled, setScrolled] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("");
  const statusTimer = useRef<number | undefined>(undefined);
  const commandButton = useRef<HTMLButtonElement>(null);
  const focusBeforeMenu = useRef<HTMLElement | null>(null);

  const openMenu = (open: boolean) => {
    if (open) focusBeforeMenu.current = document.activeElement as HTMLElement | null;
    setMenuOpen(open);
  };

  // Focus returns to whatever opened the menu; from the keyboard shortcut with nothing focused,
  // it falls back to the search button.
  const menuReturnFocus = () => {
    const previous = focusBeforeMenu.current;
    return previous && previous !== document.body && previous.isConnected ? previous : commandButton.current;
  };

  const isActive = (item: NavItem) => !!item.match && pathname.startsWith(item.match);

  // Scroll state, read once per frame.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AT);
      if (Math.abs(y - lastY) > 4) setScrollingDown(y > lastY && y > HIDE_AFTER);
      lastY = y;
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

  // ⌘K / Ctrl+K toggles the command menu from anywhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMenuOpen((open) => {
          if (!open) focusBeforeMenu.current = document.activeElement as HTMLElement | null;
          return !open;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => window.clearTimeout(statusTimer.current), []);

  const announce = (message: string) => {
    setStatus(message);
    window.clearTimeout(statusTimer.current);
    statusTimer.current = window.setTimeout(() => setStatus(""), 2400);
  };

  // Hiding is an exception to the 16px motion cap (approved). It never happens under reduced
  // motion, while keyboard focus is in the header, or while the command menu is open.
  const hidden = scrollingDown && !reduceMotion && !focusInside && !menuOpen;

  return (
    <>
      <header
        data-scrolled={scrolled}
        data-hidden={hidden}
        onFocus={() => setFocusInside(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
        }}
        className="fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[translate,background-color,border-color] duration-200 ease-out data-[hidden=true]:-translate-y-full data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/85 data-[scrolled=true]:backdrop-blur-md"
      >
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-4">
            <Link
              id="site-home"
              href="/"
              className="relative shrink-0 font-medium tracking-tight before:absolute before:-inset-2 before:content-['']"
            >
              {name}
            </Link>
            {/* Who this is, for visitors who land deep in the site. Hidden by CSS on pages with the
                hero, which states it already (globals.css), so server and client markup match. */}
            <span data-header-role className="label hidden truncate lg:inline">
              {role}
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <nav aria-label="Main">
              <ul className="flex items-center gap-5 md:gap-8">
                {nav.map((item) => (
                  // On phones the résumé lives in the footer, keeping the header to page links.
                  <li key={item.href} className={cn(item.external && "hidden md:block")}>
                    <NavLink
                      item={item}
                      active={isActive(item)}
                      className="underline-draw before:absolute before:-inset-x-2 before:-inset-y-2 before:content-['']"
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-1 md:flex">
              <ThemeToggle />
              <Button
                ref={commandButton}
                variant="ghost"
                size="sm"
                onClick={() => openMenu(true)}
                aria-keyshortcuts="Meta+K Control+K"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                Search
                {/* Fixed width so "⌘K" and "Ctrl K" take the same space after hydration. */}
                <kbd className="inline-block w-12 font-mono text-xs">{shortcut}</kbd>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CommandMenu
        open={menuOpen}
        onOpenChange={openMenu}
        pages={pages}
        projects={projects}
        links={links}
        onStatus={announce}
        returnFocus={menuReturnFocus}
      />

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity duration-200",
          status ? "opacity-100" : "opacity-0",
        )}
      >
        {status}
      </div>
    </>
  );
}
