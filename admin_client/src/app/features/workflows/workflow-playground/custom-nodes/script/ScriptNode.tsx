import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense, useCallback } from "react";

import type { Workflows, WorkflowsFormValue } from "~/app/features/workflows/_types";
import { useNodeUpdate } from "~/app/features/workflows/workflow-playground//_hooks/core";
import { NodeWrapper } from "~/app/features/workflows/workflow-playground/custom-nodes/_node-wrapper";
import { toast } from "~/ui/components";
import type { FormValueType } from "./ScriptNodeDetailForm";

const ScriptNodeDetailForm = lazy(() => import("./ScriptNodeDetailForm"));

type ScriptNodeProps = Workflows.NodeProps<WorkflowsFormValue.ScriptNode>;

const ScriptNode: NamedExoticComponent<ScriptNodeProps> = memo((props) => {
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
          <ScriptNodeDetailForm nodeId={id} defaultValues={formValue} onSubmit={handleSubmit} />
        </Suspense>
      }
    />
  );
});

export default ScriptNode;
