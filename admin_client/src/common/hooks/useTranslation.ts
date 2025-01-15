import { useCallback, useEffect, useMemo } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";

import { toast } from "~/common/components/custom/snackbar";
import { setDayjsLocalLanguage } from "../modules/dayjs";
import {
  formatI18nLanguageToISO,
  I18nFallbackLanguage,
  I18nSupportedLanguages,
  type SupportedLanguage,
} from "../modules/i18next/helpers/handle-supported-languages";

export default function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  const isLanguageChanged = useMemo<boolean>(
    () => i18n.language !== I18nFallbackLanguage,
    [i18n.language],
  );

  const currentLanguage = useMemo<SupportedLanguage>(
    () =>
      (i18n.languages.find((lang) =>
        I18nSupportedLanguages.includes(lang as SupportedLanguage),
      ) as SupportedLanguage) || I18nFallbackLanguage,
    [i18n.languages],
  );

  useEffect(() => {
    if (currentLanguage) {
      document.querySelector("html")!.lang = formatI18nLanguageToISO(currentLanguage);
    }
  }, [currentLanguage]);

  // ----------------------------------------------------------------------------------------------------

  const changeLanguage = useCallback(
    async (newLang: SupportedLanguage) => {
      try {
        i18n.changeLanguage(newLang);
        if (currentLanguage !== newLang) {
          setDayjsLocalLanguage(newLang);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "");
      }
    },
    [i18n, currentLanguage],
  );

  return {
    t,
    i18n,
    currentLanguage,
    isLanguageChanged,
    changeLanguage,
  };
}
