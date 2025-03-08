import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { ContainerMaxBreakpoint, ContainerWrapper } from "~/ui/components";

const DashboardLayoutContent: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <ContainerWrapper
      maxWidth={ContainerMaxBreakpoint.LG}
      sx={{
        pt: 1,
        px: 2,
        pb: 0,
      }}
    >
      {children}
    </ContainerWrapper>
  );
});

export default DashboardLayoutContent;
