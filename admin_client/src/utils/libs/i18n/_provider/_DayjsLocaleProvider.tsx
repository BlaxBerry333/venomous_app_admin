import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { dayjs } from "~/utils/libs/tools/datetime";
import { useLocales } from "../_hooks";

const DayjsLocaleProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const { dayjsLang } = useLocales();
  dayjs.locale(dayjsLang);

  return <>{children}</>;
});

export default DayjsLocaleProvider;
