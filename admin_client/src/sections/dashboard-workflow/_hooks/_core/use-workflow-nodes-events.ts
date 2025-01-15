import type { NodeMouseHandler, OnNodeDrag, OnNodesDelete } from "@xyflow/react";
import type { CustomNodeType } from "~/common/types/dashboard-workflow";

import { useCallback, useRef } from "react";
import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { useWorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";
import { useWorkflowActionHistoryStoreUndoRedo } from "./use-workflow-action-history-store";

export default function useWorkflowNodesEvents() {
  const { updateActionHistory } = useWorkflowActionHistoryStoreUndoRedo();

  const { specificNodeFormWidget } = useWorkflowWidgetStatusContext();

  // ----------------------------------------------------------------------------------------------------

  /** 受控组件写法：监听节点的变化 ( 选中、删除、更新 ) */
  // const onNodesChange: OnNodesChange = useCallback((changes) => {
  //   // ...
  // }, []);

  // ----------------------------------------------------------------------------------------------------

  /** 节点被鼠标单击 ( 鼠标抬起时 ) */
  const onNodeClick: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // ...
  }, []);

  /** 节点被鼠标双击 ( 鼠标抬起时 ) */
  const onNodeDoubleClick: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // ...
  }, []);

  /** 节点被鼠标右键单击 ( 会同时触发单击事件 ) */
  const onNodeContextMenu: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // ...
  }, []);

  /** 节点被鼠标进入 */
  const onNodeMouseEnter: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // 渲染次数过多，不建议在此处作处理
  }, []);

  /** 节点被鼠标经过 */
  const onNodeMouseMove: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // 渲染次数过多，不建议在此处作处理
  }, []);

  /** 节点被鼠标离开 */
  const onNodeMouseLeave: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // 渲染次数过多，不建议在此处作处理
  }, []);

  // ----------------------------------------------------------------------------------------------------

  const nodeDragStartPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  /** 节点在Canvas上的拖动开始 */
  const onNodeDragStart: OnNodeDrag<CustomNodeType> = useCallback(
    (_, node) => {
      nodeDragStartPosition.current = { x: node.position.x, y: node.position.y };

      // 拖拽节点时展示节点的表单数据
      specificNodeFormWidget.setSpecificNodeId(node.id);
    },
    [specificNodeFormWidget],
  );

  /** 节点在Canvas上的拖动中 */
  const onNodeDrag: OnNodeDrag<CustomNodeType> = useCallback(() => {
    // 渲染次数过多，不建议在此处作处理
  }, []);

  /** 节点在Canvas上的拖动结束 */
  const onNodeDragStop: OnNodeDrag<CustomNodeType> = useCallback(
    async (_, node) => {
      const { x, y } = nodeDragStartPosition.current;
      if (!(x === node.position.x && y === node.position.y)) {
        updateActionHistory(WorkflowActionEventName.MoveNode);
      }
    },
    [updateActionHistory],
  );

  // ----------------------------------------------------------------------------------------------------

  /** 节点被删除时 */
  const onNodesDelete: OnNodesDelete<CustomNodeType> = useCallback(async () => {
    // 不建议使用该事件记录 UndoRedo, 建议关闭默认删除热键并通过自定义 Hotkey 处理
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return {
    onNodeClick,
    onNodeDoubleClick,
    onNodeContextMenu,
    onNodeMouseEnter,
    onNodeMouseMove,
    onNodeMouseLeave,
    onNodeDragStart,
    onNodeDrag,
    onNodeDragStop,
    onNodesDelete,
  };
}
