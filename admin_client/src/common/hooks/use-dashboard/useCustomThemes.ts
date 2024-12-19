import { useCallback, useEffect, useMemo, useState } from "react";

import { isEqual } from "lodash-es";

import {
  CustomThemeModeType,
  CustomThemePaletteColorName,
  CustomThemePaletteColorOptions,
  type CustomThemePaletteColorOptionType,
} from "~/common/modules/mui/custom-themes";
import { checkIsSystemDarkMode } from "~/common/utils/handle-system-dark-mode";
import { getLocalStorageItem, setLocalStorageItem } from "~/common/utils/handle-web-storage";

const STORAGE_KEY_THEME_MODE = "__VENOMOUS_APP__THEME_MODE";
const STORAGE_KEY_THEME_PALETTE_COLOR_OPTIONS = "__VENOMOUS_APP__THEME_PALETTE_COLOR_OPTIONS";

export default function useCustomThemes() {
  const defaultPaletteColorOptions = CustomThemePaletteColorOptions[0];

  const systemThemeMode = checkIsSystemDarkMode()
    ? CustomThemeModeType.dark
    : CustomThemeModeType.light;

  const _storedThemeMode = getLocalStorageItem<CustomThemeModeType>(
    STORAGE_KEY_THEME_MODE,
    systemThemeMode,
  ) as CustomThemeModeType;

  const _storedPaletteColorOptions = getLocalStorageItem<CustomThemePaletteColorOptionType>(
    STORAGE_KEY_THEME_PALETTE_COLOR_OPTIONS,
    defaultPaletteColorOptions,
  ) as CustomThemePaletteColorOptionType;

  // ----------------------------------------------------------------------------------------------------

  const initialThemeMode = Object.values(CustomThemeModeType).includes(_storedThemeMode)
    ? _storedThemeMode
    : systemThemeMode;

  const initialPaletteColorOptions = CustomThemePaletteColorOptions.find(
    ({ name }) => name === _storedPaletteColorOptions.name,
  )
    ? _storedPaletteColorOptions
    : CustomThemePaletteColorOptions[0];

  // ----------------------------------------------------------------------------------------------------

  const [themeMode, setThemeMode] = useState<CustomThemeModeType>(initialThemeMode);
  const [themePaletteColorOptions, setThemePaletteColorOptions] =
    useState<CustomThemePaletteColorOptionType>(initialPaletteColorOptions);

  const isThemeValuesChanged = useMemo<boolean>(() => {
    return !(
      isEqual(systemThemeMode, themeMode) &&
      isEqual(defaultPaletteColorOptions, themePaletteColorOptions)
    );
  }, [systemThemeMode, themeMode, defaultPaletteColorOptions, themePaletteColorOptions]);

  // ----------------------------------------------------------------------------------------------------

  const toggleThemeMode = useCallback(() => {
    setThemeMode((s) =>
      s === CustomThemeModeType.dark ? CustomThemeModeType.light : CustomThemeModeType.dark,
    );
  }, [setThemeMode]);

  const changeThemePaletteColor = useCallback(
    (themePaletteColorName: CustomThemePaletteColorName) => {
      const targetOption = CustomThemePaletteColorOptions.find(
        ({ name }) => name === themePaletteColorName,
      );
      if (targetOption) {
        setThemePaletteColorOptions(targetOption);
      }
    },
    [setThemePaletteColorOptions],
  );

  const resetThemeValues = useCallback(() => {
    setThemeMode(systemThemeMode);
    setThemePaletteColorOptions(defaultPaletteColorOptions);
  }, [systemThemeMode, defaultPaletteColorOptions]);

  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    setLocalStorageItem(STORAGE_KEY_THEME_MODE, themeMode);
    setLocalStorageItem(STORAGE_KEY_THEME_PALETTE_COLOR_OPTIONS, themePaletteColorOptions);
  }, [themeMode, themePaletteColorOptions]);

  // ----------------------------------------------------------------------------------------------------

  return {
    themeMode: themeMode,
    setThemeMode,
    themePaletteColorOptions,
    setThemePaletteColorOptions,
    toggleThemeMode,
    changeThemePaletteColor,

    isThemeValuesChanged,
    resetThemeValues,

    defaultPaletteColorOptions,
    systemThemeMode,
    initialThemeMode,
    initialPaletteColorOptions,
  };
}
