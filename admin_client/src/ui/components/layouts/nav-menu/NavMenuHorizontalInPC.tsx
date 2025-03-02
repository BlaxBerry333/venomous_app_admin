import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

import { UI_CONFIGS } from "~/ui/_configs";

const size = UI_CONFIGS.size.NAV_MENU_HEIGHT.COLLAPSED_IN_LARGE_SCREEN;

const NavMenuHorizontalInPC: NamedExoticComponent<PropsWithChildren<MuiBoxProps>> = memo(
  ({ children, sx, ...props }) => {
    return (
      <MuiBox
        component="nav"
        sx={{
          height: `${size}px`,
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: UI_CONFIGS.size.HEADER_HEIGHT,
          overflowX: "scroll",
          overflowY: "hidden",
          px: 1,
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: ({ palette }) => palette.background.paper,
          "& ul.MuiList-root": { display: "flex" },
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiBox>
    );
  },
);

export default NavMenuHorizontalInPC;
