import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";
import { UI_CONFIGS } from "~/ui/_configs";

import { ContainerMaxBreakpoint, ContainerWrapper } from "~/ui/components";

const DashboardLayoutContent: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <ContainerWrapper
      maxWidth={ContainerMaxBreakpoint.XL}
      sx={{
        pt: 1,
        px: 2,
        pb: 0,
        height: `calc(100svh - ${UI_CONFIGS.size.HEADER_HEIGHT}px - 8px) !important`,
      }}
    >
      {children}
    </ContainerWrapper>
  );
});

export default DashboardLayoutContent;
