import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

import { HEADER_HEIGHT } from "~/ui/_hooks";

const HorizontalNavMenuInLargeScreen: NamedExoticComponent<PropsWithChildren<MuiBoxProps>> = memo(
  ({ children, sx, ...props }) => {
    return (
      <MuiBox
        component="nav"
        sx={{
          overflowX: "scroll",
          height: `${HEADER_HEIGHT}px`,
          position: "sticky",
          top: HEADER_HEIGHT,
          px: 1,
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: ({ palette }) => palette.background.paper,
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiBox>
    );
  },
);

export default HorizontalNavMenuInLargeScreen;
