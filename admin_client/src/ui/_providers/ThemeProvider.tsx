import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiCssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";

import { useThemeInitialization, useThemePalettesUpdate } from "../_hooks";

const ThemeProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const { theme } = useThemeInitialization();

  useThemePalettesUpdate(theme.palette);

  return (
    <MuiThemeProvider theme={theme}>
      <MuiCssBaseline />
      {children}
    </MuiThemeProvider>
  );
});

export default ThemeProvider;
