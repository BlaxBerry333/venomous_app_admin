import type { TypographyOptions as MuiTypographyOptions } from "@mui/material/styles/createTypography";

export const overrideMuiTypographyOptions: MuiTypographyOptions = {
  fontWeightLight: "300",
  fontWeightRegular: "400",
  fontWeightMedium: "500",
  fontWeightBold: "700",
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: `${40 / 16}rem`,
    sm: { fontSize: `${52 / 16}rem` },
    md: { fontSize: `${58 / 16}rem` },
    lg: { fontSize: `${64 / 16}rem` },
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: `${32 / 16}rem`,
    sm: { fontSize: `${40 / 16}rem` },
    md: { fontSize: `${44 / 16}rem` },
    lg: { fontSize: `${48 / 16}rem` },
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: `${24 / 16}rem`,
    sm: { fontSize: `${26 / 16}rem` },
    md: { fontSize: `${30 / 16}rem` },
    lg: { fontSize: `${32 / 16}rem` },
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: `${20 / 16}rem`,
    sm: { fontSize: `${20 / 16}rem` },
    md: { fontSize: `${4 / 16}rem` },
    lg: { fontSize: `${24 / 16}rem` },
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: `${18 / 16}rem`,
    sm: { fontSize: `${19 / 16}rem` },
    md: { fontSize: `${20 / 16}rem` },
    lg: { fontSize: `${20 / 16}rem` },
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: `${17 / 16}rem`,
    sm: { fontSize: `${18 / 16}rem` },
    md: { fontSize: `${18 / 16}rem` },
    lg: { fontSize: `${18 / 16}rem` },
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: `${16 / 16}rem`,
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: `${14 / 16}rem`,
  },
  body1: {
    lineHeight: 1.5,
    fontSize: `${16 / 16}rem`,
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: `${14 / 16}rem`,
  },
  caption: {
    lineHeight: 1.5,
    fontSize: `${12 / 16}rem`,
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: `${12 / 16}rem`,
    textTransform: "uppercase",
  },
};
