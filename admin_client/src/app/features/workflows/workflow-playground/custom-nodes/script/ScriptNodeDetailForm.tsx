import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useNodeFormValueValidation } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { RHF, useRHFValueIsEqual } from "~/ui/components";
import { formSchemas, SCRIPT_NODE_FORM, type FormValueType } from "./_helpers";

export { type FormValueType } from "./_helpers";

const ScriptNodeDetailForm: NamedExoticComponent<{
  nodeId: string;
  defaultValues?: FormValueType;
  onSubmit: (formValue: FormValueType) => void;
}> = memo(({ nodeId, defaultValues = SCRIPT_NODE_FORM.DEFAULT_FORM_VALUE, onSubmit }) => {
  const formInstance = useForm<FormValueType>({
    resolver: zodResolver(formSchemas),
    defaultValues,
    mode: "all",
  });

  useNodeFormValueValidation({ nodeId, defaultValues, formInstance });

  const { isNothingChanged } = useRHFValueIsEqual({ defaultValues, formInstance });

  return (
    <RHF.FormWithZod
      hideDevTool
      instance={formInstance}
      zodSchema={formSchemas}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Description */}
      <RHF.Text
        fullWidth
        name="description"
        label="简介"
        placeholder="4+ characters"
        multiline
        minRows={2}
        maxRows={2}
      />

      {/* Langugae */}
      <RHF.Select
        fullWidth
        name="language"
        label="语言"
        options={SCRIPT_NODE_FORM.DEFAULT_LANGUAG_OPTIONS}
        sx={{ mb: 4 }}
      />

      {/* Code */}
      <RHF.Text
        fullWidth
        name="code"
        label="代码"
        placeholder="4+ characters"
        multiline
        minRows={15}
        maxRows={15}
      />

      {/* Action Buttons */}
      <RHF.Action isLoading={false} disabledSubmit={isNothingChanged} />
    </RHF.FormWithZod>
  );
});

export default ScriptNodeDetailForm;
