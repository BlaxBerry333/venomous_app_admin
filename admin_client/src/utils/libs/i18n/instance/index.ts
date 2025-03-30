import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import { getLocalStorageItem } from "~/utils/custom/storage";
import {
  I18N_LANGAUGES,
  I18n_NAMESPACES,
  I18N_STORE_LANGUAGE_KEY,
  I18nDefaultNamespace,
  I18nFallbackLanguage,
  type I18nLanguageType,
} from "../_helpers";

const I18nCurrentLanguage = getLocalStorageItem(
  I18N_STORE_LANGUAGE_KEY,
  I18nFallbackLanguage,
) as I18nLanguageType;

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lang: string, namespace: string) => import(`../languages/${lang}/${namespace}.json`),
    ),
  )
  .init({
    debug: false,
    lng: I18nCurrentLanguage,
    fallbackLng: I18nFallbackLanguage,
    supportedLngs: I18N_LANGAUGES,
    ns: I18n_NAMESPACES,
    defaultNS: I18nDefaultNamespace,
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: I18N_STORE_LANGUAGE_KEY,
    },
  });

export default i18next;
