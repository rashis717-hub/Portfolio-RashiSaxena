import { AboutHomeSection } from "@/components/site/about-home-section";
import { Hero } from "@/components/site/hero";
import { LogoStrip } from "@/components/site/logo-strip";
import { Contact } from "@/components/site/home-sections";
import { Numbers } from "@/components/site/numbers";
import { KineticMarquee } from "@/components/site/pillars";
import { WorkShowcase } from "@/components/site/work-showcase";
import { site } from "@/content/site";
import { getAllProjects } from "@/lib/mdx";
import { supplied } from "@/lib/placeholder";
import { resumeHref } from "@/lib/site-files";

export default async function Home() {
  const allProjects = await getAllProjects();
  const projects = allProjects.filter(
    (project) => project.visibility !== "private" || project.showPrivateInList
  );

  return (
    <>
      <Hero resume={resumeHref()} />
      <KineticMarquee />
      <LogoStrip />
      <WorkShowcase projects={projects} />
      <Numbers items={site.stats} />
      <AboutHomeSection />
      <Contact links={{ email: supplied(site.email), linkedin: supplied(site.linkedin) }} />
    </>
  );
}
