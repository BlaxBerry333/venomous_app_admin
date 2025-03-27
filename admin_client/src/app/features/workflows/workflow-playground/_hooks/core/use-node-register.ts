import { useCallback } from "react";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import type { Workflows } from "~/app/features/workflows/_types";
import { createNode } from "~/app/features/workflows/workflow-playground/_helpers";
import useInstance from "./use-instance";

export default function useNodeRegister() {
  const { screenToFlowPosition, getNodes, addNodes, resetElements } = useInstance();

  /**
   * 开始拖拖页面上其他元素
   */
  const handleOnDragStart = useCallback(
    (event: React.DragEvent<Element>, nodeType: Workflows.NodeType) => {
      event.dataTransfer.setData("text/plain", JSON.stringify(nodeType));
      event.dataTransfer.effectAllowed = "move";
    },
    [],
  );

  /**
   * 拖拖页面上其他元素经过 Canvas
   */
  const handleOnDragOver: React.DragEventHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  /**
   * 在 Canvas 中松开拖入的页面上其他元素
   */
  const handleOnDrop: React.DragEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      const strData = event.dataTransfer.getData("text/plain");
      if (!strData) {
        return;
      }
      const draggedNodeType = JSON.parse(strData);
      if (!draggedNodeType) {
        return;
      }

      const maxNodeId: number = getNodes().reduce((max, node) => {
        const currentId = parseInt(node.id) || 0;
        return currentId > max ? currentId : max;
      }, 0);
      const newNode = createNode({
        id: String(maxNodeId + 1),
        type: draggedNodeType,
        position: screenToFlowPosition({
          x: event.clientX - FEATURE_WORKFLOWS_CONFIGS.styles.nodeWidth / 2,
          y: event.clientY - FEATURE_WORKFLOWS_CONFIGS.styles.nodeHeight / 2,
        }),
      });

      resetElements();
      addNodes(newNode);
    },
    [screenToFlowPosition, getNodes, resetElements, addNodes],
  );

  return {
    handleOnDragStart,
    handleOnDragOver,
    handleOnDrop,
  };
}
