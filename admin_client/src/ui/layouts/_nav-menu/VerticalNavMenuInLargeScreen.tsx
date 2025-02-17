import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

import { HEADER_HEIGHT, useLayoutStore } from "~/ui/_hooks";
import { AnimationIconButton, ButtonSize } from "~/ui/components";
import { Logo } from "../_logo";

const VerticalNavMenuInLargeScreen: NamedExoticComponent<PropsWithChildren<MuiBoxProps>> = memo(
  ({ children, sx, ...props }) => {
    const {
      navMenuWidthInLargeScreen,
      navMenuExpandedInLargeScreen,
      toggleNavMenuExpandedInLargeScreen,
    } = useLayoutStore();

    return (
      <MuiBox
        component="aside"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1100,
          boxSizing: "border-box",
          height: "100svh",
          width: `${navMenuWidthInLargeScreen}px`,
          transition: "width 0.2s ease-in-out",
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          ...sx,
        }}
        {...props}
      >
        {/* Nav Menu Header */}
        <MuiBox
          sx={{ height: `${HEADER_HEIGHT}px`, display: "flex", alignItems: "center", px: 2.5 }}
        >
          <Logo />

          <AnimationIconButton
            size={ButtonSize.SMALL}
            onClick={toggleNavMenuExpandedInLargeScreen}
            icon={
              navMenuExpandedInLargeScreen
                ? "solar:alt-arrow-left-bold-duotone"
                : "solar:alt-arrow-right-bold-duotone"
            }
            wrapperStyle={{
              position: "absolute",
              top: HEADER_HEIGHT / 2,
              right: 0,
              zIndex: 9999,
              transform: "translate(50%, -50%)",
            }}
            sx={{
              border: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              transition: "background-color 0s ease-in-out",
              "&:hover": { bgcolor: "background.default" },
            }}
          />
        </MuiBox>

        {/* Nav Menu Scrollable List */}
        <MuiBox
          component="nav"
          sx={{
            height: `calc(100svh - ${HEADER_HEIGHT}px)`,
            overflowY: "scroll",
            px: 1,
          }}
        >
          {children}
        </MuiBox>
      </MuiBox>
    );
  },
);

export default VerticalNavMenuInLargeScreen;
