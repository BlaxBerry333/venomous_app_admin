import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense, useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash-es";
import { useForm } from "react-hook-form";

import { CustomForm, CustomFormField } from "~/common/components/custom/form-fields";
import { toast } from "~/common/components/custom/snackbar";
import useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import type { Nullable } from "~/common/types/tools";
import { useUpdateWorkflowData } from "~/services/apis-hooks/workflow";
import { formSchema, type WorkflowEditFormValueType } from "./schemas/workflow-data-schema";

const CustomConfirmDialog = lazy(
  () => import("~/common/components/custom/dialogs/CustomConfirmDialog"),
);

const WorkflowCardEditDialog: NamedExoticComponent<{
  confirmDialog: ReturnType<typeof useBoolean>;
  selectedWorkflowId: Nullable<number>;
  workflowData: undefined | WorkflowEditFormValueType;
  clearSelectedWorkflowId: () => void;
}> = memo(({ confirmDialog, selectedWorkflowId, workflowData, clearSelectedWorkflowId }) => {
  const { t } = useTranslation();

  const closeDialog = useCallback((): void => {
    confirmDialog.setFalse();
    clearSelectedWorkflowId();
  }, [confirmDialog, clearSelectedWorkflowId]);

  const { mutateAsync: updateWorkflowData, isPending: isUpdateWorkflowDataLoading } =
    useUpdateWorkflowData(String(selectedWorkflowId));

  const form = useForm<WorkflowEditFormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: workflowData,
    mode: "all",
  });

  const { getValues, reset } = form;

  useEffect(() => {
    if (workflowData) {
      reset(workflowData);
    }
  }, [workflowData, reset]);

  const isDisabledSubmit: boolean = !form.formState.isValid || isUpdateWorkflowDataLoading;

  const handleFormSubmit = useCallback(async () => {
    try {
      const formValue = getValues();

      const nothingChanged: boolean = isEqual(workflowData, formValue);
      if (nothingChanged) {
        return;
      }

      await updateWorkflowData(formValue);
      toast.success(t("common.snackbar.update-success"));
    } catch {
      toast.success(t("common.snackbar.update-failed"));
    } finally {
      closeDialog();
    }
  }, [workflowData, updateWorkflowData, getValues, closeDialog, t]);

  return (
    <Suspense>
      <CustomConfirmDialog
        isOpen={confirmDialog.value}
        onClose={closeDialog}
        onConfirm={handleFormSubmit}
        disabledConfirm={isDisabledSubmit}
        isConfirming={isUpdateWorkflowDataLoading}
        title={t("common.tooltips.confirm-update")}
        content={
          <CustomForm<WorkflowEditFormValueType> form={form} onSubmit={handleFormSubmit}>
            <CustomFormField.Text name="name" label={t("workflow.workflow-data.name")} />
            <CustomFormField.Textarea
              name="description"
              label={t("workflow.workflow-data.description")}
            />
            <CustomFormField.Switch
              name="is_active"
              label={t("workflow.workflow-data.is_active")}
            />
            <CustomFormField.Switch name="is_draft" label={t("workflow.workflow-data.is_draft")} />
          </CustomForm>
        }
      />
    </Suspense>
  );
});

export default WorkflowCardEditDialog;
