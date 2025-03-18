import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useCallback, useState } from "react";

import MuiDialog, { type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";

import { Button, ButtonVariant } from "../button";

export type ModalProps = PropsWithChildren<
  Omit<MuiDialogProps, "open" | "onClose" | "content"> & {
    isOpen: boolean;
    closeModal: VoidFunction;
    escapeKeyDown?: boolean;
    isConfirmLoading?: boolean;
    handleCancel?: (closeModal: VoidFunction) => void;
    handleConfirm?: (closeModal: VoidFunction) => Promise<void>;
    cancelText?: string;
    confirmText?: string;
    title?: string;
    message?: string;
  }
>;

const Modal: NamedExoticComponent<ModalProps> = memo(
  ({
    children,
    isOpen,
    closeModal,
    escapeKeyDown = false,
    isConfirmLoading = false,
    handleCancel,
    handleConfirm,
    cancelText = "Cancel",
    confirmText = "Confirm",
    title,
    message,
    ...props
  }) => {
    const _handleCancel = useCallback(() => {
      handleCancel?.(closeModal);
      closeModal();
    }, [handleCancel, closeModal]);

    const _handleConfirm = useCallback(async () => {
      await handleConfirm?.(closeModal);
    }, [handleConfirm, closeModal]);

    return (
      <MuiDialog
        open={isOpen}
        onClose={escapeKeyDown || isConfirmLoading ? undefined : closeModal}
        fullWidth
        maxWidth="sm"
        scroll="paper"
        {...props}
      >
        {/* Title */}
        {title && (
          <MuiDialogTitle sx={{ typography: "h6", fontWeight: "bold", pb: 0, px: 3 }}>
            {title}
          </MuiDialogTitle>
        )}

        {/* Main Content */}
        <MuiDialogContent sx={{ pt: "16px !important", px: 3 }}>
          {/* Custom Content */}
          {children}

          {/* Default Content */}
          {!children && (
            <MuiDialogContentText sx={{ color: "text.secondary" }}>{message}</MuiDialogContentText>
          )}
        </MuiDialogContent>

        {/* Actions */}
        {!children && (
          <MuiDialogActions sx={{ pt: 0, pb: 2, px: 2 }}>
            <Button
              variant={ButtonVariant.OUTLINED}
              disabled={isConfirmLoading}
              onClick={_handleCancel}
            >
              {cancelText}
            </Button>
            <Button isLoading={isConfirmLoading} onClick={_handleConfirm}>
              {confirmText}
            </Button>
          </MuiDialogActions>
        )}
      </MuiDialog>
    );
  },
);

export default Modal;

export function useModal() {
  // const theme = useTheme();
  // const isFullScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    setIsOpen,
    handleOpen,
    handleClose,
  };
}
