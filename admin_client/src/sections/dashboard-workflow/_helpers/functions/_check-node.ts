import type { CustomNodeType } from "~/common/types/dashboard-workflow";

import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";
import { DEFAULT_START_NODE } from "../constants";

/**
 * 判断节点是否为开始节点
 */
export function checkIsStartNode(node: CustomNodeType): boolean {
  return node.type === CustomNodeTypeName.start && node.id === DEFAULT_START_NODE.id;
}
