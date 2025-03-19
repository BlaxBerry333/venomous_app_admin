import type { Components as MuiComponents, Theme as MuiTheme } from "@mui/material/styles";

export const MuiOverrideComponentsOptions: MuiComponents<Omit<MuiTheme, "components">> = {
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
    },
  },

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

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        padding: "0px",
      },
    },
  },

  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: "0px",
      },
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: "0px",
      },
    },
  },

  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: "0px",
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: "8px",
        padding: "0px",
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
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.119), rgba(255, 255, 255, 0.119));",
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
