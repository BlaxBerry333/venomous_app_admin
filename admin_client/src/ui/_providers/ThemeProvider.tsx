import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiCssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";

import { useThemesSetup } from "../_hooks";

const ThemeProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const { theme } = useThemesSetup();

  return (
    <MuiThemeProvider theme={theme}>
      <MuiCssBaseline />
      {children}
    </MuiThemeProvider>
  );
});

export default ThemeProvider;
