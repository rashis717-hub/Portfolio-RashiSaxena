import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-site flex flex-1 flex-col justify-center gap-6 py-section">
      <p className="label">404 · Page not found</p>
      <h1 className="text-h2 max-w-2xl">This page has moved, or never existed.</h1>
      <p className="text-body text-muted-foreground">
        The work is still here. Pick up from the case study list or start from the home page.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild>
          <Link href="/#work">
            See the work
            <ArrowRight data-icon="inline-end" aria-hidden />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </section>
  );
}
