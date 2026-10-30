import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getAllProjects, getProject } from "@/lib/mdx";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// next/og decodes PNG and JPEG only, so a WebP cover is read from its .jpg sibling when one exists.
function coverDataUri(cover: string) {
  const candidates = /\.webp$/i.test(cover) ? [cover.replace(/\.webp$/i, ".jpg")] : [cover];
  for (const href of candidates) {
    const file = path.join(process.cwd(), "public", href);
    if (!/\.(png|jpe?g)$/i.test(href) || !fs.existsSync(file)) continue;
    const type = /\.png$/i.test(href) ? "image/png" : "image/jpeg";
    return `data:${type};base64,${fs.readFileSync(file).toString("base64")}`;
  }
  return undefined;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project || project.visibility === "private") {
    // Generic card for private/not found projects (P10 requirement)
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px",
            backgroundColor: "#090A0E",
            color: "#F6F5F3",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontSize: "24px",
                color: "#96989F",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {site.name} · Confidential Case Study
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {project ? project.title : "Private Case Study"}
            </h1>
            <p style={{ fontSize: "28px", color: "#96989F", margin: 0 }}>
              This case study is confidential and shared by invitation only.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "32px",
            }}
          >
            <span style={{ fontSize: "20px", color: "#96989F" }}>Enterprise AI Product Design</span>
            <span style={{ fontSize: "20px", color: "#FF4D94" }}>{site.url.replace("https://", "")}</span>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const cover = !project.redact ? coverDataUri(project.cover) : undefined;
  if (cover) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#090A0E",
            fontFamily: "sans-serif",
          }}
        >
          <img
            src={cover}
            alt=""
            width={1200}
            height={500}
            style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "top" }}
          />
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 56px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontSize: "44px", fontWeight: 500, letterSpacing: "-0.03em", color: "#F6F5F3" }}>
              {project.title}
            </span>
            <span style={{ fontSize: "20px", color: "#FF4D94" }}>
              {site.url.replace("https://", "")}/work/{project.slug}
            </span>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#090A0E",
          color: "#F6F5F3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#FF2E88",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                color: "#96989F",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {site.name} · Selected Work
            </span>
          </div>
          <span
            style={{
              fontSize: "18px",
              color: "#96989F",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {project.year} · {project.platforms.join(", ")}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "980px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#96989F",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {project.tagline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "32px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#96989F" }}>Role: {project.role}</span>
          <span style={{ fontSize: "20px", color: "#FF4D94" }}>{site.url.replace("https://", "")}/work/{project.slug}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
