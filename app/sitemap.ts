import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const abs = (path: string) => new URL(path, site.url).href;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, abs(localePath(l))]));

  return locales.map((lang) => ({
    url: abs(localePath(lang)),
    changeFrequency: "monthly",
    priority: lang === "ar" ? 1 : 0.9,
    alternates: { languages },
    images: [abs("/opengraph-image.jpg")],
  }));
}
