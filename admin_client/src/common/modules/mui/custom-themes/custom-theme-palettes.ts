import type { PaletteColor as MuiPaletteColor } from "@mui/material/styles";
import { darken, lighten } from "@mui/material/styles";

export enum CustomThemePaletteColorName {
  Teal = "Teal",
  SkyBlue = "SkyBlue",
  BlueGrey = "BlueGrey",
  Amber = "Amber",
  Indigo = "Indigo",
  Brown = "Brown",
}

export type CustomThemePaletteColorOptionType = {
  name: CustomThemePaletteColorName;
  palette: {
    primary: MuiPaletteColor;
  };
};

export const CustomThemePaletteColorOptions: Array<CustomThemePaletteColorOptionType> = [
  {
    name: CustomThemePaletteColorName.Teal,
    palette: {
      primary: {
        main: "#00796b",
        light: lighten("#00796b", 0.3),
        dark: darken("#00796b", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.SkyBlue,
    palette: {
      primary: {
        main: "#0097a7",
        light: "#4fb3bf",
        dark: "#006978",
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.BlueGrey,
    palette: {
      primary: {
        main: "#607d8b",
        light: lighten("#607d8b", 0.2),
        dark: darken("#607d8b", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.Amber,
    palette: {
      primary: {
        main: "#ff9800",
        light: lighten("#ff9800", 0.2),
        dark: "#f57c00",
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.Indigo,
    palette: {
      primary: {
        main: "#3949ab",
        light: lighten("#3949ab", 0.3),
        dark: "#1c287d",
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.Brown,
    palette: {
      primary: {
        main: "#795548",
        light: lighten("#795548", 0.2),
        dark: darken("#795548", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
];
