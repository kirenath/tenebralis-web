import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tenebralis Dream System",
    short_name: "Tenebralis",
    description: "界影浮光 — 快穿系统手机",
    start_url: "/",
    display: "standalone",
    background_color: "#F0F4FF",
    theme_color: "#A0C4FF",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
