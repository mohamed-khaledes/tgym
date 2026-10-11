export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

/** English is the default: it lives at "/" while Arabic lives at "/ar". */
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Public URL path for a locale's home page. */
export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);

export const ogLocale: Record<Locale, string> = { ar: "ar_EG", en: "en_US" };
