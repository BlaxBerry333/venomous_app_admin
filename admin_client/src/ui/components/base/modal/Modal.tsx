import type { NamedExoticComponent, PropsWithChildren, ReactNode } from "react";
import { memo, useCallback, useState } from "react";

import MuiDialog, { type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";

import ModalActions, { type ModalActionsProps } from "./ModalActions";

export type ModalProps = PropsWithChildren<
  Omit<MuiDialogProps, "open" | "onClose" | "content"> &
    Omit<ModalActionsProps, "isCustomActions"> & {
      isOpen: boolean;
      escapeKeyDown?: boolean;
      title?: string;
      content?: ReactNode;
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
    content,
    ...props
  }) => {
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
            <MuiDialogContentText sx={{ color: "text.secondary" }}>{content}</MuiDialogContentText>
          )}
        </MuiDialogContent>

        {/* Actions */}
        {!children && (
          <ModalActions
            isCustomActions={false}
            closeModal={closeModal}
            isConfirmLoading={isConfirmLoading}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            cancelText={cancelText}
            confirmText={confirmText}
          />
        )}
      </MuiDialog>
    );
  },
);

export default Modal;

// ----------------------------------------------------------------------------------------------------

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
