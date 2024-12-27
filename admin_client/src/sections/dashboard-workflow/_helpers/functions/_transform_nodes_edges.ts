import type { WorkflowElementsType } from "~/common/types/dashboard-workflow";
import type { DRFWorkflowDataType } from "~/services/types/workflow";

export function transformWorkflowData(
  elements: WorkflowElementsType,
): DRFWorkflowDataType["playground"] {
  const formattedNodes = elements.nodes.map((node) => ({
    id: node.id,
    type: node.type!,
    data: node.data.form?.value || null,
    position: node.position,
  }));

  const formattedEdges = elements.edges.map((edge) => ({
    id: edge.id,
    type: edge.type!,
    source: edge.source,
    target: edge.target,
  }));

  return {
    nodes: formattedNodes,
    edges: formattedEdges,
  };
}
