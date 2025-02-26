import type { NamedExoticComponent } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid2";
import MuiStack from "@mui/material/Stack";

import { UI_CONFIGS } from "~/ui/_configs";
import { BaseColor, getColor, ThemePaletteColors } from "~/ui/_helpers";
import {
  DEFAULT_NAV_POSITION,
  DEFAULT_PALETTE_COLOR_NAME,
  DEFAULT_THEME_MODE,
  NavPosition,
  ThemeMode,
  useLayoutStore,
  useThemeStore,
} from "~/ui/_hooks";
import IconOfNavPositionHorizontal from "~/ui/assets/images/icons/nav-position-horizontal.png";
import IconOfNavPositionVertical from "~/ui/assets/images/icons/nav-position-vertical.png";
import {
  Badge,
  CardClickable,
  CardWithLabel,
  Drawer,
  DrawerPosition,
  Image,
  Switch,
  Typography,
} from "~/ui/components/base";
import { AnimationIconButton, Icon } from "~/ui/components/customs";
import { Header, HeaderDesign } from "~/ui/components/layouts/header";

const SettingsDrawer: NamedExoticComponent<{
  showOptionBlocks: {
    themeMode: boolean;
    themePaletteColorName: boolean;
    dashboardNavMenuPosition: boolean;
  };
}> = memo(({ showOptionBlocks }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = useCallback((newOpen: boolean) => {
    return () => setIsOpen(newOpen);
  }, []);

  const { paletteColorName, mode, reset: resetTheme } = useThemeStore();
  const { navMenuPosition, reset: resetLayout } = useLayoutStore();

  const isSettingsOptionsChanged = useMemo<boolean>(
    () =>
      mode !== DEFAULT_THEME_MODE ||
      paletteColorName !== DEFAULT_PALETTE_COLOR_NAME ||
      navMenuPosition !== DEFAULT_NAV_POSITION,
    [mode, paletteColorName, navMenuPosition],
  );
  const reset = useCallback(() => {
    resetTheme();
    resetLayout();
  }, [resetTheme, resetLayout]);

  return (
    <>
      <Badge showBadge={isSettingsOptionsChanged} color={BaseColor.ERROR}>
        <AnimationIconButton
          icon={"solar:settings-bold-duotone"}
          onClick={toggleIsOpen(true)}
          color={BaseColor.INHERIT}
          sx={{
            animation: "spin 30s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
      </Badge>

      <Drawer
        isOpen={isOpen}
        onClose={toggleIsOpen(false)}
        width={UI_CONFIGS.size.SETTING_DRAWER_WIDTH}
        position={DrawerPosition.RIGHT}
      >
        {/* Settings Drawer Header */}
        <Header
          design={HeaderDesign.GLASS}
          sx={{ backgroundColor: "transparent !important" }}
          renderActions={
            <MuiStack direction="row" spacing={1}>
              <Badge showBadge={isSettingsOptionsChanged} color={BaseColor.ERROR}>
                <AnimationIconButton
                  icon={"solar:restart-bold-duotone"}
                  color={BaseColor.INHERIT}
                  onClick={isSettingsOptionsChanged ? reset : undefined}
                  disabled={!isSettingsOptionsChanged}
                />
              </Badge>
              <AnimationIconButton
                icon={"solar:close-circle-line-duotone"}
                color={BaseColor.INHERIT}
                onClick={toggleIsOpen(false)}
              />
            </MuiStack>
          }
        />

        {/* Nav Menu Scrollable List */}
        <MuiBox
          component="nav"
          sx={{
            height: `calc(100svh - ${UI_CONFIGS.size.HEADER_HEIGHT}px)`,
            overflowY: "scroll",
            px: 1,
          }}
        >
          <MuiStack spacing={6} sx={{ py: 2 }}>
            {/* Theme Mode */}
            {showOptionBlocks.themeMode && <BlockOfThemeMode title="Mode" />}

            {/* Theme Palettes */}
            {showOptionBlocks.themePaletteColorName && <BlockOfPalettes title="Palettes" />}

            {/* Dashboard Nav Position */}
            {showOptionBlocks.dashboardNavMenuPosition && (
              <BlockOfDashboardNavPositions title="Nav Position" />
            )}
          </MuiStack>
        </MuiBox>
      </Drawer>
    </>
  );
});

export default SettingsDrawer;

export const BlockOfThemeMode: NamedExoticComponent<{ title: string }> = memo(({ title }) => {
  const { mode, toggleMode } = useThemeStore();
  const isDarkMode: boolean = mode === ThemeMode.DARK;
  return (
    <CardWithLabel title={title} sx={{ p: 0 }}>
      <CardClickable
        onClick={toggleMode}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pt: 3,
          px: 3,
          pb: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 2 }}>
          <Icon icon={isDarkMode ? "solar:moon-bold-duotone" : "solar:sun-2-bold-duotone"} />
          {mode === ThemeMode.LIGHT ? "Light" : "Dark"}
        </Typography>
        <Switch checked={isDarkMode} />
      </CardClickable>
    </CardWithLabel>
  );
});

export const BlockOfPalettes: NamedExoticComponent<{ title: string }> = memo(({ title }) => {
  const { paletteColorName, setPaletteColorName } = useThemeStore();
  return (
    <CardWithLabel title={title}>
      <MuiGrid container spacing={1}>
        {ThemePaletteColors.map(({ name, colors: { primary: primaryColor } }) => {
          const isSelected: boolean = name === paletteColorName;
          return (
            <MuiGrid key={name} size={4}>
              <CardClickable
                onClick={() => setPaletteColorName(name)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: primaryColor.light,
                  bgcolor: getColor(primaryColor.main).opacity(isSelected ? 0.15 : 0),
                }}
              >
                <Icon icon="solar:siderbar-bold-duotone" width={32} sx={{ color: "inherit" }} />
              </CardClickable>
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </CardWithLabel>
  );
});

export const BlockOfDashboardNavPositions: NamedExoticComponent<{ title: string }> = memo(
  ({ title }) => {
    const { navMenuPosition, setNavMenuPosition } = useLayoutStore();

    const isDashboardLayout: boolean = true;
    if (!isDashboardLayout) {
      return null;
    }
    return (
      <CardWithLabel title={title}>
        <MuiGrid container spacing={1}>
          {[
            { name: NavPosition.VerticalNavPosition, imageModule: IconOfNavPositionVertical },
            { name: NavPosition.HorizontalNavPosition, imageModule: IconOfNavPositionHorizontal },
          ].map(({ name, imageModule }) => {
            const isSelected: boolean = name === navMenuPosition;
            return (
              <MuiGrid key={name} size={6}>
                <CardClickable
                  onClick={() => setNavMenuPosition(name)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isSelected ? "action.selected" : "transparent",
                  }}
                >
                  <Image
                    imageModule={imageModule}
                    width={72}
                    height={56}
                    sx={{
                      backgroundColor: isSelected ? "white" : "transparent",
                      borderRadius: 2,
                      border: 1,
                      borderColor: "divider",
                    }}
                  />
                </CardClickable>
              </MuiGrid>
            );
          })}
        </MuiGrid>
      </CardWithLabel>
    );
  },
);
