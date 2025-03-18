import type { NamedExoticComponent } from "react";
import { memo } from "react";

import type { WorkflowsFormValue } from "~/app/features/workflows/_types";
import { RHF } from "~/ui/components";
import { DEFAULT_FORM_VALUE, formSchemas } from "./_helpers";

export type FormValueType = WorkflowsFormValue.MessageNode;

const MessageNodeDetail: NamedExoticComponent<{
  defaultValues?: FormValueType;
  onSubmit: (formValue: FormValueType) => void;
}> = memo(({ defaultValues = DEFAULT_FORM_VALUE, onSubmit }) => {
  return (
    <RHF.FormWithZod
      hideDevTool
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
