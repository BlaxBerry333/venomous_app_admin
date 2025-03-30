import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import DayjsLocaleProvider from "./_DayjsLocaleProvider";
import I18nProvider from "./_I18nProvider";

const LanguageProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <I18nProvider>
      <DayjsLocaleProvider>{children}</DayjsLocaleProvider>
    </I18nProvider>
  );
});

export default LanguageProvider;
