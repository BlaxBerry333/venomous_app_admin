import type { NamedExoticComponent, ReactNode } from "react";
import { memo, useCallback, useState } from "react";

import MuiDialog, { type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { Button, ButtonVariant } from "../button";

type ModalProps = Omit<MuiDialogProps, "open" | "onClose"> & {
  renderModalTrigger?: (params: ReturnType<typeof useModal>) => ReactNode;
  renderModalContent?: (params: ReturnType<typeof useModal>) => ReactNode;
  escapeKeyDown?: boolean;
  isConfirmLoading?: boolean;
  handleOnCancel?: VoidFunction;
  handleOnConfirm?: (callback: VoidFunction) => Promise<void>;
  cancelText?: string;
  confirmText?: string;
  title?: string;
  message?: string;
};

const Modal: NamedExoticComponent<ModalProps> = memo(
  ({
    renderModalTrigger,
    renderModalContent,
    escapeKeyDown,
    isConfirmLoading = false,
    handleOnCancel,
    handleOnConfirm,
    cancelText = "Cancel",
    confirmText = "Confirm",
    title,
    message,
    ...props
  }) => {
    const modal = useModal();

    const handleCancel = useCallback(() => {
      handleOnCancel?.();
      modal.handleClose();
    }, [handleOnCancel, modal]);

    const handleConfirm = useCallback(async () => {
      await handleOnConfirm?.(modal.handleClose);
    }, [handleOnConfirm, modal.handleClose]);

    return (
      <>
        {/* Modal Trigger */}
        {renderModalTrigger?.(modal)}

        {/* Modal Content */}
        <MuiDialog
          open={modal.isOpen}
          onClose={escapeKeyDown || isConfirmLoading ? undefined : modal.handleClose}
          fullWidth
          maxWidth="sm"
          scroll="paper"
          {...props}
        >
          {/* Title */}
          <MuiDialogTitle sx={{ typography: "h6", fontWeight: "bold", pb: 0, px: 3 }}>
            {title}
          </MuiDialogTitle>

          {/* Main Content */}
          <MuiDialogContent sx={{ pt: "16px !important", px: 3 }}>
            {/* Custom Content */}
            {renderModalContent?.(modal)}

            {/* Default Content */}
            {!renderModalContent && (
              <MuiDialogContentText sx={{ color: "text.secondary" }}>
                {message}
              </MuiDialogContentText>
            )}
          </MuiDialogContent>

          {/* Actions */}
          {!renderModalContent && (
            <MuiDialogActions sx={{ pt: 0, pb: 2, px: 2 }}>
              <Button
                variant={ButtonVariant.OUTLINED}
                onClick={handleCancel}
                disabled={isConfirmLoading}
              >
                {cancelText}
              </Button>
              <Button isLoading={isConfirmLoading} onClick={handleConfirm}>
                {confirmText}
              </Button>
            </MuiDialogActions>
          )}
        </MuiDialog>
      </>
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
