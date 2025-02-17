import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense, useCallback, useMemo, useState } from "react";

import MuiBadge from "@mui/material/Badge";
import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid2";
import MuiStack from "@mui/material/Stack";
import MuiSwitch from "@mui/material/Switch";

import IconOfNavPositionHorizontal from "~/assets/images/icons/nav-position-horizontal.png";
import IconOfNavPositionVertical from "~/assets/images/icons/nav-position-vertical.png";

import { getColor, ThemePaletteColors } from "~/ui/_helpers";
import {
  DEFAULT_PALETTE_COLOR_NAME,
  DEFAULT_THEME_MODE,
  HEADER_HEIGHT,
  NavPosition,
  SETTING_DRAWER_WIDTH,
  ThemeMode,
  useLayoutStore,
  useThemeStore,
} from "~/ui/_hooks";
import {
  AnimationIconButton,
  ButtonColor,
  Icon,
  Image,
  SectionClickable,
  SectionWithLabel,
  Typography,
} from "~/ui/components";
import { Header, HeaderDesign } from "../_header";

const MuiDrawer = lazy(() => import("@mui/material/Drawer"));

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

  const { paletteColorName, mode, reset } = useThemeStore();
  const isSettingsOptionsChanged = useMemo<boolean>(
    () => mode !== DEFAULT_THEME_MODE || paletteColorName !== DEFAULT_PALETTE_COLOR_NAME,
    [mode, paletteColorName],
  );

  return (
    <>
      <MuiBadge
        color="error"
        variant="dot"
        invisible={!isSettingsOptionsChanged}
        sx={{ ".MuiBadge-badge": { top: "8px", right: "4px" } }}
      >
        <AnimationIconButton
          icon={"solar:settings-bold-duotone"}
          onClick={toggleIsOpen(true)}
          color={ButtonColor.INHERIT}
        />
      </MuiBadge>

      <Suspense>
        <MuiDrawer
          open={isOpen}
          onClose={toggleIsOpen(false)}
          anchor="right"
          PaperProps={{
            sx: { width: SETTING_DRAWER_WIDTH },
          }}
        >
          {/* Settings Drawer Header */}
          <Header
            design={HeaderDesign.GLASS}
            height={HEADER_HEIGHT}
            renderActions={() => (
              <MuiStack direction="row" spacing={1}>
                <MuiBadge
                  color="error"
                  variant="dot"
                  invisible={!isSettingsOptionsChanged}
                  sx={{ ".MuiBadge-badge": { top: "8px", right: "4px" } }}
                >
                  <AnimationIconButton
                    icon={"solar:restart-bold-duotone"}
                    color={ButtonColor.INHERIT}
                    onClick={isSettingsOptionsChanged ? reset : undefined}
                    disabled={!isSettingsOptionsChanged}
                  />
                </MuiBadge>
                <AnimationIconButton
                  icon={"solar:close-circle-line-duotone"}
                  color={ButtonColor.INHERIT}
                  onClick={toggleIsOpen(false)}
                />
              </MuiStack>
            )}
          />

          {/* Nav Menu Scrollable List */}
          <MuiBox
            component="nav"
            sx={{
              height: `calc(100svh - ${HEADER_HEIGHT}px)`,
              overflowY: "scroll",
              px: 1,
            }}
          >
            <MuiStack
              spacing={6}
              sx={{ py: 2, "& .MuiSwitch-track": { transition: "background-color 0s" } }}
            >
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
        </MuiDrawer>
      </Suspense>
    </>
  );
});

export default SettingsDrawer;

export const BlockOfThemeMode: NamedExoticComponent<{ title: string }> = memo(({ title }) => {
  const { mode, toggleMode } = useThemeStore();
  const isDarkMode: boolean = mode === ThemeMode.DARK;
  return (
    <SectionWithLabel
      title={title}
      isClickableArea
      onClick={toggleMode}
      sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 2 }}>
        <Icon icon={isDarkMode ? "solar:moon-bold-duotone" : "solar:sun-2-bold-duotone"} />
        {mode === ThemeMode.LIGHT ? "Light" : "Dark"}
      </Typography>
      <MuiSwitch color="primary" checked={isDarkMode} />
    </SectionWithLabel>
  );
});

export const BlockOfPalettes: NamedExoticComponent<{ title: string }> = memo(({ title }) => {
  const { paletteColorName, setPaletteColorName } = useThemeStore();
  return (
    <SectionWithLabel title={title}>
      <MuiGrid container spacing={1}>
        {ThemePaletteColors.map(({ name, colors: { primary: primaryColor } }) => {
          const isSelected: boolean = name === paletteColorName;
          return (
            <MuiGrid key={name} size={4}>
              <SectionClickable
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
              </SectionClickable>
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </SectionWithLabel>
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
      <SectionWithLabel title={title}>
        <MuiGrid container spacing={1}>
          {[
            { name: NavPosition.VerticalNavPosition, imageModule: IconOfNavPositionVertical },
            { name: NavPosition.HorizontalNavPosition, imageModule: IconOfNavPositionHorizontal },
          ].map(({ name, imageModule }) => {
            const isSelected: boolean = name === navMenuPosition;
            return (
              <MuiGrid key={name} size={6}>
                <SectionClickable
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
                </SectionClickable>
              </MuiGrid>
            );
          })}
        </MuiGrid>
      </SectionWithLabel>
    );
  },
);
