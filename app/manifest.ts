import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, dirOf } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const { meta } = getDictionary(defaultLocale);

  return {
    name: `${site.name} — ${site.nameAr}`,
    short_name: site.name,
    description: meta.description,
    lang: defaultLocale,
    dir: dirOf(defaultLocale),
    start_url: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    categories: ["fitness", "health", "sports"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
