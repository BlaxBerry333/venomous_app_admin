import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useNodeFormValueValidation } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { RHF, useRHFValueIsEqual } from "~/ui/components";
import { formSchemas, MESSAGE_NODE_FORM, type FormValueType } from "./_helpers";

export { type FormValueType } from "./_helpers";

const MessageNodeDetailForm: NamedExoticComponent<{
  nodeId: string;
  defaultValues?: FormValueType;
  onSubmit: (formValue: FormValueType) => void;
}> = memo(({ nodeId, defaultValues = MESSAGE_NODE_FORM.DEFAULT_FORM_VALUE, onSubmit }) => {
  const formInstance = useForm<FormValueType>({
    resolver: zodResolver(formSchemas),
    defaultValues,
    mode: "all",
  });

  useNodeFormValueValidation({ nodeId, formInstance });

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
        label="Description"
        placeholder="4+ characters"
        multiline
        minRows={2}
        maxRows={2}
      />

      {/* Message */}
      <RHF.Text
        fullWidth
        name="message"
        label="Message"
        placeholder="4+ characters"
        multiline
        minRows={10}
        maxRows={10}
      />

      {/* Action Buttons */}
      <RHF.Action isLoading={false} disabledSubmit={isNothingChanged} />
    </RHF.FormWithZod>
  );
});

export default MessageNodeDetailForm;
