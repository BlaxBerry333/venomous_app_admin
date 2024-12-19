import type { CustomNodeMenuListItemType, CustomNodeType } from "~/common/types/dashboard-workflow";

import { useCallback } from "react";
import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { isValidJSON } from "~/common/utils/handle-web-storage";
import { DEFAULT_START_NODE } from "~/sections/dashboard-workflow/_helpers/constants";
import { createNewNode, getSortLastNode } from "~/sections/dashboard-workflow/_helpers/functions";

import { useWorkflowActionHistoryStoreUndoRedo } from "./use-workflow-action-history-store";
import useWorkflowInstance from "./use-workflow-instance";

export default function useWorkflowNodeRegister() {
  const { screenToFlowPosition, getNodes, setNodes } = useWorkflowInstance();
  const { updateActionHistory } = useWorkflowActionHistoryStoreUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  /** 开始拖拖页面上其他元素 */
  const handleOnDragStart = useCallback(
    (event: React.DragEvent<Element>, node: CustomNodeMenuListItemType) => {
      event.dataTransfer.setData("text/plain", JSON.stringify(node));
      event.dataTransfer.effectAllowed = "move";
    },
    [],
  );

  /** 拖拖页面上其他元素经过 Canvas */
  const handleOnDragOver: React.DragEventHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  /** 在 Canvas 中松开拖入的页面上其他元素  */
  const handleOnDrop: React.DragEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      const strData = event.dataTransfer.getData("text/plain");
      if (!isValidJSON(strData)) {
        return;
      }

      const draggedNode = JSON.parse(strData) as CustomNodeMenuListItemType;
      if (!draggedNode) {
        return;
      }

      const sortLastNode = getSortLastNode(getNodes());

      const newNode: CustomNodeType = createNewNode({
        id: String(sortLastNode ? Number(sortLastNode.id) + 1 : Number(DEFAULT_START_NODE.id)),
        position: screenToFlowPosition({ x: event.clientX, y: event.clientY }),
        type: draggedNode.type,
      });

      setNodes((nds) => nds.concat(newNode));

      updateActionHistory(WorkflowActionEventName.AddNode);
    },
    [screenToFlowPosition, getNodes, setNodes, updateActionHistory],
  );

  // ----------------------------------------------------------------------------------------------------

  return {
    handleOnDragStart,
    handleOnDragOver,
    handleOnDrop,
  };
}
