import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { CustomDashboardAuthenticationProvider } from "~/common/components/providers";
import useBoolean from "~/common/hooks/useBoolean";
import { DashboardLayoutContext } from "./context";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import DashboardLayoutMainContainer from "./DashboardLayoutMainContainer";
import DashboardLayoutSettingDrawer from "./DashboardLayoutSettingDrawer";
import DashboardLayoutSmallScreenNavDrawer from "./DashboardLayoutSmallScreenNavDrawer";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const muiTheme = useTheme();

  // ----------------------------------------------------------------------------------------------------

  const isSmallScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("md"));
  const smallScreenNavDrawer = useBoolean(true);
  const settingDrawer = useBoolean(false);

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomDashboardAuthenticationProvider>
      <DashboardLayoutContext.Provider
        value={{
          largeScreenLimit: "xl",
          isSmallScreen,
          isOpenSmallScreenNavDrawer: smallScreenNavDrawer.value,
          toggleSmallScreenNavDrawer: smallScreenNavDrawer.toggle,
          closeSmallScreenNavDrawer: smallScreenNavDrawer.setFalse,
          isOpenSettingDrawer: settingDrawer.value,
          toggleSettingDrawer: settingDrawer.toggle,
          closeSettingDrawer: settingDrawer.setFalse,
        }}
      >
        <DashboardLayoutHeader />

        <DashboardLayoutMainContainer>{children}</DashboardLayoutMainContainer>

        <DashboardLayoutSmallScreenNavDrawer />

        <DashboardLayoutSettingDrawer />
      </DashboardLayoutContext.Provider>
    </CustomDashboardAuthenticationProvider>
  );
};

export default memo(DashboardLayout);
