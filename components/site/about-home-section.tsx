import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { about } from "@/content/about";
import { site } from "@/content/site";

/**
 * About Me section right on the home page (anchor id="about" matching jithinrp.com/#about).
 */
export function AboutHomeSection() {
  return (
    <section id="about" aria-labelledby="about-home-title" className="border-t border-border bg-card/10">
      <div className="container-site py-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Links */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 id="about-home-title" className="text-display font-medium tracking-tight text-foreground">
              UX Lead
            </h2>

            <p className="text-h3 font-medium tracking-tight text-foreground text-balance">
              I lead design for platforms where people and AI agents work together.
            </p>

            <div className="flex flex-col gap-4 text-body text-muted-foreground leading-relaxed">
              <p>
                I&apos;m Rashi Saxena, a UX Lead based in New Delhi specialising in enterprise B2B AI platforms,
                agent experience (AX), and human-in-the-loop systems.
              </p>
              <p>
                My work centers on turning algorithmic complexity and multi-tenant workflows into clear,
                calm interfaces that enterprise operators and leaders can trust with high-consequence decisions.
              </p>
              <p>
                Currently leading UX at Covasant Technologies, previously consulting on autonomous operations
                with infraBOT (CitiusCloud / IBM Partner Plus) and designing generative AI applications at ContexIQ.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {site.resume && (
                <Button asChild variant="default">
                  <a href={site.resume} target="_blank" rel="noopener" className="gap-2">
                    <Download className="size-4" />
                    <span>Download Resume</span>
                  </a>
                </Button>
              )}
              {site.email && (
                <Button asChild variant="outline">
                  <a href={`mailto:${site.email}`} className="gap-2">
                    <Mail className="size-4" />
                    <span>Email me</span>
                  </a>
                </Button>
              )}
              <Button asChild variant="ghost">
                <Link href="/about" className="gap-1 text-sm text-accent-strong">
                  <span>Full background & timeline</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Editorial Profile & Verified Milestones */}
          <div className="lg:col-span-5 flex flex-col gap-6 rounded-md border border-border bg-card p-6 md:p-8">
            <h3 className="text-h3 font-medium text-foreground">Verified Experience</h3>

            <div className="flex flex-col gap-4 divide-y divide-border pt-2 text-sm">
              <div className="flex flex-col gap-1 pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Covasant Technologies</span>
                  <span className="label text-xs text-muted-foreground">2025 – Present</span>
                </div>
                <span className="text-xs text-accent-strong">UX Lead, Enterprise AI</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Leading agentic platform UX and Covasant Design System. 50+ enterprise teams consuming agent frameworks.
                </p>
              </div>

              <div className="flex flex-col gap-1 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">infraBOT · CitiusCloud</span>
                  <span className="label text-xs text-muted-foreground">2026</span>
                </div>
                <span className="text-xs text-foreground/80">UX Consultant (Autonomous Operations)</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Designed self-healing enterprise IT workflows for IBM Silver Partner &amp; IBM Partner Plus directory.
                </p>
              </div>

              <div className="flex flex-col gap-1 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">ContexIQ</span>
                  <span className="label text-xs text-muted-foreground">2024 – 2025</span>
                </div>
                <span className="text-xs text-foreground/80">Product Designer (GenAI)</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Meeting intelligence and voice conversational AI deployed at Avendus &amp; Godrej.
                </p>
              </div>

              <div className="flex flex-col gap-1 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Education</span>
                  <span className="label text-xs text-muted-foreground">Grade 8.5</span>
                </div>
                <span className="text-xs text-muted-foreground">NIFT — Fashion Technology (Bachelor&apos;s)</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <span className="label text-muted-foreground mb-2 block">Competencies</span>
              <div className="flex flex-wrap gap-1.5">
                {about.skillGroups[0]?.skills.slice(0, 5).map((skill) => (
                  <Badge key={skill} variant="chip" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
