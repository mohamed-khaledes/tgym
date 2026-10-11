export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

/** Arabic is the default: it lives at "/" while English lives at "/en". */
export const defaultLocale: Locale = "ar";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Public URL path for a locale's home page. */
export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);

export const ogLocale: Record<Locale, string> = { ar: "ar_EG", en: "en_US" };
