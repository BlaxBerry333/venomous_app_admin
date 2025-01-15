import type { FC } from "react";
import { memo, useCallback, useContext, useMemo } from "react";

import { Icon } from "@iconify/react";

import MuiAppBar from "@mui/material/AppBar";
import MuiAvatar from "@mui/material/Avatar";
import MuiBadge from "@mui/material/Badge";
import MuiBox from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import MuiCardActionArea from "@mui/material/CardActionArea";
import MuiCardContent from "@mui/material/CardContent";
import MuiDrawer from "@mui/material/Drawer";
import MuiGrid from "@mui/material/Grid2";
import MuiIconButton from "@mui/material/IconButton";
import MuiStack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import MuiSwitch from "@mui/material/Switch";
import MuiToolbar from "@mui/material/Toolbar";
import MuiTypography from "@mui/material/Typography";

import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import useTranslation from "~/common/hooks/useTranslation";
import {
  formatI18nLanguageToCountryCode,
  I18nFallbackLanguage,
  I18nSupportedLanguages,
} from "~/common/modules/i18next/helpers/handle-supported-languages";
import {
  CustomThemePaletteColorName,
  CustomThemePaletteColorOptions,
} from "~/common/modules/mui/custom-themes";
import { DashboardLayoutContext } from "./context";

export const DashboardLayoutSettingToggleButton = memo(() => {
  const layoutContextValue = useContext(DashboardLayoutContext);

  return (
    <MuiIconButton size="large" color="inherit" onClick={layoutContextValue?.toggleSettingDrawer}>
      <Icon icon="solar:settings-bold-duotone" />
    </MuiIconButton>
  );
});

const DashboardLayoutSettingDrawer: FC = () => {
  const { t } = useTranslation();

  const customThemeContextValue = useCustomThemesContextValue();
  const layoutContextValue = useContext(DashboardLayoutContext);

  const { isLanguageChanged, changeLanguage } = useTranslation();

  const isSettingsChanged = useMemo<boolean>(
    () => customThemeContextValue?.isThemeValuesChanged || isLanguageChanged || false,
    [customThemeContextValue, isLanguageChanged],
  );

  const resetSettings = useCallback((): void => {
    customThemeContextValue?.resetThemeValues();
    changeLanguage(I18nFallbackLanguage);
  }, [customThemeContextValue, changeLanguage]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiDrawer
      variant="temporary"
      anchor="right"
      ModalProps={{ keepMounted: true }}
      open={layoutContextValue?.isOpenSettingDrawer}
      onClose={layoutContextValue?.closeSettingDrawer}
      sx={{
        display: "block",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
      }}
    >
      <MuiAppBar position="sticky">
        <MuiToolbar style={{ padding: 0 }}>
          <MuiBox
            sx={{
              width: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pl: 2,
              pr: 1,
            }}
          >
            <MuiTypography variant="h6">{t("dashboard.settings.settings")}</MuiTypography>
            <MuiIconButton size="large" color="inherit" onClick={resetSettings}>
              <MuiBadge variant={isSettingsChanged ? "dot" : "standard"} color="error">
                <Icon icon="solar:refresh-bold-duotone" />
              </MuiBadge>
            </MuiIconButton>
          </MuiBox>
        </MuiToolbar>
      </MuiAppBar>

      <MuiStack component="aside" direction="column" spacing={4} sx={{ py: 2, px: 1 }}>
        <SettingBlockThemeMode />
        <SettingBlockThemePalettes />
        <SettingBlockLanguages />
      </MuiStack>
    </MuiDrawer>
  );
};

const SettingBlockThemeMode = memo(() => {
  const { t } = useTranslation();

  const customThemeContextValue = useCustomThemesContextValue();
  const isDarkMode = !!customThemeContextValue?.isDarkMode;

  return (
    <MuiCard>
      <MuiCardActionArea onClick={customThemeContextValue?.toggleThemeMode}>
        <MuiCardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          <MuiBox sx={{ display: "flex", alignItems: "center" }}>
            <MuiTypography color="primary" sx={{ display: "flex" }}>
              <Icon
                icon={isDarkMode ? "solar:moon-bold-duotone" : "solar:sun-2-bold-duotone"}
                width={24}
              />
            </MuiTypography>
            <MuiTypography variant="subtitle2" sx={{ ml: 2 }}>
              {isDarkMode ? t("dashboard.settings.dark-mode") : t("dashboard.settings.light-mode")}
            </MuiTypography>
          </MuiBox>

          <MuiSwitch color="primary" checked={isDarkMode} />
        </MuiCardContent>
      </MuiCardActionArea>
    </MuiCard>
  );
});

const SettingBlockThemePalettes = memo(() => {
  const customThemeContextValue = useCustomThemesContextValue();
  const isDarkMode = !!customThemeContextValue?.isDarkMode;

  const checkIsSelected = useCallback(
    (colorName: CustomThemePaletteColorName): boolean =>
      customThemeContextValue?.themePaletteName === colorName,
    [customThemeContextValue],
  );

  return (
    <MuiGrid container spacing={1}>
      {CustomThemePaletteColorOptions.map(({ name, palette: { primary: primaryColor } }) => {
        const isSelected = checkIsSelected(name);
        const changePaletteColor = () => customThemeContextValue?.changeThemePaletteColor(name);
        return (
          <MuiGrid key={name} size={4}>
            <MuiCard>
              <MuiCardActionArea onClick={changePaletteColor}>
                <MuiCardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 80,
                    width: 1,
                    backgroundColor: alpha(
                      primaryColor[isDarkMode ? "light" : "main"],
                      isSelected ? 0.2 : 0,
                    ),
                    color: alpha(
                      primaryColor[isDarkMode ? "light" : "main"],
                      isSelected ? 0.9 : 0.4,
                    ),
                  }}
                >
                  <Icon icon="solar:siderbar-bold-duotone" width={40} />
                </MuiCardContent>
              </MuiCardActionArea>
            </MuiCard>
          </MuiGrid>
        );
      })}
    </MuiGrid>
  );
});

const SettingBlockLanguages = memo(() => {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <MuiGrid container spacing={1}>
      {I18nSupportedLanguages.map((lang) => {
        const isSelected: boolean = lang === currentLanguage;
        return (
          <MuiGrid key={lang} size={4}>
            <MuiCard>
              <MuiCardActionArea onClick={() => changeLanguage(lang)}>
                <MuiCardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 80,
                    width: 1,
                    backgroundColor: ({ palette }) =>
                      alpha(palette.primary[isSelected ? "light" : "main"], isSelected ? 0.2 : 0),
                  }}
                >
                  <MuiAvatar
                    alt={lang}
                    src={`/images/country-flags/${formatI18nLanguageToCountryCode(lang)}.webp`}
                  />
                </MuiCardContent>
              </MuiCardActionArea>
            </MuiCard>
          </MuiGrid>
        );
      })}
    </MuiGrid>
  );
});

export default memo(DashboardLayoutSettingDrawer);
