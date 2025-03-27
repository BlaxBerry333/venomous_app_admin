import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense, useCallback } from "react";

import type { Workflows, WorkflowsFormValue } from "~/app/features/workflows/_types";
import { useNodeUpdate } from "~/app/features/workflows/workflow-playground//_hooks/core";
import { NodeWrapper } from "~/app/features/workflows/workflow-playground/custom-nodes/_node-wrapper";
import { toast } from "~/ui/components";
import { type FormValueType } from "./MessageNodeDetailForm";

const MessageNodeDetailForm = lazy(() => import("./MessageNodeDetailForm"));

type MessageNodeProps = Workflows.NodeProps<WorkflowsFormValue.MessageNode>;

const MessageNode: NamedExoticComponent<MessageNodeProps> = memo((props) => {
  const { id, data } = props;
  const formValue = data?.formValue;

  const { updateSpecificNodeFormValue } = useNodeUpdate();

  const handleSubmit = useCallback(
    (formValue: FormValueType) => {
      updateSpecificNodeFormValue(id, formValue);
      toast.success(`#${id} 表单更新成功`);
    },
    [id, updateSpecificNodeFormValue],
  );

  return (
    <NodeWrapper
      {...props}
      portalDetailContent={
        <Suspense fallback={null}>
          <MessageNodeDetailForm nodeId={id} defaultValues={formValue} onSubmit={handleSubmit} />
        </Suspense>
      }
    />
  );
});

export default MessageNode;
