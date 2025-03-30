import { useCallback } from "react";

import { useTranslation as i18bUseTranslation } from "react-i18next";
import { I18N_LANGAUGES, type I18nLanguageType } from "../_helpers";

const useTranslation = (namespace?: string) => {
  const { t, i18n } = i18bUseTranslation(namespace);

  const changeLanguage = useCallback(
    (lang: I18nLanguageType) => {
      if (I18N_LANGAUGES.includes(lang)) {
        i18n.changeLanguage(lang);
      }
    },
    [i18n],
  );

  return { t, changeLanguage };
};

export default useTranslation;
