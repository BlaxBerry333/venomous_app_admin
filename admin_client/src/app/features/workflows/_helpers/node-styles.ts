import { Workflows } from "~/app/features/workflows/_types";

/**
 * 获取 Node 的图标
 */
export function getNodeIcon(type: Workflows.NodeType) {
  switch (type) {
    case Workflows.NodeType.fetch:
      return "solar:transfer-horizontal-bold";
    case Workflows.NodeType.script:
      return "solar:code-bold";
    case Workflows.NodeType.message:
    case Workflows.NodeType.default:
    default:
      return "solar:notebook-minimalistic-bold";
  }
}

/**
 * 获取 Node 的颜色
 */
export function getNodeColor(type: Workflows.NodeType) {
  switch (type) {
    case Workflows.NodeType.fetch:
      return "#FFD700"; // Gold
    case Workflows.NodeType.script:
      return "#6A5ACD"; // SlateBlue
    case Workflows.NodeType.message:
    case Workflows.NodeType.default:
    default:
      return "#20B2AA"; // LightSeaGreen
  }
}
