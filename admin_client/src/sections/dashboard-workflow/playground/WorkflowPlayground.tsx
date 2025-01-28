import "@xyflow/react/dist/base.css";
import "./index.css";

import type { NamedExoticComponent } from "react";
import type { WorkflowElementsType } from "~/common/types/dashboard-workflow";

import MuiStack from "@mui/material/Stack";
import { Background, ConnectionLineType, MarkerType, Panel, ReactFlow } from "@xyflow/react";
import { memo } from "react";

import { useCustomThemesContextValue } from "~/common/hooks/use-dashboard";
import { CustomEdgeTypeName } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";
import useWorkflowConnectionEvents from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-connection-events";
import useWorkflowEdgesEvents from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-edges-events";
import useWorkflowHotkeys from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-hotkeys";
import useWorkflowInitialization from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-initialization";
import useWorkflowNodeRegister from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-register";
import useWorkflowNodesEvents from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-nodes-events";
import { useWorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";
import { customEdgeComponentsTypes } from "~/sections/dashboard-workflow/custom-edges";
import { customNodeComponentsTypes } from "~/sections/dashboard-workflow/custom-nodes";
import {
  ActionButtonBackgroundToggler,
  ActionButtonMiniMap,
  ActionButtonNodeMenuList,
  ActionButtonRecordHistory,
  ActionButtonSave,
  ActionButtonToolMenu,
  ActionButtonUndoRedo,
  ActionButtonZoom,
} from "~/sections/dashboard-workflow/playground-actions-tools";
import {
  WorkflowInformation,
  WorkflowNodeFormInformation,
} from "~/sections/dashboard-workflow/playground-modals";

const WorkflowPlayground: NamedExoticComponent<{
  elements: WorkflowElementsType;
}> = memo(({ elements: originElements }) => {
  const customThemeContextValue = useCustomThemesContextValue();

  const { canvasBackground } = useWorkflowWidgetStatusContext();

  // ----------------------------------------------------------------------------------------------------

  const {
    onNodeClick,
    onNodeDoubleClick,
    onNodeContextMenu,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onNodeMouseMove,
    onNodesDelete,
    onNodeDragStart,
    onNodeDrag,
    onNodeDragStop,
  } = useWorkflowNodesEvents();

  const { onEdgesDelete } = useWorkflowEdgesEvents();

  const {
    onConnectStart,
    onConnect,
    onConnectEnd,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    isValidConnection,
  } = useWorkflowConnectionEvents();

  const { handleOnDragOver, handleOnDrop } = useWorkflowNodeRegister();

  const { onAfterInit } = useWorkflowInitialization();

  // ----------------------------------------------------------------------------------------------------

  useWorkflowHotkeys();

  // ----------------------------------------------------------------------------------------------------

  return (
    <ReactFlow
      defaultNodes={originElements.nodes} /** 受控组件写法：节点列表 */
      defaultEdges={originElements.edges} /** 受控组件写法：边列表 */
      nodeTypes={customNodeComponentsTypes} /** 自定义节点组件 */
      edgeTypes={customEdgeComponentsTypes} /** 自定义边组件 */
      connectionLineType={ConnectionLineType.Bezier} /** 连接中的边的种类 */
      connectionLineStyle={{ strokeWidth: 3 }} /** 连接中的边的样式 */
      defaultEdgeOptions={{
        type: CustomEdgeTypeName.deleteLabel /** 连接拖拽时的边的种类 */,
        markerEnd: { type: MarkerType.ArrowClosed } /** 连接拖拽时的边的箭头种类 */,
        // style: { strokeWidth: 2 } /** 连接拖拽时的边的样式 */,
      }}
      // ----------------------------------------------------------------------------------------------------
      onNodeDragStart={onNodeDragStart} /** 节点在Canvas上的开始 */
      onNodeDrag={onNodeDrag} /** 节点在Canvas上的拖动中 */
      onNodeDragStop={onNodeDragStop} /** 节点在Canvas上的结束 */
      onNodeClick={onNodeClick} /** 节点被鼠标单击 ( 鼠标抬起时 ) */
      onNodeDoubleClick={onNodeDoubleClick} /** 节点被鼠标双击 ( 会同时触发单击事件 ) */
      onNodeContextMenu={onNodeContextMenu} /** 节点被鼠标右键单击 ( 鼠标抬起时 ) */
      onNodeMouseEnter={onNodeMouseEnter} /** 节点被鼠标进入 */
      onNodeMouseMove={onNodeMouseMove} /** 节点被鼠标经过 */
      onNodeMouseLeave={onNodeMouseLeave} /** 节点被鼠标离开 */
      onNodesDelete={onNodesDelete} /** 节点被删除时 */
      // ----------------------------------------------------------------------------------------------------
      onEdgesDelete={onEdgesDelete} /** 边被删除时 */
      // ----------------------------------------------------------------------------------------------------
      onConnectStart={onConnectStart} /** 边连接开始 */
      onConnect={onConnect} /** 边连接成功时 */
      onConnectEnd={onConnectEnd} /** 边连接结束 ( 无论连接成功或失败 ) */
      onReconnectStart={onReconnectStart} /** 边重新连接开始 */
      onReconnect={onReconnect} /** 边重新连接成功时 */
      onReconnectEnd={onReconnectEnd} /**  边重新连接结束 ( 无论连接成功或失败 ) */
      isValidConnection={isValidConnection} /** 判断是否可以连接 */
      // ----------------------------------------------------------------------------------------------------
      onDragOver={handleOnDragOver} /** 将其他页面元素拖拽进入 Canvas */
      onDrop={handleOnDrop} /** 将拖拽中的其他页面元素放入 Canvas */
      onInit={onAfterInit} /** Canvas 初始化结束 */
      // onError={onError} /** Canvas 发生错误时 */
      // onBeforeDelete={onBeforeDelete} /** 节点或边在被删除前 */
      // onDelete={onDelete} /** 节点或边被删除时 */
      // ----------------------------------------------------------------------------------------------------
      elementsSelectable /** 节点与边是否能被选中 */
      nodesConnectable /** 节点是否能被连接 */
      nodesDraggable /** 节点是否能被拖拽 */
      panOnDrag /** 是否可以拖拽整个Canvas */
      panOnScroll={false} /** 是否可以滚动整个 Canvas */
      zoomOnScroll /** 是否可以滚动缩放整个 Canvas */
      zoomOnPinch /** 是否可以二指捏合手势缩放整个 Canvas */
      nodesFocusable={false} /** 是否可以使用 Tab 切换节点 */
      edgesFocusable={false} /** 是否可以使用 Tab 切换边 */
      nodeDragThreshold={5} /** 节点被拖拽了指定 px 之后才会真正在 Canvas 上移动，可防止失误移动 */
      connectionRadius={DASHBOARD_WORKFLOW_CONFIGS.NodeMinWidth / 4} /** 节点连接的 px 范围 */
      snapToGrid={canvasBackground.isGridLayout} /** 是否使用 Grid 布局 */
      snapGrid={canvasBackground.gridLayoutGap} /** 布局间隔 */
      // ----------------------------------------------------------------------------------------------------
      deleteKeyCode={null} /** 默认删除节点与边的快捷键 */
      // ----------------------------------------------------------------------------------------------------
      colorMode={customThemeContextValue?.themeMode}
      proOptions={{ hideAttribution: true }}
    >
      {/* ReactFlow Canvas 背景 */}
      <Background
        variant={canvasBackground.gridLayoutType}
        style={{ display: !canvasBackground.gridLayoutType ? "none" : "block" }}
      />

      {/* 节点表单信息 */}
      <Panel position="bottom-right">
        <WorkflowNodeFormInformation />
      </Panel>

      {/* ReactFlow Canvas 工具栏 */}
      <>
        <Panel position="top-left">
          <WorkflowInformation />
          <MuiStack direction="row" spacing={1} marginTop={1}>
            <ActionButtonNodeMenuList />
            <ActionButtonBackgroundToggler />
          </MuiStack>
        </Panel>
        <Panel position="top-right">
          <MuiStack direction="row" spacing={1}>
            <ActionButtonToolMenu />
            <ActionButtonRecordHistory />
            <ActionButtonSave />
          </MuiStack>
        </Panel>
        <Panel position="bottom-left">
          <MuiStack direction="row" spacing={1}>
            <ActionButtonMiniMap />
            <ActionButtonZoom />
            <ActionButtonUndoRedo />
          </MuiStack>
        </Panel>
      </>
    </ReactFlow>
  );
});

export default WorkflowPlayground;
