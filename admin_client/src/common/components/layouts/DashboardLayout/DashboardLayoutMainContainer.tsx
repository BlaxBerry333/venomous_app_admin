import type { FC, PropsWithChildren } from "react";
import { memo, useContext, useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";

import { CustomBackToTop } from "~/common/components/custom/back-to-top";
import { DashboardLayoutContext } from "./context";
import DashboardLayoutNavMenu from "./DashboardLayoutNavMenu";

const DashboardLayoutMainContainer: FC<PropsWithChildren> = ({ children }) => {
  const layoutContextValue = useContext(DashboardLayoutContext);

  // ----------------------------------------------------------------------------------------------------

  const [scrollTarget, setScrollTarget] = useState<HTMLElement | undefined>(undefined);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiContainer
      component="main"
      maxWidth={layoutContextValue?.largeScreenLimit}
      style={{ padding: 0 }}
      sx={{ display: "flex", position: "relative" }}
    >
      <MuiBox
        component="aside"
        sx={{
          display: layoutContextValue?.isSmallScreen ? "none" : "block",
          width: 240,
          height: `calc(100svh - 64px)`,
          overflowY: "scroll",
        }}
      >
        <DashboardLayoutNavMenu />
      </MuiBox>

      <MuiBox
        component="div"
        ref={(node: HTMLElement) => node && setScrollTarget(node)}
        sx={{
          flex: 1,
          height: `calc(100svh - 64px)`,
          overflowY: "scroll",
          py: 1,
          px: 1,
        }}
      >
        {children}
      </MuiBox>

      <CustomBackToTop target={scrollTarget} />
    </MuiContainer>
  );
};

export default memo(DashboardLayoutMainContainer);
