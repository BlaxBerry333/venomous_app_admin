import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { getColor } from "~/ui/_helpers";
import { HEADER_HEIGHT, NavPosition, useLayoutStore } from "~/ui/_hooks";
import { ContainerMaxBreakpoint, ContainerWrapper, ListNestedItem } from "~/ui/components";

import { Header, HeaderDesign } from "../_header";
import { Logo } from "../_logo";
import { HorizontalNavMenuInLargeScreen, VerticalNavMenuInLargeScreen } from "../_nav-menu";
import { SettingsDrawer } from "../_settings";

const DashboardLayout: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const { navMenuExpandedInLargeScreen, navMenuWidthInLargeScreen, navMenuPosition } =
    useLayoutStore();

  const isVerticalNavMenu: boolean = navMenuPosition === NavPosition.VerticalNavPosition;
  const isHorizontalNavMenu: boolean = navMenuPosition === NavPosition.HorizontalNavPosition;

  return (
    <ContainerWrapper
      maxWidth={ContainerMaxBreakpoint.FULL_WIDTH}
      sx={{
        backgroundColor: ({ palette }) => getColor(palette.background.default).opacity(1),
        ...(isVerticalNavMenu && {
          display: "flex",
          flexDirection: "row",
        }),
      }}
    >
      {isVerticalNavMenu && (
        <VerticalNavMenuInLargeScreen>
          <ListNestedItem
            icon={"solar:box-minimalistic-bold-duotone"}
            title={"xxx"}
            nestList={[
              { title: "xxxxx", subtitle: "xxx" },
              {
                title: "xxxx",
              },
            ]}
            isOmittedWithPopover={!navMenuExpandedInLargeScreen}
          />
          <div style={{ height: "200vh" }}></div>
        </VerticalNavMenuInLargeScreen>
      )}

      <div
        style={{
          ...(isVerticalNavMenu && {
            flex: "1 1 auto",
            position: "relative",
            paddingLeft: `${navMenuWidthInLargeScreen}px`,
            transition: "padding-left 0.2s ease-in-out",
          }),
        }}
      >
        <Header
          design={HeaderDesign.GLASS}
          height={HEADER_HEIGHT}
          renderLogo={isHorizontalNavMenu ? () => <Logo sx={{ ml: 0.5 }} /> : undefined}
          renderActions={() => (
            <>
              <SettingsDrawer
                showOptionBlocks={{
                  themeMode: true,
                  themePaletteColorName: true,
                  dashboardNavMenuPosition: true,
                }}
              />
            </>
          )}
        />

        {isHorizontalNavMenu && (
          <HorizontalNavMenuInLargeScreen>
            <div style={{ width: "200vw" }}></div>
          </HorizontalNavMenuInLargeScreen>
        )}

        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </div>
    </ContainerWrapper>
  );
});

export default DashboardLayout;

const DashboardLayoutContent: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <ContainerWrapper
      maxWidth={ContainerMaxBreakpoint.LG}
      sx={{
        pt: 1,
        px: 2,
        pb: 0,
      }}
    >
      {children}
    </ContainerWrapper>
  );
});
