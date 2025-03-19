import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { WorkflowsFormValue } from "~/app/features/workflows/_types";
import { RHF } from "~/ui/components";
import { formSchemas, MESSAGE_NODE_FORM } from "./_helpers";

import { useNodeUpdateFormInvalid } from "~/app/features/workflows/workflow-playground/_hooks/core";

export type FormValueType = WorkflowsFormValue.MessageNode;

const MessageNodeDetail: NamedExoticComponent<{
  nodeId: string;
  defaultValues?: FormValueType;
  onSubmit: (formValue: FormValueType) => void;
}> = memo(({ nodeId, defaultValues = MESSAGE_NODE_FORM.DEFAULT_FORM_VALUE, onSubmit }) => {
  const formInstance = useForm<FormValueType>({
    resolver: zodResolver(formSchemas),
    defaultValues,
    mode: "all",
  });

  useNodeUpdateFormInvalid(nodeId, !formInstance.formState.isValid);

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
      <RHF.Action isLoading={false} />
    </RHF.FormWithZod>
  );
});

export default MessageNodeDetail;
