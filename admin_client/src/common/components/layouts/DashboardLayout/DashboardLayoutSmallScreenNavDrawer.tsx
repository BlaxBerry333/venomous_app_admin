import type { FC } from "react";
import { memo, useContext } from "react";

import { Icon } from "@iconify/react";

import MuiAppBar from "@mui/material/AppBar";
import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiIconButton from "@mui/material/IconButton";
import MuiToolbar from "@mui/material/Toolbar";

import { DashboardLayoutContext } from "./context";
import DashboardLayoutHeaderLogo from "./DashboardLayoutHeaderLogo";
import DashboardLayoutNavMenu from "./DashboardLayoutNavMenu";

export const DashboardLayoutSmallScreenNavToggleButton = memo(() => {
  const layoutContextValue = useContext(DashboardLayoutContext);

  return (
    <MuiIconButton
      size="large"
      color="inherit"
      onClick={layoutContextValue?.toggleSmallScreenNavDrawer}
      sx={{ display: layoutContextValue?.isSmallScreen ? "flex" : "none" }}
    >
      <Icon icon="solar:hamburger-menu-line-duotone" />
    </MuiIconButton>
  );
});

const DashboardLayoutSmallScreenNavDrawer: FC = () => {
  const layoutContextValue = useContext(DashboardLayoutContext);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiDrawer
      variant="temporary"
      anchor="left"
      ModalProps={{ keepMounted: true }}
      open={layoutContextValue?.isOpenSmallScreenNavDrawer}
      onClose={layoutContextValue?.closeSmallScreenNavDrawer}
      sx={{
        display: layoutContextValue?.isSmallScreen ? "block" : "none",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
    >
      <MuiAppBar position="sticky">
        <MuiToolbar sx={{ px: { xs: 1 } }}>
          <DashboardLayoutHeaderLogo />
        </MuiToolbar>
      </MuiAppBar>

      <MuiBox component="nav" sx={{ px: 1 }}>
        <DashboardLayoutNavMenu />
      </MuiBox>
    </MuiDrawer>
  );
};

export default memo(DashboardLayoutSmallScreenNavDrawer);
