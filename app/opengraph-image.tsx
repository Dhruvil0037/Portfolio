import { ImageResponse } from "next/server";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(129,140,248,0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.3), transparent 50%)",
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
            backgroundImage: "linear-gradient(90deg, #818cf8, #38bdf8)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Dhruvil Dhamecha
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            color: "#e2e8f0",
          }}
        >
          Senior Full Stack Developer
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          Next.js · Node.js · Express · PostgreSQL
        </div>
      </div>
    ),
    { ...size }
  );
}
