import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: "#0C0D12",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FF2E88",
          fontWeight: 700,
          borderRadius: 36,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        RS
      </div>
    ),
    {
      ...size,
    }
  );
}
