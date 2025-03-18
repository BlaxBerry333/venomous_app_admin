import type { NamedExoticComponent } from "react";
import { memo } from "react";

import type { Workflows, WorkflowsFormValue } from "~/app/features/workflows/_types";
import { NodeWrapper } from "~/app/features/workflows/workflow-playground/custom-nodes/_node-wrapper";
import ScriptNodeDetail from "./ScriptNodeDetail";

type ScriptNodeProps = Workflows.NodeProps<WorkflowsFormValue.ScriptNode>;

const ScriptNode: NamedExoticComponent<ScriptNodeProps> = memo((props) => {
  return <NodeWrapper {...props} portalDetailContent={<ScriptNodeDetail />} />;
});

export default ScriptNode;
