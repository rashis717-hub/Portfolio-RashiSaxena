import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
              fontSize: "24px",
              color: "#96989F",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {site.name} · {site.hero.label}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "960px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {site.hero.headline}
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#96989F",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {site.positioning}
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
          <span style={{ fontSize: "20px", color: "#96989F" }}>{site.hero.location}</span>
          <span style={{ fontSize: "20px", color: "#FF4D94" }}>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
