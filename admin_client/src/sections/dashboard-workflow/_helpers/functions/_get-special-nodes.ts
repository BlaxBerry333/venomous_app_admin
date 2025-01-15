import type { CustomNodeType, WorkflowElementsType } from "~/common/types/dashboard-workflow";
import type { ObjectKeyof } from "~/common/types/tools";

import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs/_dashboard-workflow";
import { checkIsStartNode } from "./_check-node";

/**
 * 获取流程中的开始 Node
 */
export function getWorkflowStartNode(nodes: CustomNodeType[]): CustomNodeType | null {
  return nodes.find((node) => checkIsStartNode(node)) ?? null;
}

/**
 * 获取基于 id 排序后的最后一个 Node
 */
export function getSortLastNode(nodes: CustomNodeType[]): CustomNodeType | null {
  if (nodes.length === 0) {
    return null;
  }

  const reversedNodes = nodes.sort((a, b) => parseInt(b.id) - parseInt(a.id));

  return reversedNodes[0];
}

/**
 * 获取流程中的结束 Node 列表
 */
export function getWorkflowEndNodes(elements: WorkflowElementsType): CustomNodeType[] {
  // TODO:
  console.log(elements);

  return [];
}

type NodeTypeGroupName = ObjectKeyof<typeof DASHBOARD_WORKFLOW_CONFIGS.NodeTypeGroup>;

/**
 * 根据节点类型获取节点所属的组
 */
export function getNodeGroupName(nodeType: CustomNodeTypeName): NodeTypeGroupName | null {
  const nodeTypeGroups = DASHBOARD_WORKFLOW_CONFIGS.NodeTypeGroup;

  for (const groupName in nodeTypeGroups) {
    const includedTypes = nodeTypeGroups[
      groupName as ObjectKeyof<typeof nodeTypeGroups>
    ] as unknown as CustomNodeTypeName[];

    if (includedTypes.includes(nodeType)) {
      return groupName as NodeTypeGroupName;
    }
  }

  return null;
}

/**
 * 获取节点所属的组的颜色
 */
export function getNodeGroupColor(nodeGroupName: NodeTypeGroupName): string {
  return DASHBOARD_WORKFLOW_CONFIGS.CommonColors[
    nodeGroupName as ObjectKeyof<typeof DASHBOARD_WORKFLOW_CONFIGS.CommonColors>
  ];
}
