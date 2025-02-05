import { lazy, memo, Suspense, useCallback, type NamedExoticComponent } from "react";

import { toast } from "~/common/components/custom/snackbar";
import useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import type { Nullable } from "~/common/types/tools";
import { useDeleteWorkflowData } from "~/services/apis-hooks/workflow";

const CustomConfirmDialog = lazy(
  () => import("~/common/components/custom/dialogs/CustomConfirmDialog"),
);

const WorkflowCardDeleteConfirmDialog: NamedExoticComponent<{
  confirmDialog: ReturnType<typeof useBoolean>;
  selectedWorkflowId: Nullable<number>;
  clearSelectedWorkflowId: VoidFunction;
}> = memo(({ confirmDialog, selectedWorkflowId, clearSelectedWorkflowId }) => {
  const { t } = useTranslation();

  const closeDialog = useCallback((): void => {
    confirmDialog.setFalse();
    clearSelectedWorkflowId();
  }, [confirmDialog, clearSelectedWorkflowId]);

  const { mutateAsync: deleteWorkflowAsync, isPending: isDeleteWorkflowDataLoading } =
    useDeleteWorkflowData(String(selectedWorkflowId));

  const handleConfirmSave = useCallback(async () => {
    try {
      await deleteWorkflowAsync();
      toast.success(t("common.snackbar.delete-success"));
    } catch {
      toast.success(t("common.snackbar.delete-failed"));
    } finally {
      closeDialog();
    }
  }, [deleteWorkflowAsync, closeDialog, t]);

  return (
    <Suspense>
      <CustomConfirmDialog
        isOpen={confirmDialog.value}
        onClose={closeDialog}
        onConfirm={handleConfirmSave}
        isConfirming={isDeleteWorkflowDataLoading}
        title={t("common.tooltips.confirm-delete")}
        confirmText={t("common.buttons.delete")}
        content={null}
      />
    </Suspense>
  );
});

export default WorkflowCardDeleteConfirmDialog;
