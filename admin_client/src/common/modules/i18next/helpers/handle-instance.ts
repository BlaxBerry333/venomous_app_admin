import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import {
  I18nCurrentLanguage,
  I18nFallbackLanguage,
  I18nSupportedLanguages,
  STORED_I18NEXT_LANGUAGE_KEY,
} from "./handle-supported-languages";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string) => import(`../languages/${lang}.json`)))
  .init({
    debug: false,
    lng: I18nCurrentLanguage,
    fallbackLng: I18nFallbackLanguage,
    supportedLngs: I18nSupportedLanguages,
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: STORED_I18NEXT_LANGUAGE_KEY,
    },
  });

export default i18next;
