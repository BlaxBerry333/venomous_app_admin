import { useMemo } from "react";

import type { Theme as MuiTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import { MuiOverrideComponentsOptions, ThemePaletteColors } from "../_helpers";
import useThemeStore from "./useThemeStore";

export default function useThemeInitialization() {
  const { mode, paletteColorName } = useThemeStore();

  const paletteColors = useMemo(() => {
    const palette = ThemePaletteColors.find((p) => p.name === paletteColorName);
    const paletteColors = palette ? palette.colors : ThemePaletteColors[0].colors;
    return paletteColors;
  }, [paletteColorName]);

  const theme = useMemo<MuiTheme>(() => {
    return createTheme({
      palette: {
        mode,
        primary: paletteColors.primary,
      },
      components: MuiOverrideComponentsOptions,
    });
  }, [mode, paletteColors]);

  return { theme };
}
