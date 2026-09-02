import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhruvil Dhamecha | Senior Full Stack Developer",
    short_name: "Dhruvil Dhamecha",
    description:
      "Senior Full Stack Developer with 2+ years of experience building AI-powered products, real-time systems & SEO-first Next.js applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
