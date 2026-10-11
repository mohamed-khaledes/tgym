/**
 * Language-independent details about the gym.
 * Translated text (descriptions, address lines, labels) lives in lib/dictionaries.
 */
export const site = {
  name: "T Gym",
  nameAr: "تي جيم",
  // Set NEXT_PUBLIC_SITE_URL to your real domain when you deploy (e.g. https://tgym.com)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
