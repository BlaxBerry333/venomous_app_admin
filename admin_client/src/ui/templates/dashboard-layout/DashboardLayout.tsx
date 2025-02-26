import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useMemo } from "react";

import type { Theme as MuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { UI_CONFIGS } from "~/ui/_configs";
import { BasePosition, getColor } from "~/ui/_helpers";
import { NavPosition, useLayoutStore } from "~/ui/_hooks";
import {
  ContainerMaxBreakpoint,
  ContainerWrapper,
  Header,
  HeaderDesign,
  ListNestedItem,
  Logo,
  NavMenuHorizontalInPC,
  NavMenuVerticalInMobile,
  NavMenuVerticalInPC,
  SettingsDrawer,
  type ListCollapsableItemProps,
} from "~/ui/components";

const DashboardLayout: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const { navMenuExpandedInLargeScreen, navMenuWidthInLargeScreen, navMenuPosition } =
    useLayoutStore();

  const isVerticalNavMenu: boolean = navMenuPosition === NavPosition.VerticalNavPosition;
  const isHorizontalNavMenu: boolean = navMenuPosition === NavPosition.HorizontalNavPosition;

  const isLargeScreen: boolean = useMediaQuery((theme: MuiTheme) => theme.breakpoints.up("sm"));

  // ----------------------------------------------------------------------------------------------------

  const navItemsWithNestedList = useMemo<Array<ListCollapsableItemProps>>(() => {
    return [
      {
        icon: "solar:box-minimalistic-bold-duotone",
        title: "XXX",
        nestList: [
          { title: "AAA", subtitle: "aaa" },
          { title: "BBB", subtitle: "bbb" },
        ],
      },
      {
        icon: "solar:box-minimalistic-bold-duotone",
        title: "XXXXX",
        nestList: [
          { title: "AAA", subtitle: "aaa" },
          { title: "BBB", subtitle: "bbb" },
          { title: "CCC" },
          { title: "DDD" },
          { title: "EEE" },
        ],
      },
    ];
  }, []);

  // ----------------------------------------------------------------------------------------------------

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
      {isLargeScreen && isVerticalNavMenu && (
        <NavMenuVerticalInPC>
          {navItemsWithNestedList.map((item) => (
            <ListNestedItem
              key={item.title}
              {...item}
              isOmittedWithPopover={!navMenuExpandedInLargeScreen}
              popoverPosition={BasePosition.RIGHT_BOTTOM}
            />
          ))}
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
                  {navItemsWithNestedList.map((item) => (
                    <ListNestedItem key={item.title} {...item} isOmittedWithPopover={false} />
                  ))}
                </NavMenuVerticalInMobile>
              )}
              {isHorizontalNavMenu && <Logo sx={{ ml: 1.5 }} />}
            </>
          }
          renderActions={
            <>
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
            {navItemsWithNestedList.map((item) => (
              <ListNestedItem
                key={item.title}
                {...item}
                isOmittedWithPopover
                popoverPosition={BasePosition.RIGHT_BOTTOM}
              />
            ))}
          </NavMenuHorizontalInPC>
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
