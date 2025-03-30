import type { NamedExoticComponent } from "react";
import { memo, useCallback, useState } from "react";

import MuiDialogActions from "@mui/material/DialogActions";

import { Button, ButtonVariant } from "../button";

export type ModalActionsProps = {
  isCustomActions?: boolean;
  closeModal: VoidFunction;
  isConfirmLoading?: boolean;
  handleCancel?: (closeModal: VoidFunction) => void;
  handleConfirm?: (closeModal: VoidFunction) => Promise<void>;
  cancelText?: string;
  confirmText?: string;
};

const ModalActions: NamedExoticComponent<ModalActionsProps> = memo(
  ({
    isCustomActions = true,
    closeModal,
    isConfirmLoading = false,
    handleCancel: propsHandleCancel,
    handleConfirm: propsHandleConfirm,
    cancelText = "Cancel",
    confirmText = "Confirm",
  }) => {
    const handleCancel = useCallback(() => {
      propsHandleCancel?.(closeModal);
      closeModal();
    }, [propsHandleCancel, closeModal]);

    const handleConfirm = useCallback(async () => {
      await propsHandleConfirm?.(closeModal);
    }, [propsHandleConfirm, closeModal]);

    return (
      <MuiDialogActions
        sx={{
          ...(isCustomActions ? { p: 0, pt: 2 } : { pt: 0, pb: 2, px: 3 }),
        }}
      >
        <Button variant={ButtonVariant.OUTLINED} disabled={isConfirmLoading} onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button isLoading={isConfirmLoading} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </MuiDialogActions>
    );
  },
);

export default ModalActions;

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
