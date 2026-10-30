import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/site/analytics";
import { RouteFocus } from "@/components/site/route-focus";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ThemeProvider } from "@/components/site/theme-provider";
import { site } from "@/content/site";
import { getAllProjects } from "@/lib/mdx";
import { supplied } from "@/lib/placeholder";
import { resumeHref } from "@/lib/site-files";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Loading projects here also validates every case study's frontmatter on each build.
  const projects = (await getAllProjects()).map((project) => ({
    title: project.title,
    slug: project.slug,
    private: project.visibility === "private",
  }));

  const resume = resumeHref();
  const links = { email: supplied(site.email), linkedin: supplied(site.linkedin), resume };

  // Nav items appear only once their target exists: the résumé file, or the page's route
  // (About arrives in P8). Anchors on the home page always exist.
  const pageExists = (href: string) =>
    href.includes("#") ||
    ["page.tsx", "page.mdx"].some((file) => fs.existsSync(path.join(process.cwd(), "app", href, file)));
  const nav = site.nav.filter((item) => (item.href === site.resume ? !!resume : pageExists(item.href)));
  const pages = [{ label: "Home", href: "/" }, ...nav.filter((item) => !item.external)];

  return (
    // next-themes sets the theme class on <html> before hydration.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {/* Parked above the viewport (still announced), dropped over the wordmark on focus. */}
          <a
            href="#main"
            className="fixed top-2.5 left-(--spacing-gutter) z-50 inline-flex h-11 -translate-y-20 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground focus:translate-y-0"
          >
            Skip to content
          </a>
          <SiteHeader
            name={site.name}
            role={site.role}
            nav={nav}
            pages={pages}
            projects={projects}
            links={links}
          />
          {/* pt-16 reserves the fixed header's height, so its state changes never shift content. */}
          <main id="main" tabIndex={-1} className="flex flex-1 flex-col pt-16">
            {children}
          </main>
          <SiteFooter name={site.name} line={supplied(site.footer)} links={links} />
          <RouteFocus />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
