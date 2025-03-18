import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import type { Workflows, WorkflowsFormValue } from "~/app/features/workflows/_types";
import { NodeWrapper } from "~/app/features/workflows/workflow-playground/custom-nodes/_node-wrapper";
import MessageNodeDetail, { type FormValueType } from "./MessageNodeDetail";

type MessageNodeProps = Workflows.NodeProps<WorkflowsFormValue.MessageNode>;

const MessageNode: NamedExoticComponent<MessageNodeProps> = memo((props) => {
  const { id, data } = props;
  const formValue = data?.formValue;

  const onSubmit = useCallback(
    (formValue: FormValueType) => {
      console.log(id, formValue);
    },
    [id],
  );

  return (
    <NodeWrapper
      {...props}
      portalDetailContent={<MessageNodeDetail defaultValues={formValue} onSubmit={onSubmit} />}
    />
  );
});

export default MessageNode;
