import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import type { Theme as MuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { UI_CONFIGS } from "~/ui/_configs";
import { getColor } from "~/ui/_helpers";
import { NavPosition, useLayoutStore } from "~/ui/_hooks";
import {
  ContainerMaxBreakpoint,
  ContainerWrapper,
  Header,
  HeaderDesign,
  Logo,
  NavMenuHorizontalInPC,
  NavMenuVerticalInMobile,
  NavMenuVerticalInPC,
  SettingsDrawer,
} from "~/ui/components";
import { DASHBOARD_PATHS } from "~/utils/libs/router";
import DashboardLayoutContent from "./DashboardLayoutContent";
import DashboardLayoutNavMenu from "./DashboardLayoutNavMenu";

export const elementID = "dashboard-layout-account";

const DashboardLayout: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const isLargeScreen: boolean = useMediaQuery((theme: MuiTheme) => theme.breakpoints.up("sm"));

  const { isExpandedInLargeScreen, navMenuWidthInLargeScreen, navMenuPosition } = useLayoutStore();

  const isVerticalNavMenu: boolean = navMenuPosition === NavPosition.VerticalNavPosition;
  const isHorizontalNavMenu: boolean = navMenuPosition === NavPosition.HorizontalNavPosition;

  // ----------------------------------------------------------------------------------------------------

  return (
    <ContainerWrapper
      maxWidth={ContainerMaxBreakpoint.FULL_WIDTH}
      sx={{
        height: "100svh !important",
        backgroundColor: ({ palette }) => getColor(palette.background.default).opacity(1),
        ...(isVerticalNavMenu && {
          display: "flex",
          flexDirection: "row",
        }),
      }}
    >
      {isLargeScreen && isVerticalNavMenu && (
        <NavMenuVerticalInPC>
          {isExpandedInLargeScreen && <DashboardLayoutNavMenu.ParentCollapsable />}
          {!isExpandedInLargeScreen && (
            <DashboardLayoutNavMenu.ParentIconOnly isVertical showChildItemTitleUnderIcon />
          )}
        </NavMenuVerticalInPC>
      )}

      <div
        style={{
          ...(isVerticalNavMenu && {
            flex: "1 1 auto",
            position: "relative",
            paddingLeft: isLargeScreen ? `${navMenuWidthInLargeScreen}px` : 0,
            transition: "padding-left 0.2s ease-in-out",
          }),
        }}
      >
        <Header
          design={HeaderDesign.GLASS}
          height={UI_CONFIGS.size.HEADER_HEIGHT}
          renderLogo={
            <>
              {!isLargeScreen && (
                <NavMenuVerticalInMobile>
                  <DashboardLayoutNavMenu.ParentCollapsable />
                </NavMenuVerticalInMobile>
              )}
              {isHorizontalNavMenu && <Logo to={DASHBOARD_PATHS.analysis} sx={{ ml: 1.5 }} />}
            </>
          }
          renderActions={
            <>
              <div id={elementID} />
              <SettingsDrawer
                showOptionBlocks={{
                  themeMode: true,
                  themePaletteColorName: true,
                  dashboardNavMenuPosition: true,
                }}
              />
            </>
          }
        />

        {isLargeScreen && isHorizontalNavMenu && (
          <NavMenuHorizontalInPC>
            <DashboardLayoutNavMenu.ParentIconOnly
              isVertical={false}
              showChildItemTitleUnderIcon={false}
            />
          </NavMenuHorizontalInPC>
        )}

        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </div>
    </ContainerWrapper>
  );
});

export default DashboardLayout;
