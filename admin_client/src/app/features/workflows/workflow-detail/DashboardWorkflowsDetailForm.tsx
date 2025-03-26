import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RHF, useRHFValueIsEqual } from "~/ui/components";
import { detailFormSchemas, WORKFLOW_DETAIL_FORM } from "./_helpers";
import type { DetailFormValueType } from "./_helpers/form-schema";

export type FormValueType = DetailFormValueType;

const DashboardWorkflowsDetailForm: NamedExoticComponent<{
  defaultValues?: FormValueType;
  isLoading?: boolean;
  onSubmit: (formValue: FormValueType) => Promise<void>;
}> = memo(
  ({
    defaultValues = WORKFLOW_DETAIL_FORM.DEFAULT_DETAIL_FORM_VALUE,
    isLoading = false,
    onSubmit,
  }) => {
    const formInstance = useForm<FormValueType>({
      resolver: zodResolver(detailFormSchemas),
      defaultValues,
      mode: "all",
    });

    const { isNothingChanged } = useRHFValueIsEqual({ defaultValues, formInstance });

    return (
      <RHF.FormWithZod
        hideDevTool
        instance={formInstance}
        zodSchema={detailFormSchemas}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Name */}
        <RHF.Text fullWidth name="name" label="名称" placeholder="4+ characters" sx={{ mb: 1 }} />

        {/* Description */}
        <RHF.Text
          fullWidth
          name="description"
          label="简介"
          placeholder="4+ characters"
          multiline
          minRows={4}
          maxRows={4}
          sx={{ mb: 1 }}
        />

        {/* IsActive */}
        <RHF.Switch name="is_active" endLabel="启动中" sx={{ mb: 1 }} />

        {/* Action Buttons */}
        <RHF.Action
          isLoading={isLoading}
          disabledSubmit={isNothingChanged}
          resetButtonText="重置"
          submitButtonText="提交"
          sx={{ mt: 6 }}
        />
      </RHF.FormWithZod>
    );
  },
);

export default DashboardWorkflowsDetailForm;
