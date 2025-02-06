import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";

import DashboardLayoutFooter from "./DashboardLayoutFooter";

/** 用于包裹各个路由页面的视图 view */
const DashboardLayoutMainContainerInnerWrappers: FC<
  PropsWithChildren<{
    isOverflowHidden: boolean; // 该页面内容是否为固定
    showCommonFooter: boolean; // 显示下方通用 Footer
  }>
> = ({ children, isOverflowHidden = false, showCommonFooter = true }) => {
  return (
    <MuiBox
      component="section"
      sx={{
        height: isOverflowHidden ? "-webkit-fill-available" : "auto",
        position: "relative",
      }}
    >
      {children}

      {showCommonFooter && <DashboardLayoutFooter />}
    </MuiBox>
  );
};

export default memo(DashboardLayoutMainContainerInnerWrappers);
