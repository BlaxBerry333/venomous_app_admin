import { useContext, useMemo } from "react";

import { CustomThemeContext } from "~/common/components/providers/CustomMuiThemeProvider";
import { CustomThemeModeType } from "~/common/modules/mui/custom-themes";

export default function useCustomThemesContextValue() {
  const customThemeContextValue = useContext(CustomThemeContext);

  return useMemo(() => {
    if (!customThemeContextValue) {
      return null;
    }

    const {
      themeMode,
      themePaletteColorOptions,
      isThemeValuesChanged,
      resetThemeValues,
      toggleThemeMode,
      changeThemePaletteColor,
    } = customThemeContextValue;

    return {
      themeMode,
      isDarkMode: themeMode === CustomThemeModeType.dark,
      themePaletteName: themePaletteColorOptions.name,
      themePrimaryColor: themePaletteColorOptions.palette.primary,
      isThemeValuesChanged,

      resetThemeValues,
      toggleThemeMode,
      changeThemePaletteColor,
    };
  }, [customThemeContextValue]);
}
