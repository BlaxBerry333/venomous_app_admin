import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";
import { I18nextProvider } from "react-i18next";

import i18next from "../instance";

const I18nProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
});

export default I18nProvider;
