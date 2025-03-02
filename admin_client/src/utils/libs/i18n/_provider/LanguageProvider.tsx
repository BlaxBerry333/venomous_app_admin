import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { DAY_JS_LOCALES, dayjs } from "~/utils/libs/tools/datetime";

const LanguageProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  dayjs.locale(DAY_JS_LOCALES["en"]);

  return <>{children}</>;
});

export default LanguageProvider;
