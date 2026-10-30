"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SkillCategory, TimelineEntry } from "@/content/about";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback if clipboard API is blocked
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <Button
        variant="outline"
        size="default"
        onClick={handleCopy}
        className="gap-2"
        aria-label={`Copy email address ${email} to clipboard`}
      >
        {copied ? (
          <>
            <Check className="size-4 text-accent-strong" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="size-4" />
            <span>Copy email</span>
          </>
        )}
      </Button>

      {/* Screen reader live notification */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}

export function TimelineList({ items }: { items: readonly TimelineEntry[] }) {
  return (
    <ol className="relative divide-y divide-border border-y border-border">
      {items.map((entry) => (
        <li
          key={entry.id}
          className="group relative flex flex-col gap-3 py-8 transition-colors duration-(--duration-hover) md:flex-row md:items-start md:justify-between md:gap-12 md:py-10"
        >
          {/* Left Column: Period & Location */}
          <div className="flex shrink-0 flex-col gap-1 md:w-56">
            <span className="label text-muted-foreground">{entry.period}</span>
            <span className="label text-[11px] text-muted-foreground/70">{entry.location}</span>
          </div>

          {/* Right Column: Role, Company & Summary */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-h3 font-medium text-foreground">{entry.company}</h3>
              {entry.isEducation && (
                <Badge variant="chip" className="text-[10px]">
                  Education
                </Badge>
              )}
            </div>

            <p className="text-body font-medium text-muted-foreground">{entry.role}</p>

            {/*
             * Summary:
             * On mobile: always visible.
             * On desktop: collapsed by default, smoothly expands when entry is hovered or focused.
             */}
            <div className="mt-2 block md:grid md:grid-rows-[0fr] md:transition-[grid-template-rows,opacity] md:duration-200 md:ease-out group-hover:md:grid-rows-[1fr] group-focus-within:md:grid-rows-[1fr]">
              <div className="overflow-hidden md:opacity-0 group-hover:md:opacity-100 group-focus-within:md:opacity-100 transition-opacity duration-200">
                <p className="text-body text-muted-foreground leading-relaxed">
                  {entry.summary}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function SkillsMatrix({ groups }: { groups: readonly SkillCategory[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
      {groups.map((group) => (
        <div key={group.name} className="flex flex-col gap-4">
          <h3 className="label text-muted-foreground">{group.name}</h3>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <Badge
                key={skill}
                variant="chip"
                className="transition-colors hover:border-border hover:bg-muted"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResumeDownloadAction({ resumeUrl }: { resumeUrl: string }) {
  return (
    <Button asChild variant="default" size="default" className="gap-2">
      <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
        <Download className="size-4" data-icon="inline-start" />
        <span>Download Résumé</span>
        <span className="sr-only"> (PDF, opens in new tab)</span>
      </a>
    </Button>
  );
}
