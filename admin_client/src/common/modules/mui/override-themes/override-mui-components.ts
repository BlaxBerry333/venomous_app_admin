import type { Components as MuiComponents, Theme as MuiTheme } from "@mui/material/styles";

export const overrideMuiComponentsOptions: MuiComponents<Omit<MuiTheme, "components">> = {
  MuiAppBar: {
    styleOverrides: {
      root: { boxShadow: "none" },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: { textTransform: "capitalize", fontWeight: 600, minWidth: 80, borderRadius: 8 },
    },
    defaultProps: {
      variant: "contained",
    },
  },

  MuiCard: {
    styleOverrides: {
      root: { borderRadius: 8 },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: { borderRadius: 8 },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { marginTop: 8, marginBottom: 8, fontSize: "0.8em" },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: { borderRadius: 8, marginBottom: 4 },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: { minWidth: 32 },
    },
  },

  MuiListSubheader: {
    styleOverrides: {
      root: { backgroundColor: "transparent" },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: { borderRadius: 4, height: 6 },
    },
  },

  // @ts-expect-error: Temporarily using any type for MuiLoadingButton
  MuiLoadingButton: {
    styleOverrides: {
      root: { minWidth: 80 },
    },
    defaultProps: {
      variant: "contained",
      loadingPosition: "center",
    },
  },

  MuiPaper: {
    defaultProps: {
      elevation: 3,
    },
  },

  MuiStack: {
    defaultProps: {
      direction: "row",
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: { marginTop: 8 },
    },
    defaultProps: {
      autoComplete: "off",
      size: "small",
      variant: "outlined",
      fullWidth: true,
    },
  },
};
