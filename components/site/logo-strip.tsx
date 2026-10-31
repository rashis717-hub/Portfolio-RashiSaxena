import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

/** Width over height, read from the logo's viewBox at build time. */
function aspect(src: string): number {
  const svg = fs.readFileSync(path.join(process.cwd(), "public", src), "utf8");
  const box = svg.match(/viewBox="([^"]+)"/)?.[1].trim().split(/[\s,]+/).map(Number);
  return box && box[3] ? box[2] / box[3] : 1;
}

/**
 * Companies Rashi has worked with, as one quiet row of flat grey marks. Each logo is a CSS mask
 * filled with the muted foreground token, so every mark reads as the same grey in both themes.
 */
export function LogoStrip() {
  const { label, items } = site.logos;

  return (
    <div className="container-site py-16 md:py-20">
      <ul aria-label={label} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 opacity-70">
        {items.map((logo) => (
          <li key={logo.name}>
            <span
              role="img"
              aria-label={logo.name}
              className="block bg-muted-foreground [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              style={{
                height: logo.height,
                width: Math.round(logo.height * aspect(logo.src)),
                maskImage: `url(${logo.src})`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
