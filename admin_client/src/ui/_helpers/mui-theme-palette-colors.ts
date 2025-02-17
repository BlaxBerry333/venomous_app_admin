import type { PaletteColor as MuiPaletteColor } from "@mui/material/styles";
import { darken, lighten } from "@mui/material/styles";

export enum ThemePaletteColorName {
  Teal = "Teal",
  SkyBlue = "SkyBlue",
  BlueGrey = "BlueGrey",
  Brown = "Brown",
  Wine = "Wine",
}

export const ThemePaletteColors: Array<{
  name: ThemePaletteColorName;
  colors: {
    primary: MuiPaletteColor;
    // success?: MuiPaletteColor;
    // error?: MuiPaletteColor;
    // warning?: MuiPaletteColor;
  };
}> = [
  {
    name: ThemePaletteColorName.Teal,
    colors: {
      primary: {
        main: "#009688",
        light: "#00bfa5",
        dark: darken("#009688", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: ThemePaletteColorName.SkyBlue,
    colors: {
      primary: {
        main: "#0097a7",
        light: "#4fb3bf",
        dark: "#006978",
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: ThemePaletteColorName.BlueGrey,
    colors: {
      primary: {
        main: "#607d8b",
        light: lighten("#607d8b", 0.2),
        dark: darken("#607d8b", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: ThemePaletteColorName.Brown,
    colors: {
      primary: {
        main: "#795548",
        light: lighten("#795548", 0.2),
        dark: darken("#795548", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: ThemePaletteColorName.Wine,
    colors: {
      primary: {
        main: "#9B1B30",
        light: lighten("#9B1B30", 0.2),
        dark: darken("#9B1B30", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
];
