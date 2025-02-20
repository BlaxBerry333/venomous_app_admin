import type { Components as MuiComponents, Theme as MuiTheme } from "@mui/material/styles";

export const MuiOverrideComponentsOptions: MuiComponents<Omit<MuiTheme, "components">> = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: "bold",
        minWidth: "unset",
        borderRadius: "8px",
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: "bold",
        minWidth: "unset",
        borderRadius: "8px",
      },
    },
  },

  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        padding: "4px",
      },
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: {
        borderRadius: "8px",
        padding: "4px",
      },
    },
  },
};
