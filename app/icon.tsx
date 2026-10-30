import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#0C0D12",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FF2E88",
          fontWeight: 600,
          borderRadius: 6,
          fontFamily: "sans-serif",
          letterSpacing: "-0.02em",
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
