import "server-only";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

/** True when a site path such as "/work/x/cover.jpg" exists in /public. */
export function publicFileExists(href: string) {
  return fs.existsSync(path.join(process.cwd(), "public", href));
}

/** The résumé link, or undefined until the file exists in /public. */
export function resumeHref() {
  return publicFileExists(site.resume) ? site.resume : undefined;
}
