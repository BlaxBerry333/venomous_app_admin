import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Modal } from "~/ui/components";
import { usePlaygroundActionStatusStore, usePlaygroundSelectedNodeStore } from "../_hooks";

const PlaygroundDeleteConfirmModal: NamedExoticComponent = memo(() => {
  const { selectedNode } = usePlaygroundSelectedNodeStore();

  const { isOpenNodeDeleteConfirmModal, closeNodeDeleteConfirmModal } =
    usePlaygroundActionStatusStore();

  return (
    <Modal
      escapeKeyDown
      isOpen={isOpenNodeDeleteConfirmModal}
      closeModal={closeNodeDeleteConfirmModal}
      handleConfirm={async (closeModal) => {
        console.log("delete");
        closeModal();
      }}
      title={`Delete Node #${selectedNode?.id}`}
      message="Are you sure you want to delete this node?"
      cancelText="Cancel"
      confirmText="Delete"
    />
  );
});

export default PlaygroundDeleteConfirmModal;
