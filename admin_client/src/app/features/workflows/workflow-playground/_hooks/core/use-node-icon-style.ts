import { useMemo } from "react";

import { getNodeColor, getNodeIcon } from "~/app/features/workflows/_helpers";
import { Workflows } from "~/app/features/workflows/_types";
import { getColor } from "~/ui/_helpers";
import type { IconProps } from "~/ui/components";

export function useNodeIconStyle(
  type: undefined | Workflows.NodeProps["type"] = Workflows.NodeType.default,
) {
  const nodeIcon = useMemo<string>(() => getNodeIcon(type), [type]);

  const nodeColor = useMemo<ReturnType<typeof getColor>>(
    () => getColor(getNodeColor(type)),
    [type],
  );

  const nodeIconStyle = useMemo<IconProps["sx"]>(
    () => ({
      backgroundColor: nodeColor.main,
      borderRadius: "8px",
      color: "#FFFFFF",
      padding: "4px !important",
    }),
    [nodeColor],
  );

  return {
    icon: nodeIcon,
    color: nodeColor.main,
    style: nodeIconStyle,
  };
}
