import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense } from "react";

import type { Workflows, WorkflowsFormValue } from "~/app/features/workflows/_types";
import { NodeWrapper } from "~/app/features/workflows/workflow-playground/custom-nodes/_node-wrapper";

const ScriptNodeDetailForm = lazy(() => import("./ScriptNodeDetailForm"));

type ScriptNodeProps = Workflows.NodeProps<WorkflowsFormValue.ScriptNode>;

const ScriptNode: NamedExoticComponent<ScriptNodeProps> = memo((props) => {
  return (
    <NodeWrapper
      {...props}
      portalDetailContent={
        <Suspense fallback={null}>
          <ScriptNodeDetailForm />
        </Suspense>
      }
    />
  );
});

export default ScriptNode;
