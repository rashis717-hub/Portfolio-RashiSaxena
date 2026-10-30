"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { Copy, FileText, Link as LinkIcon, SunMoon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { isPlaceholder } from "@/lib/placeholder";
import { focusHash } from "@/lib/focus";
import { useToggleTheme } from "./theme-toggle";

export type ShellProject = { title: string; slug: string; private: boolean };
export type ShellPage = { label: string; href: string };

/** Contact links. Undefined when not supplied; a [YOUR INPUT] string only in development. */
export type ShellLinks = { email?: string; linkedin?: string; resume?: string };

export function CommandMenu({
  open,
  onOpenChange,
  pages,
  projects,
  links,
  onStatus,
  returnFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pages: ShellPage[];
  projects: ShellProject[];
  links: ShellLinks;
  onStatus: (message: string) => void;
  /** Where focus goes when the menu closes without leaving the page. */
  returnFocus: () => HTMLElement | null;
}) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const toggleTheme = useToggleTheme();
  const leavingPage = useRef(false);
  const samePageHash = useRef("");

  // Close first so focus returns to the trigger, then act.
  const run = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  // Moving to another page hands focus to that page's h1 (RouteFocus), so the menu must not
  // pull it back to the trigger when its close animation ends.
  // A jump within the same page (e.g. /#work from the home page) focuses that section instead.
  const navigate = (href: string) => {
    const url = new URL(href, location.href);
    leavingPage.current = url.pathname !== location.pathname;
    samePageHash.current = leavingPage.current ? "" : url.hash;
    run(() => router.push(href));
  };

  const copyEmail = (email: string) =>
    navigator.clipboard.writeText(email).then(
      () => onStatus("Email address copied"),
      () => onStatus(`Could not copy. The address is ${email}`),
    );

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command menu"
      description="Search case studies and pages, or run an action."
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        if (leavingPage.current) {
          leavingPage.current = false;
          return;
        }
        const hash = samePageHash.current;
        samePageHash.current = "";
        if (hash && focusHash(hash)) return;
        returnFocus()?.focus();
      }}
      className="duration-160 ease-entrance data-open:zoom-in-98 data-closed:zoom-out-98 motion-reduce:data-open:zoom-in-100 motion-reduce:data-closed:zoom-out-100 sm:max-w-lg"
    >
      <Command>
        <CommandInput placeholder="Search or jump to…" />
        <CommandList>
          <CommandEmpty>Nothing matches. Try a page name or “theme”.</CommandEmpty>

          {projects.length > 0 && (
            <CommandGroup heading="Case studies">
              {projects.map((project) => (
                <CommandItem
                  key={project.slug}
                  value={`case study ${project.title}`}
                  onSelect={() => navigate(`/work/${project.slug}`)}
                >
                  <span className="truncate">{project.title}</span>
                  {project.private && (
                    <Badge variant="outline" className="ml-auto">
                      Private
                    </Badge>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.href}
                value={`page ${page.label}`}
                onSelect={() => navigate(page.href)}
              >
                {page.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem value="theme dark light mode" onSelect={() => run(toggleTheme)}>
              <SunMoon aria-hidden />
              Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
            </CommandItem>
            {links.email && (
              <CommandItem
                value="copy email contact"
                disabled={isPlaceholder(links.email)}
                onSelect={() => run(() => copyEmail(links.email!))}
              >
                <Copy aria-hidden />
                Copy email
                {isPlaceholder(links.email) && <PlaceholderNote value={links.email} />}
              </CommandItem>
            )}
            {links.linkedin && (
              <CommandItem
                value="open linkedin profile"
                disabled={isPlaceholder(links.linkedin)}
                onSelect={() => run(() => window.open(links.linkedin, "_blank", "noopener"))}
              >
                <LinkIcon aria-hidden />
                Open LinkedIn
                {isPlaceholder(links.linkedin) && <PlaceholderNote value={links.linkedin} />}
              </CommandItem>
            )}
            {links.resume && (
              <CommandItem
                value="open resume cv pdf"
                onSelect={() => run(() => window.open(links.resume, "_blank", "noopener"))}
              >
                <FileText aria-hidden />
                Open résumé
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

// Development only: shows which value is still missing.
function PlaceholderNote({ value }: { value: string }) {
  return <span className="ml-auto truncate font-mono text-xs text-muted-foreground">{value}</span>;
}
