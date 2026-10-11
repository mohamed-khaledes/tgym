import type { Locale } from "../i18n";
import ar from "./ar";
import en, { type Dictionary } from "./en";

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
export type { Dictionary };
