import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  CopyEmailButton,
  ResumeDownloadAction,
  SkillsMatrix,
  TimelineList,
} from "@/components/site/about-sections";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About · ${site.name}`,
    description: site.description,
    url: `${site.url}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: `About · ${site.name}`,
    description: site.description,
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Intro Hero Section */}
      <section className="container-site pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <p className="label text-muted-foreground">{about.eyebrow}</p>
            <Badge variant="chip" className="text-[10px]">
              {about.introDraftNotice}
            </Badge>
          </div>

          <h1 className="text-display text-foreground tracking-tight">
            I lead design for platforms where people and AI agents work together.
          </h1>

          <div className="mt-4 flex flex-col gap-4 text-body text-muted-foreground leading-relaxed">
            {about.intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ResumeDownloadAction resumeUrl={site.resume} />
            <CopyEmailButton email={site.email} />
            <Button asChild variant="outline" size="default">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="size-4" />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience & Background Section */}
      <section className="container-site py-section border-t border-border">
        <div className="mb-12 flex flex-col gap-2">
          <p className="label text-muted-foreground">01 / Background</p>
          <h2 className="text-h2 text-foreground">Experience & Education</h2>
        </div>

        <TimelineList items={about.timeline} />
      </section>

      {/* Skills & Tools Section */}
      <section className="container-site py-section border-t border-border">
        <div className="mb-12 flex flex-col gap-2">
          <p className="label text-muted-foreground">02 / Competencies</p>
          <h2 className="text-h2 text-foreground">Skills & Tooling</h2>
        </div>

        <SkillsMatrix groups={about.skillGroups} />
      </section>

      {/* Bottom Contact Section */}
      <section className="container-site py-section border-t border-border">
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="label text-muted-foreground">03 / Contact</p>
          <h2 className="text-display text-foreground">Have a challenge in enterprise AI?</h2>
          <p className="text-body text-muted-foreground">
            Whether exploring an advisory engagement, platform PoC, or full-time leadership role, let&apos;s talk.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild variant="default" size="default">
              <a href={`mailto:${site.email}`} className="gap-2">
                <Mail className="size-4" />
                <span>Email me</span>
              </a>
            </Button>
            <CopyEmailButton email={site.email} />
          </div>
        </div>
      </section>
    </div>
  );
}
