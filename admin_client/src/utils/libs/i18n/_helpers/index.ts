import type { DayjsLocaleType } from "~/utils/libs/tools/datetime/dayjs-locales";

export const I18N_STORE_LANGUAGE_KEY = "__I18N_LANGUAGE__" as const;

export const I18N_LANGAUGES = [
  "en", // English
  // "fr", // French
  // "de", // German
  // "es", // Spanish
  // "it", // Italian
  "ja", // Japanese
  "zh", // Chinese
] as const;
export type I18nLanguageType = (typeof I18N_LANGAUGES)[number];
export const I18nFallbackLanguage: I18nLanguageType = "en";

export const I18n_NAMESPACES = [
  "common",
  "auth",
  "errors",
  "workflows",
  "analysis",
  "files",
] as const;
export type I18nNamespaceType = (typeof I18n_NAMESPACES)[number];
export const I18nDefaultNamespace: I18nNamespaceType = "common";

export const I18nItems: Record<
  I18nLanguageType,
  { label: string; icon: string; i18nLang: I18nLanguageType; dayjsLocale: DayjsLocaleType }
> = {
  en: {
    label: "English",
    icon: "flagpack:gb-ukm",
    i18nLang: "en",
    dayjsLocale: "en",
  },
  // fr: {
  //   label: "Français",
  //   icon: "flagpack:fr",
  //   i18nLang: "fr",
  //   dayjsLocale: "fr",
  // },
  ja: {
    label: "日本語",
    icon: "flagpack:jp",
    i18nLang: "ja",
    dayjsLocale: "ja",
  },
  zh: {
    label: "中文",
    icon: "flagpack:cn",
    i18nLang: "zh",
    dayjsLocale: "zh-cn",
  },
};
