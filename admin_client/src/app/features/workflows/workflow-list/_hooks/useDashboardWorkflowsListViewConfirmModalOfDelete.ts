import { useCallback, useMemo } from "react";

import { useModal } from "~/ui/components";
import { sleep } from "~/utils/custom/process";

export default function useDashboardWorkflowsListViewConfirmModalOfDelete({
  setSelectedId,
}: {
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const confirmModalOfRemove = useModal();

  const isOpenConfirmModalOfRemove = useMemo<boolean>(
    () => confirmModalOfRemove.isOpen,
    [confirmModalOfRemove],
  );

  const handleOpenConfirmModalOfRemove = useCallback(
    (id: string) => () => {
      setSelectedId(id);
      confirmModalOfRemove.handleOpen();
    },
    [confirmModalOfRemove, setSelectedId],
  );

  const handleCloseConfirmModalOfRemove = useCallback(async () => {
    confirmModalOfRemove.handleClose();
    await sleep(200);
    setSelectedId(null);
    confirmModalOfRemove.handleClose();
  }, [confirmModalOfRemove, setSelectedId]);

  return {
    isOpenConfirmModalOfRemove,
    handleOpenConfirmModalOfRemove,
    handleCloseConfirmModalOfRemove,
  };
}
