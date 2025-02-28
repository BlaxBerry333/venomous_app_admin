import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IsSystemDarkMode } from "~/utils/broswer";
import { UI_CONFIGS } from "../_configs";
import { ThemePaletteColorName } from "../_helpers";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export const DEFAULT_THEME_MODE = IsSystemDarkMode() ? ThemeMode.DARK : ThemeMode.LIGHT;

export const DEFAULT_PALETTE_COLOR_NAME = ThemePaletteColorName.BlueGrey;

/**
 * UI主题配色
 */
const useThemeStore = create<{
  mode: ThemeMode;
  paletteColorName: ThemePaletteColorName;
  setMode: (mode: ThemeMode) => void;
  setPaletteColorName: (name: ThemePaletteColorName) => void;
  toggleMode: () => void;
  reset: () => void;
}>()(
  devtools(
    persist(
      (set) => ({
        mode: DEFAULT_THEME_MODE,
        paletteColorName: DEFAULT_PALETTE_COLOR_NAME,

        setMode: (mode: ThemeMode) => {
          set({ mode });
        },
        setPaletteColorName: (paletteColorName: ThemePaletteColorName) => {
          set({ paletteColorName });
        },
        toggleMode: () => {
          set((state) => ({
            mode: state.mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
          }));
        },
        reset: () => {
          set({
            mode: DEFAULT_THEME_MODE,
            paletteColorName: DEFAULT_PALETTE_COLOR_NAME,
          });
        },
      }),
      {
        name: UI_CONFIGS.storeKeys.theme,
      },
    ),
  ),
);

export default useThemeStore;
