import type { FC } from "react";
import { memo, useContext } from "react";

import MuiAppBar from "@mui/material/AppBar";
import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import MuiToolbar from "@mui/material/Toolbar";

import { DashboardLayoutContext } from "./context";
import DashboardLayoutHeaderLogo from "./DashboardLayoutHeaderLogo";
import { DashboardLayoutSettingToggleButton } from "./DashboardLayoutSettingDrawer";
import { DashboardLayoutSmallScreenNavToggleButton } from "./DashboardLayoutSmallScreenNavDrawer";
import DashboardLayoutUserAccountDrawerButton from "./DashboardLayoutUserAccountDrawer";

const DashboardLayoutHeader: FC = () => {
  const layoutContextValue = useContext(DashboardLayoutContext);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiAppBar position="sticky" sx={{ top: 0 }}>
      <MuiToolbar style={{ padding: 0 }}>
        <MuiContainer
          maxWidth={layoutContextValue?.largeScreenLimit}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 1, [String(layoutContextValue?.largeScreenLimit)]: 0 },
          }}
        >
          <DashboardLayoutSmallScreenNavToggleButton />

          {!layoutContextValue?.isSmallScreen && <DashboardLayoutHeaderLogo />}

          <MuiBox sx={{ flexGrow: 1 }} />

          <DashboardLayoutUserAccountDrawerButton />

          <DashboardLayoutSettingToggleButton />
        </MuiContainer>
      </MuiToolbar>
    </MuiAppBar>
  );
};

export default memo(DashboardLayoutHeader);
