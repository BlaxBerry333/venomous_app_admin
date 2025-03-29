import type { RefObject } from "react";
import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from "react";

import { Modal, useModal, type ModalProps } from "~/ui/components";

type ModalRef = {
  open: () => void;
  close: () => void;
};

type ModalWithRefProps = Omit<ModalProps, "isOpen" | "closeModal">;

const ModalWithRef = memo(
  forwardRef<ModalRef, ModalWithRefProps>((props, ref) => {
    const modal = useModal();
    const { isOpen, handleOpen, handleClose } = modal;

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }));

    return <Modal escapeKeyDown isOpen={isOpen} closeModal={handleClose} {...props} />;
  }),
);

export default ModalWithRef;

// ----------------------------------------------------------------------------------------------------

export function useModalWithRefRef() {
  const ref: RefObject<ModalRef> = useRef<ModalRef>(null);
  const open = useCallback(() => ref.current?.open(), []);
  const close = useCallback(() => ref.current?.close(), []);
  return {
    ref,
    open,
    close,
  };
}
