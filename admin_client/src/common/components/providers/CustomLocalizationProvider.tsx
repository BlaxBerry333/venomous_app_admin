import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

const CustomLocalizationProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* TODO: */}
      {/* I18nextProvider、MUILocalizationProvider、DayjsLocalizationProvider */}
      {children}
    </>
  );
};

export default memo(CustomLocalizationProvider);
