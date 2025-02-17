//lib/dictionary.ts

import "server-only";

import type { Locale } from "@/i18n.config";

const dictionaries = {
  fi: () => import("@/dictionaries/fi.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  sv: () => import("@/dictionaries/sv.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
