import { isPlaceholder } from "@/lib/placeholder";
import { BackToTop } from "./back-to-top";
import { ThemeToggle } from "./theme-toggle";
import type { ShellLinks } from "./command-menu";

// A [YOUR INPUT] value renders as plain muted text (development only), never as a link.
function Placeholder({ value }: { value: string }) {
  return <span className="font-mono text-xs text-muted-foreground">{value}</span>;
}

export function SiteFooter({
  name,
  line,
  links,
}: {
  name: string;
  line?: string;
  links: ShellLinks;
}) {
  const { email, linkedin, resume } = links;

  return (
    <footer className="mt-auto border-t">
      <div className="container-site flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          {line &&
            (isPlaceholder(line) ? <Placeholder value={line} /> : <p className="text-h3">{line}</p>)}
          {email &&
            (isPlaceholder(email) ? (
              <Placeholder value={email} />
            ) : (
              <a href={`mailto:${email}`} className="link w-fit">
                {email}
              </a>
            ))}
        </div>

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {linkedin && (
            <li>
              {isPlaceholder(linkedin) ? (
                <Placeholder value={linkedin} />
              ) : (
                <a href={linkedin} target="_blank" rel="noopener" className="underline-draw">
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          )}
          {resume && (
            <li>
              <a href={resume} target="_blank" rel="noopener" className="underline-draw">
                Résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          )}
          {/* The header carries the theme toggle from md up; on phones it lives here. */}
          <li className="flex items-center gap-2 md:hidden">
            <span className="label">Theme</span>
            <ThemeToggle />
          </li>
          <li>
            <BackToTop />
          </li>
        </ul>
      </div>
      <div className="container-site pb-10">
        <p className="label">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
