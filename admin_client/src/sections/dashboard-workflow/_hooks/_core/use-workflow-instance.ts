import type {
  CustomEdgeType,
  CustomNodeType,
  WorkflowElementsType,
} from "~/common/types/dashboard-workflow";

import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export default function useWorkflowInstance() {
  const reactFlowInstance = useReactFlow<CustomNodeType, CustomEdgeType>();

  return {
    ...reactFlowInstance,

    getElements: useCallback(
      (): WorkflowElementsType => ({
        nodes: reactFlowInstance.getNodes(),
        edges: reactFlowInstance.getEdges(),
      }),
      [reactFlowInstance],
    ),

    setElements: useCallback(
      (elements: WorkflowElementsType): void => {
        reactFlowInstance.setNodes(elements.nodes);
        reactFlowInstance.setEdges(elements.edges);
      },
      [reactFlowInstance],
    ),
  };
}
