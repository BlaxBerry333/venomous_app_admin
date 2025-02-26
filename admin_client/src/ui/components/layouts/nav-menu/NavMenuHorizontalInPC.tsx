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
          px: 1,
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: ({ palette }) => palette.background.paper,
          "& li.MuiListItem-root": {
            width: `${size}px !important`,
            margin: "0 !important",
          },
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
