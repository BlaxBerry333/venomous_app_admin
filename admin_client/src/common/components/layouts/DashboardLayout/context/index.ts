import { createContext } from "react";

import type { Breakpoint } from "@mui/material/styles";

type DashboardLayoutContextValueType = {
  largeScreenLimit: Breakpoint;
  isSmallScreen: boolean;
  isOpenSmallScreenNavDrawer: boolean;
  toggleSmallScreenNavDrawer: VoidFunction;
  closeSmallScreenNavDrawer: VoidFunction;
  isOpenSettingDrawer: boolean;
  toggleSettingDrawer: VoidFunction;
  closeSettingDrawer: VoidFunction;
};

export const DashboardLayoutContext = createContext<null | DashboardLayoutContextValueType>(null);
