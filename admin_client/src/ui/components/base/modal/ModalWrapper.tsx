import type { NamedExoticComponent, ReactNode } from "react";
import { memo } from "react";

import Modal, { useModal, type ModalProps } from "./Modal";

type ModalWrapperProps = Omit<ModalProps, "isOpen" | "closeModal"> & {
  renderModalTrigger?: (params: ReturnType<typeof useModal>) => ReactNode;
  renderModalContent?: (params: ReturnType<typeof useModal>) => ReactNode;
};

const ModalWrapper: NamedExoticComponent<ModalWrapperProps> = memo(
  ({ renderModalTrigger, renderModalContent, title, message, ...props }) => {
    const modal = useModal();

    return (
      <>
        {/* Modal Trigger */}
        {renderModalTrigger?.(modal)}

        <Modal
          isOpen={modal.isOpen}
          closeModal={modal.handleClose}
          title={title}
          message={message}
          {...props}
        >
          {renderModalContent?.(modal)}
        </Modal>
      </>
    );
  },
);

export default ModalWrapper;
