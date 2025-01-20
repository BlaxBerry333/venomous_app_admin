import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CustomForm, CustomFormField } from "~/common/components/custom/form-fields";
import { toast } from "~/common/components/custom/snackbar";
import useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import { useCreteWorkflowData } from "~/services/apis-hooks/workflow";
import { formSchema, type WorkflowCreateFormValueType } from "./schemas/workflow-data-schema";

const defaultFormValues: WorkflowCreateFormValueType = {
  name: "",
  description: "",
  is_active: false,
  is_draft: true,
};

const CustomConfirmDialog = lazy(
  () => import("~/common/components/custom/dialogs/CustomConfirmDialog"),
);

const WorkflowCardCreateDialog: NamedExoticComponent<{
  confirmDialog: ReturnType<typeof useBoolean>;
}> = memo(({ confirmDialog }) => {
  const { t } = useTranslation();

  const { mutateAsync: createWorkflowData, isPending: isCreateWorkflowDataLoading } =
    useCreteWorkflowData();

  const form = useForm<WorkflowCreateFormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
    mode: "all",
  });

  const { getValues, reset } = form;

  const isDisabledSubmit: boolean = !form.formState.isValid || isCreateWorkflowDataLoading;

  const handleFormSubmit = useCallback(async () => {
    try {
      const formValue = getValues();
      await createWorkflowData(formValue);
      toast.success(t("common.snackbar.create-success"));
      reset();
    } catch (error) {
      toast.success(t("common.snackbar.create-failed"));
    } finally {
      confirmDialog.setFalse();
    }
  }, [createWorkflowData, confirmDialog, getValues, reset]);

  return (
    <Suspense>
      <CustomConfirmDialog
        isOpen={confirmDialog.value}
        onClose={confirmDialog.setFalse}
        onConfirm={handleFormSubmit}
        disabledConfirm={isDisabledSubmit}
        isConfirming={isCreateWorkflowDataLoading}
        title={undefined}
        confirmText={t("common.buttons.create")}
        content={
          <CustomForm<WorkflowCreateFormValueType> form={form} onSubmit={handleFormSubmit}>
            <CustomFormField.Text name="name" label={t("workflow.workflow-data.name")} />
            <CustomFormField.Textarea
              name="description"
              label={t("workflow.workflow-data.description")}
            />
          </CustomForm>
        }
      />
    </Suspense>
  );
});

export default WorkflowCardCreateDialog;
