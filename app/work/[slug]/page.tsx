import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CaseStudyGate } from "@/components/case-study/case-study-gate";
import { CaseStudyProgress } from "@/components/case-study/case-study-progress";
import { CaseStudyContentsRail } from "@/components/case-study/case-study-contents-rail";
import { HeroVideo } from "@/components/case-study/hero-video";
import { getAllProjects, getNextProject, getProject } from "@/lib/mdx";
import { publicFileExists } from "@/lib/site-files";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  const isPrivate = project.visibility === "private";

  return {
    title: project.title,
    description: project.summary || project.tagline,
    alternates: {
      canonical: `/work/${slug}`,
    },
    ...(isPrivate
      ? {
          robots: { index: false, follow: false },
        }
      : {
          openGraph: {
            title: `${project.title} · ${site.name}`,
            description: project.summary || project.tagline,
            url: `${site.url}/work/${slug}`,
            type: "article",
          },
          twitter: {
            card: "summary_large_image",
            title: `${project.title} · ${site.name}`,
            description: project.summary || project.tagline,
          },
        }),
  };
}

function renderDetailCell(label: string, value: string | string[] | undefined) {
  if (!value) return null;
  const str = Array.isArray(value) ? value.join(", ") : value;
  if (!str || !str.trim()) return null;

  const isPlaceholder = str.startsWith("[YOUR INPUT");
  if (isPlaceholder) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div key={label} className="flex flex-col gap-1 px-4 py-3 first:pl-0 last:pr-0">
        <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd>
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground border border-dashed border-border">
            {str}
          </span>
        </dd>
      </div>
    );
  }

  return (
    <div key={label} className="flex flex-col gap-1 px-4 py-3 first:pl-0 last:pr-0">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground leading-snug">{str}</dd>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const nextProject = await getNextProject(slug);
  const isPrivate = project.visibility === "private";
  const hasVideo = project.video && publicFileExists(project.video);
  const videoComing = Boolean(project.video) && !hasVideo;
  const showCover = !hasVideo && !videoComing && !project.redact && publicFileExists(project.cover);

  const detailItems = [
    { label: "Company", value: project.company },
    { label: "Role", value: project.role },
    { label: "Duration", value: project.timeline },
    { label: "Platform type", value: project.platformType || project.platforms },
    { label: "Team", value: project.team },
    { label: "Deliverables", value: project.deliverables },
    { label: "Status", value: project.status },
  ].filter((item) => item.value);

  const contentBody = (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-screen">
      {/* Left Column: Case study content (approx 70% width) */}
      <div className="lg:w-[70%] py-10 lg:py-16 min-w-0 max-w-full">
        <div className="case-study-content w-full">
          <project.Content />
        </div>
      </div>

      {/* Right Column: Sticky Contents List (approx 26% width) with vertical hairline on left */}
      <aside className="lg:w-[26%] lg:border-l border-border shrink-0 py-10 lg:py-16 lg:pl-8 xl:pl-10">
        <CaseStudyContentsRail />
      </aside>
    </div>
  );

  return (
    <article className="flex flex-1 flex-col">
      {/* Optional left-edge vertical status ribbon */}
      <CaseStudyProgress status={project.status} />

      {/* Second Bar: Back to home left, Next project right, with full-width hairline below */}
      <nav
        aria-label="Case study navigation"
        className="w-full border-b border-border bg-background py-3.5"
      >
        <div className="container-case-study flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-(--duration-hover) group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>

          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <span>Next project</span>
              <ArrowRight className="size-3.5 transition-transform duration-(--duration-hover) group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </nav>

      {/* Split Header: 50/50 two-column split with full-width hairlines above and below */}
      <header className="w-full border-b border-border bg-background">
        <div className="container-case-study">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {/* Left: Project title display size */}
            <div className="py-12 md:py-20 lg:pr-14 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-medium tracking-tight text-foreground leading-[1.08]">
                  {project.logo ? (
                    <>
                      <span className="sr-only">{project.title}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.logo}
                        alt=""
                        aria-hidden="true"
                        width={2038}
                        height={436}
                        className={`h-12 sm:h-14 md:h-16 xl:h-20 w-auto ${project.logoDark ? "dark:hidden" : ""}`}
                      />
                      {project.logoDark && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.logoDark}
                          alt=""
                          aria-hidden="true"
                          width={2038}
                          height={436}
                          className="hidden dark:block h-12 sm:h-14 md:h-16 xl:h-20 w-auto"
                        />
                      )}
                    </>
                  ) : (
                    project.title
                  )}
                </h1>
                {isPrivate && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Lock className="size-3" />
                    <span>Private</span>
                  </Badge>
                )}
              </div>
            </div>

            {/* Right: Tagline (28 to 32px) and summary in muted body */}
            <div className="py-12 md:py-20 lg:pl-14 flex flex-col justify-center gap-6">
              <p className="text-[26px] sm:text-[28px] md:text-[32px] font-normal text-foreground leading-snug">
                {project.tagline}
              </p>
              {project.summary && (
                <p className="text-[17px] leading-[1.7] text-muted-foreground max-w-[600px]">
                  {project.summary}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Project details strip: row of cells with hairline dividers */}
      {detailItems.length > 0 && (
        <section
          aria-label="Project details"
          className="w-full border-b border-border bg-background"
        >
          <div className="container-case-study py-4 sm:py-6">
            <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 divide-y sm:divide-y-0 divide-x divide-border">
              {detailItems.map(({ label, value }) => renderDetailCell(label, value))}
            </dl>
          </div>
        </section>
      )}

      {/* Metrics strip: 3 equal cells with vertical hairlines and hairlines above/below */}
      {project.metrics && project.metrics.length > 0 && (
        <section
          aria-label="Headline metrics"
          className="w-full border-b border-border bg-background py-8 sm:py-10"
        >
          <div className="container-case-study">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {project.metrics.slice(0, 3).map((m, idx) => (
                <div key={idx} className="flex flex-col items-center text-center px-4 py-4 md:py-2 first:pl-0 last:pr-0">
                  <span className="text-[36px] md:text-[44px] font-bold tracking-tight text-foreground leading-none">
                    {m.value}
                    {m.suffix && <span className="text-accent-strong">{m.suffix}</span>}
                  </span>
                  <span className="mt-2 text-sm md:text-[15px] text-muted-foreground leading-snug max-w-xs">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero Video: Inside the container, 100% container width, 16:9, max-w-[1600px], unboxed */}
      {hasVideo && (
        <section aria-label="Hero video walkthrough" className="w-full border-b border-border bg-background py-8 md:py-12">
          <div className="container-case-study">
            <HeroVideo
              src={project.video!}
              poster={project.poster}
              videoCredit={project.videoCredit || "CitiusCloud"}
              title={`${project.title} Hero Video`}
            />
          </div>
        </section>
      )}

      {/* Video declared in frontmatter but not rendered yet: hold its 16:9 area */}
      {videoComing && (
        <section aria-label="Hero video" className="w-full border-b border-border bg-background py-8 md:py-12">
          <div className="container-case-study">
            <div className="flex aspect-video w-full max-w-[1600px] mx-auto flex-col items-center justify-center gap-2 border border-dashed border-border px-6 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Video coming
              </span>
              <span className="text-[15px] text-muted-foreground">
                A short motion walkthrough of {project.title} will play here.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Optional Unboxed Cover if no video */}
      {showCover && (
        <section aria-label="Cover visual" className="w-full border-b border-border bg-background py-8 md:py-12">
          <div className="container-case-study">
            <div className="relative aspect-video w-full max-w-[1600px] mx-auto overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-auto aspect-video object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Body (Left content column + Right sticky contents rail) */}
      <div className="container-case-study">
        {isPrivate ? (
          <CaseStudyGate
            title={project.title}
            slug={slug}
            email={site.email}
          >
            {contentBody}
          </CaseStudyGate>
        ) : (
          contentBody
        )}
      </div>

      {/* Footer Navigation to Next Case Study */}
      {nextProject && (
        <nav aria-label="Next case study" className="border-t border-border bg-muted/20">
          <div className="container-case-study py-16 md:py-24">
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col gap-3 border-y border-border py-8 transition-colors md:py-12"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Next Project</span>
                <ArrowRight className="size-5 text-muted-foreground transition-transform duration-(--duration-hover) group-hover:translate-x-1" />
              </div>
              <h3 className="text-3xl md:text-4xl font-medium text-foreground group-hover:text-accent-strong transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-body text-muted-foreground line-clamp-2 max-w-2xl">
                {nextProject.tagline}
              </p>
            </Link>
          </div>
        </nav>
      )}
    </article>
  );
}
