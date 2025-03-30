export const DAYJS_LOCALES = {
  en: "en", // English
  fr: "fr", // French
  ja: "ja", // Japanese
  vi: "vi", // Vietnamese
  zh: "zh-cn", // Chinese
} as const;

export type DayjsLocaleType = (typeof DAYJS_LOCALES)[keyof typeof DAYJS_LOCALES];
