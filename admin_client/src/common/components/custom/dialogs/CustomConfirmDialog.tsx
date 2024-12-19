import type { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import type { NamedExoticComponent, ReactNode } from "react";

import { memo } from "react";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiButton from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";

type CustomConfirmDialogProps = {
  MuiDialogProps?: Omit<MuiDialogProps, "open" | "onClose" | "onOpen">;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  title: ReactNode;
  content: ReactNode;
  cancelText?: string;
  confirmText?: string;
  disabledConfirm?: boolean;
  isConfirming?: boolean;
};

const CustomConfirmDialog: NamedExoticComponent<CustomConfirmDialogProps> = memo(
  ({
    MuiDialogProps,
    isOpen,
    onClose,
    onOpen,
    title,
    content,
    cancelText,
    confirmText,
    isConfirming = false,
    disabledConfirm = false,
  }) => {
    return (
      <MuiDialog
        open={isOpen}
        onClose={undefined}
        disableEscapeKeyDown
        maxWidth="sm"
        fullWidth
        {...MuiDialogProps}
      >
        <MuiDialogTitle>{title}</MuiDialogTitle>

        <MuiDialogContent dividers={false}>
          <MuiTypography component="div">{content}</MuiTypography>
        </MuiDialogContent>

        <MuiDialogActions sx={{ py: 2 }}>
          <MuiButton variant="outlined" size="large" color="error" onClick={onClose}>
            {cancelText || "Cancel"}
          </MuiButton>
          <MuiLoadingButton
            size="large"
            loading={isConfirming}
            disabled={disabledConfirm}
            onClick={onOpen}
          >
            {confirmText || "Confirm"}
          </MuiLoadingButton>
        </MuiDialogActions>
      </MuiDialog>
    );
  },
);

export default CustomConfirmDialog;
