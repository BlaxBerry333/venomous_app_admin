import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ar-sa";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/vi";
import "dayjs/locale/zh-cn";

const LanguageProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  dayjs.locale("zh-cn");

  return <>{children}</>;
});

export default LanguageProvider;
