/**
 * The site's public URL, used for canonical links, the sitemap, robots.txt and structured data.
 * Order: NEXT_PUBLIC_SITE_URL if set → the Vercel production domain (set automatically by Vercel) → localhost.
 */
function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/**
 * Language-independent details about the gym.
 * Translated text (descriptions, address lines, labels) lives in lib/dictionaries.
 */
export const site = {
  name: "T Gym",
  nameAr: "تي جيم",
  /** Other ways people write the name, so searches like "tgym" match */
  alternateNames: ["TGYM", "TGym", "تي جيم"],
  url: getSiteUrl(),
  themeColor: "#0a0a0a",
  brandColor: "#d7141c",

  phone: "+201030000563",
  phoneDisplay: "+20 103 000 0563",

  /** Used for structured data and the Google Maps link. */
  address: {
    street: "Intersection of Souq Street and Al-Bahr Street, Ashmoun El-Rumman",
    city: "Dikirnis",
    region: "Dakahlia",
    regionCode: "EG-DK",
    country: "Egypt",
    countryCode: "EG",
  },

  /** Opening hours for structured data; 23:59 is how Google expects "midnight". */
  hours: [
    { days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:00", closes: "23:59" },
    { days: ["Friday"], opens: "14:00", closes: "23:59" },
  ],

  social: {
    instagram: "https://www.instagram.com/tgymoffical",
    facebook: "https://www.facebook.com/tgymoffical",
  },
} as const;
