import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FileUpload, RHF, useRHFValueIsEqual } from "~/ui/components";
import { IWorkflowDataType } from "~/utils/libs/apis/types/_workflow";
import { createFormSchemas, WORKFLOW_DETAIL_FORM } from "./_helpers";
import type { CreateFormValueType } from "./_helpers/form-schema";

export type FormValueType = CreateFormValueType;

const DashboardWorkflowsCreateForm: NamedExoticComponent<{
  defaultValues?: FormValueType;
  isLoading?: boolean;
  onSubmit: (formValue: FormValueType) => Promise<void>;
}> = memo(
  ({
    defaultValues = WORKFLOW_DETAIL_FORM.DEFAULT_CREATE_FORM_VALUE,
    isLoading = false,
    onSubmit,
  }) => {
    const formInstance = useForm<FormValueType>({
      resolver: zodResolver(createFormSchemas),
      defaultValues,
      mode: "all",
    });

    const { isNothingChanged } = useRHFValueIsEqual({ defaultValues, formInstance });

    return (
      <RHF.FormWithZod
        hideDevTool
        instance={formInstance}
        zodSchema={createFormSchemas}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Name */}
        <RHF.Text fullWidth name="name" label="名称" placeholder="4+ characters" sx={{ mb: 1 }} />

        {/* Type */}
        <RHF.Select
          fullWidth
          name="type"
          label="类型"
          options={WORKFLOW_DETAIL_FORM.TYPE_SELECT_OPTIONS}
          sx={{ mb: 1 }}
        />

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

        {/* Logic Type File Upload */}
        {formInstance.watch("type") === IWorkflowDataType.Logic && (
          <FileUpload label="上传本地文件" sx={{ width: { xs: 1, sm: "100px" } }} />
        )}

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

export default DashboardWorkflowsCreateForm;
