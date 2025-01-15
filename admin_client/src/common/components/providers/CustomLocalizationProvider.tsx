import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import { I18nextProvider } from "react-i18next";

import i18next from "~/common/modules/i18next/helpers/handle-instance";

const CustomLocalizationProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18next}>
      {/* TODO: */}
      {/* MUILocalizationProvider、DayjsLocalizationProvider */}
      {children}
    </I18nextProvider>
  );
};

export default memo(CustomLocalizationProvider);
