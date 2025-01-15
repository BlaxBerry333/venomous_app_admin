import { getBrowserLocaleLanguage } from "~/common/utils/handle-browser-info";
import { getLocalStorageItem } from "~/common/utils/handle-web-storage";

export const STORED_I18NEXT_LANGUAGE_KEY = "__VENOMOUS_APP__I18N_LANGUAGE";

export type SupportedLanguage = "zh" | "en" | "ja" | "ko" | "fr" | "it" | "de" | "ru" | "vi";

export const I18nFallbackLanguage: SupportedLanguage =
  formatFullLocaleToI18nLanguage(getBrowserLocaleLanguage()) || "en";

export const I18nCurrentLanguage: SupportedLanguage =
  getLocalStorageItem<SupportedLanguage>(STORED_I18NEXT_LANGUAGE_KEY) || I18nFallbackLanguage;

export const I18nSupportedLanguages: SupportedLanguage[] = [
  "en",
  "zh",
  "ja",
  // "ko",
  // "fr",
  // "it",
  // "de",
  // "ru",
  // "vi",
];

// ----------------------------------------------------------------

/**
 * 将 i18next 的语言格式化为完整的语言代码
 * @example
 * ```ts
 * formatI18nLanguageToFullLocale("zh"); // "zh-CN"
 * formatI18nLanguageToFullLocale("ja"); // "ja-JP"
 * ```
 */
export function formatI18nLanguageToFullLocale(language: SupportedLanguage): string {
  switch (language) {
    case "zh":
      return "zh-CN";
    case "en":
      return "en-US";
    case "ja":
      return "ja-JP";
    case "ko":
      return "ko-KR";
    case "fr":
      return "fr-FR";
    case "it":
      return "it-IT";
    case "de":
      return "de-DE";
    case "ru":
      return "ru-RU";
    case "vi":
      return "vi-VN";
    default:
      return language;
  }
}

/**
 * 将完整的语言格式化为 i18next 的语言
 * @example
 * ```ts
 * formatFullLocaleToI18nLanguage("zh-CN"); // "zh"
 * formatFullLocaleToI18nLanguage("ja-JP"); // "ja"
 * ```
 */
export function formatFullLocaleToI18nLanguage(fullLocaleLang: string): SupportedLanguage {
  const parts = fullLocaleLang.split("-");
  return parts[0].toLocaleLowerCase() as SupportedLanguage;
}

/**
 * 将 i18next 的语言格式化为国家代码
 * @example
 * ```ts
 * formatI18nLanguageToCountryCode("zh"); // "CN"
 * formatI18nLanguageToCountryCode("ja"); // "JP"
 * ```
 */
export function formatI18nLanguageToCountryCode(language: SupportedLanguage): string {
  const fullLocale = formatI18nLanguageToFullLocale(language);
  const parts = fullLocale.split("-");
  return parts[1].toLocaleLowerCase();
}

/**
 * 将 i18next 的语言格式化为 HTML 的 ISO 语言代码
 * @example
 * ```ts
 * formatI18nLanguageToISO("zh"); // "zh"
 * formatI18nLanguageToISO("ja"); // "ja"
 * ```
 */
export function formatI18nLanguageToISO(language: SupportedLanguage): string {
  const fullLocale = formatI18nLanguageToFullLocale(language);
  const parts = fullLocale.split("-");

  if (parts.length === 1) return parts[0];
  return parts[0];
}
