import type { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import type { NamedExoticComponent, ReactNode } from "react";

import { memo, useMemo } from "react";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiButton from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";
import useTranslation from "~/common/hooks/useTranslation";

type CustomConfirmDialogProps = {
  isRelativeDialog?: boolean;
  MuiDialogProps?: Omit<MuiDialogProps, "open" | "onClose" | "onOpen">;
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  title: ReactNode;
  content: ReactNode;
  cancelText?: string;
  confirmText?: string;
  disabledConfirm?: boolean;
  disableCancel?: boolean;
  isConfirming?: boolean;
};

const CustomConfirmDialog: NamedExoticComponent<CustomConfirmDialogProps> = memo(
  ({
    isRelativeDialog = false,
    MuiDialogProps,
    isOpen,
    onClose,
    onConfirm,
    title,
    content,
    cancelText,
    confirmText,
    isConfirming = false,
    disabledConfirm = false,
    disableCancel = false,
  }) => {
    const { t } = useTranslation();

    // ----------------------------------------------------------------------------------------------------

    const commonDialogContent = useMemo(
      () => (
        <>
          {/* title */}
          <MuiDialogTitle variant="h4">{title}</MuiDialogTitle>
          {/* content */}
          <MuiDialogContent
            dividers={false}
            sx={{
              display: !content ? "none" : "block",
              py: 0,
              mt: 1,
            }}
          >
            <MuiTypography component="div" variant="body2">
              {content}
            </MuiTypography>
          </MuiDialogContent>
          {/* actions */}
          <MuiDialogActions sx={{ p: 2 }}>
            <MuiButton variant="outlined" color="error" disabled={disableCancel} onClick={onClose}>
              {cancelText || t("common.buttons.cancel")}
            </MuiButton>
            <MuiLoadingButton loading={isConfirming} disabled={disabledConfirm} onClick={onConfirm}>
              {confirmText || t("common.buttons.confirm")}
            </MuiLoadingButton>
          </MuiDialogActions>
        </>
      ),
      [
        isConfirming,
        disabledConfirm,
        disableCancel,
        onClose,
        onConfirm,
        cancelText,
        confirmText,
        title,
        content,
        t,
      ],
    );

    // ----------------------------------------------------------------------------------------------------

    if (!isRelativeDialog) {
      return (
        <MuiDialog
          open={isOpen}
          onClose={undefined}
          disableEscapeKeyDown
          maxWidth="sm"
          fullWidth
          {...MuiDialogProps}
        >
          {commonDialogContent}
        </MuiDialog>
      );
    }

    return (
      <MuiCard
        sx={{
          display: isOpen ? "block" : "none",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 2,
          width: { xs: "90%", sm: "600px" },
        }}
      >
        {commonDialogContent}
      </MuiCard>
    );
  },
);

export default CustomConfirmDialog;
