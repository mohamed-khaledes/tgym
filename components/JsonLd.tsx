import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Structured data so Google can show T Gym as a local business (address, hours, phone, socials). */
export default function JsonLd({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pageUrl = new URL(localePath(lang), site.url).href;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ExerciseGym",
        "@id": `${site.url}/#gym`,
        name: site.name,
        alternateName: site.alternateNames,
        description: dict.meta.description,
        url: pageUrl,
        logo: `${site.url}/icon-512.png`,
        image: [
          `${site.url}/opengraph-image.jpg`,
          `${site.url}/images/gym-08.jpg`,
          `${site.url}/images/gym-01.jpg`,
          `${site.url}/images/gym-04.jpg`,
        ],
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: lang === "ar" ? dict.footer.address[0] : site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.countryCode,
        },
        openingHoursSpecification: site.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        sameAs: Object.values(site.social),
        availableLanguage: ["ar", "en"],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.meta.title,
        inLanguage: lang,
        about: { "@id": `${site.url}/#gym` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
