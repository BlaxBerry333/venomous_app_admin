import { useTranslation } from "react-i18next";

import { I18nItems, type I18nLanguageType } from "../_helpers";

const useLocales = () => {
  const { i18n } = useTranslation();

  const currentI18nLanguage = i18n.language as I18nLanguageType;
  const currentDayjsLocale = I18nItems[currentI18nLanguage].dayjsLocale;
  const currentFlagIcon = I18nItems[currentI18nLanguage].icon;

  return {
    i18nLang: currentI18nLanguage,
    dayjsLang: currentDayjsLocale,
    flagIcon: currentFlagIcon,
  };
};

export default useLocales;
