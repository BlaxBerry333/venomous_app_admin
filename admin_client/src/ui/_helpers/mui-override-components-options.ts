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
        padding: "8px 16px",
      },
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: "8px 16px",
      },
    },
  },

  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: "8px 16px",
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
