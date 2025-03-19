import type { NamedExoticComponent } from "react";
import { memo } from "react";

import type { Workflows } from "~/app/features/workflows/_types";
import { useNodeIconStyle } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { Icon } from "~/ui/components";

const NodeWrapperIcon: NamedExoticComponent<{
  nodeType: Workflows.NodeType;
}> = memo(({ nodeType }) => {
  const nodeIcon = useNodeIconStyle(nodeType);

  return <Icon icon={nodeIcon.icon} width={40} sx={nodeIcon.style} />;
});

export default NodeWrapperIcon;
