import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Aref_Ruqaa, Bebas_Neue, Cairo, Inter, Lalezar, Permanent_Marker } from "next/font/google";
import { getDictionary } from "@/lib/dictionaries";
import { dirOf, hasLocale, localePath, locales, ogLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

// Latin fonts
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const marker = Permanent_Marker({ variable: "--font-marker", weight: "400", subsets: ["latin"] });

// Arabic fonts (Bebas Neue and Permanent Marker have no Arabic letters)
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic"] });
const lalezar = Lalezar({ variable: "--font-lalezar", weight: "400", subsets: ["arabic"] });
const ruqaa = Aref_Ruqaa({ variable: "--font-ruqaa", weight: "700", subsets: ["arabic"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  // Icons and share images come from files in the app folder (favicon.ico, icon.png, opengraph-image.jpg…)
  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: `%s | ${lang === "ar" ? site.nameAr : site.name}` },
    description: meta.description,
    keywords: meta.keywords,
    applicationName: site.name,
    category: "fitness",
    alternates: {
      canonical: localePath(lang),
      languages: { ar: localePath("ar"), en: localePath("en"), "x-default": localePath("ar") },
    },
    openGraph: {
      type: "website",
      url: localePath(lang),
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: true, address: true },
    other: { "geo.region": site.address.regionCode, "geo.placename": site.address.city },
  };
}

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const fonts =
    lang === "ar"
      ? [cairo, lalezar, ruqaa, bebas, inter]
      : [inter, bebas, marker];

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${fonts.map((f) => f.variable).join(" ")} antialiased`}>
      <body className="min-h-full bg-ink font-sans">{children}</body>
    </html>
  );
}
