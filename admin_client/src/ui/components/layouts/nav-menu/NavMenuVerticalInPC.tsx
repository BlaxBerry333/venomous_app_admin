import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

import { UI_CONFIGS } from "~/ui/_configs";
import { BaseSize } from "~/ui/_helpers";
import { useLayoutStore } from "~/ui/_hooks";
import { AnimationIconButton } from "~/ui/components/customs";
import { Header, HeaderDesign } from "~/ui/components/layouts";
import { DASHBOARD_PATHS } from "~/utils/libs/router";
import { Logo } from "../logo";

const NavMenuVerticalInPC: NamedExoticComponent<PropsWithChildren<MuiBoxProps>> = memo(
  ({ children, sx, ...props }) => {
    const {
      navMenuWidthInLargeScreen,
      isExpandedInLargeScreen,
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
        <Header
          design={HeaderDesign.GLASS}
          renderLogo={
            <Logo
              to={DASHBOARD_PATHS.analysis}
              sx={{
                ml: isExpandedInLargeScreen ? 1.5 : 2,
                transition: "margin-left 0.2s ease-in-out",
              }}
            />
          }
          renderActions={
            <AnimationIconButton
              size={BaseSize.SMALL}
              onClick={toggleNavMenuExpandedInLargeScreen}
              icon={
                isExpandedInLargeScreen
                  ? "solar:alt-arrow-left-bold-duotone"
                  : "solar:alt-arrow-right-bold-duotone"
              }
              wrapperStyle={{
                position: "absolute",
                top: UI_CONFIGS.size.HEADER_HEIGHT / 2,
                right: -1,
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
          }
        />

        {/* Nav Menu Scrollable List */}
        <MuiBox
          component="nav"
          sx={{
            height: `calc(100svh - ${UI_CONFIGS.size.HEADER_HEIGHT}px)`,
            overflowY: "scroll",
            px: 1,
            "& li.MuiListItem-root": {
              width: "100% !important",
              transition: "width 0.2s ease-in-out",
            },
          }}
        >
          {children}
        </MuiBox>
      </MuiBox>
    );
  },
);

export default NavMenuVerticalInPC;
