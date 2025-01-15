import { createContext } from "react";

import type { Breakpoint } from "@mui/material/styles";

type DashboardLayoutContextValueType = {
  largeScreenLimit: Breakpoint;
  isSmallScreen: boolean;
  isOpenSmallScreenNavDrawer: boolean;
  toggleSmallScreenNavDrawer: () => void;
  closeSmallScreenNavDrawer: () => void;
  isOpenSettingDrawer: boolean;
  toggleSettingDrawer: () => void;
  closeSettingDrawer: () => void;
};

export const DashboardLayoutContext = createContext<null | DashboardLayoutContextValueType>(null);
