import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";

import { useCallback, useRef } from "react";

import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { getSessionStorageItem, setSessionStorageItem } from "~/common/utils/handle-web-storage";
import { getSortLastNode } from "~/sections/dashboard-workflow/_helpers/functions";

import { useWorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";
import { useWorkflowActionHistoryStoreUndoRedo } from "./use-workflow-action-history-store";
import useWorkflowInstance from "./use-workflow-instance";

const WORKFLOW_COPIED_NODES_KEY = "__VENOMOUS_APP__WORKFLOW_COPIED_NODES";
const WORKFLOW_COPIED_EDGES_KEY = "__VENOMOUS_APP__WORKFLOW_COPIED_EDGES";

export default function useWorkflowNodeCopyPasteDelete() {
  const { getNodes, getEdges, setNodes, setEdges } = useWorkflowInstance();
  const { updateActionHistory } = useWorkflowActionHistoryStoreUndoRedo();

  const { specificNodeFormWidget } = useWorkflowWidgetStatusContext();

  // ----------------------------------------------------------------------------------------------------

  const pasteCount = useRef<number>(0);

  /** 复制所有选中的节点，并存到 SessionStorage */
  const copySelectedNodes = useCallback(() => {
    const selectedNodes: Array<CustomNodeType> = getNodes().filter((n) => n.selected);
    const relatedEdges: Array<CustomEdgeType> = [];

    pasteCount.current = 0;

    if (selectedNodes.length) {
      setSessionStorageItem(WORKFLOW_COPIED_NODES_KEY, JSON.stringify(selectedNodes));
    }
    if (relatedEdges.length) {
      setSessionStorageItem(WORKFLOW_COPIED_EDGES_KEY, JSON.stringify(relatedEdges));
    }
  }, [getNodes]);

  /** 粘贴存储在 SessionStorage 中的节点 */
  const pasteStoredNodes = useCallback(() => {
    const copiedNodes = getSessionStorageItem<Array<CustomNodeType>>(WORKFLOW_COPIED_NODES_KEY, []);
    const copiedEdges = getSessionStorageItem<Array<CustomEdgeType>>(WORKFLOW_COPIED_EDGES_KEY, []);

    if (copiedNodes?.length) {
      setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));

      const lastNode = getSortLastNode(getNodes());
      const nodesToAppended = copiedNodes.map<CustomNodeType>((n) => ({
        ...n,
        id: String(lastNode ? parseInt(lastNode.id) + parseInt(n.id) : n.id),
        position: {
          x: n.position.x + 50 * (pasteCount.current + 1),
          y: n.position.y + 50 * (pasteCount.current + 1),
        },
        selected: true, // 浮动显示到被复制节点的上方
        dragging: false,
      }));

      setNodes((nds) => nds.concat(nodesToAppended));
    }

    if (copiedNodes?.length || copiedEdges?.length) {
      pasteCount.current += 1;
      updateActionHistory(WorkflowActionEventName.PastedCopiedNode);
    }
  }, [getNodes, setNodes, updateActionHistory]);

  // ----------------------------------------------------------------------------------------------------

  /** 删除所有选中的节点 */
  const deleteSelectedNodes = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => !node.selected));
    specificNodeFormWidget.clearSpecificNodeId(); // 清空选中的节点
  }, [setNodes, specificNodeFormWidget]);

  /** 删除所有选中的边 */
  const deleteSelectedEdges = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => !edge.selected));
  }, [setEdges]);

  /** 删除所有选中的节点的相关边 */
  const deleteRelatedEdges = useCallback(() => {
    const selectedNodes: Array<CustomNodeType> = getNodes().filter((n) => n.selected);
    const edgesToRemove: Array<CustomEdgeType> = [];
    selectedNodes.forEach((node) => {
      const relatedEdges = getEdges().filter((e) => e.source === node.id || e.target === node.id);
      edgesToRemove.push(...relatedEdges);
    });
    setEdges((eds) => eds.filter((e) => !edgesToRemove.find((r) => r.id === e.id)));
  }, [getEdges, getNodes, setEdges]);

  /** 删除所有选中的节点或边 */
  const deleteSelectedElements = useCallback(() => {
    const selectedNodes = getNodes().filter((n) => n.selected);
    const selectedEdges = getEdges().filter((e) => e.selected);

    const hasSelectedNodes: boolean = selectedNodes.length > 0;
    const hasSelectedEdges: boolean = selectedEdges.length > 0;

    // 如果没有选中节点和边，则不做任何操作
    if (!hasSelectedNodes && !hasSelectedEdges) {
      return;
    }
    // 删除选中的节点
    if (hasSelectedNodes) {
      deleteSelectedNodes();
      deleteRelatedEdges();
    }
    // 删除选中的边
    if (hasSelectedEdges) {
      deleteSelectedEdges();
    }

    // 只有节点被选中
    if (hasSelectedNodes && !hasSelectedEdges) {
      const actionEventName: WorkflowActionEventName =
        selectedNodes.length === 1
          ? WorkflowActionEventName.DeleteOneNode
          : WorkflowActionEventName.DeleteNodes;
      updateActionHistory(actionEventName);
      return;
    }
    // 只有边被选中
    if (hasSelectedEdges && !hasSelectedNodes) {
      const actionEventName: WorkflowActionEventName =
        selectedEdges.length === 1
          ? WorkflowActionEventName.DeleteOneEdge
          : WorkflowActionEventName.DeleteEdges;
      updateActionHistory(actionEventName);
      return;
    }
    // 节点和边都被选中
    if (hasSelectedNodes && hasSelectedEdges) {
      updateActionHistory(WorkflowActionEventName.DeleteElements);
    }
  }, [
    getNodes,
    getEdges,
    deleteSelectedNodes,
    deleteSelectedEdges,
    updateActionHistory,
    deleteRelatedEdges,
  ]);

  return {
    copySelectedNodes,
    pasteStoredNodes,
    deleteSelectedNodes,
    deleteSelectedEdges,
    deleteSelectedElements,
  };
}
