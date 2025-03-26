import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense } from "react";

import { ConnectionLineType, MarkerType, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/base.css";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import { useWorkflowOriginalData } from "~/app/features/workflows/_contexts";
import { Workflows } from "~/app/features/workflows/_types";

import { usePlaygroundActionStatusStore } from "../_hooks";
import { useEdgeConnection, useNodeRegister } from "../_hooks/core";
import { customEdgeComponents } from "../custom-edges";
import { customNodeComponents } from "../custom-nodes";
import { PlaygroundBackground } from "../custom-playground-actions";
import {
  PlaygroundBottomLeftPanel,
  PlaygroundBottomRightPanel,
  PlaygroundTopLeftPanel,
  PlaygroundTopRightPanel,
} from "../custom-playground-panels";

const PlaygroundNodeDeleteConfirmModal = lazy(() =>
  import("../custom-playground-modals").then((m) => ({
    default: m.PlaygroundNodeDeleteConfirmModal,
  })),
);

const WorkflowPlayground: NamedExoticComponent = memo(() => {
  const { originalElement } = useWorkflowOriginalData();

  const { isGridLayout } = usePlaygroundActionStatusStore();

  const { isValidConnection } = useEdgeConnection();

  const { handleOnDragOver, handleOnDrop } = useNodeRegister();

  return (
    // prettier-ignore
    <ReactFlow 
      defaultNodes={originalElement?.nodes}                               /** 受控组件写法：Node 列表 */
      defaultEdges={originalElement?.edges}                               /** 受控组件写法：Edge 列表 */
      nodeTypes={customNodeComponents}                                    /** 自定义 Node 组件 */
      edgeTypes={customEdgeComponents}                                    /** 自定义 Edge 组件 */
      connectionLineType={ConnectionLineType.Bezier}                      /** 连接中的 Edge 的种类 */
      connectionLineStyle={{ strokeWidth: 3 }}                            /** 连接中的 Edge 的样式 */
      defaultEdgeOptions={{
        type: Workflows.EdgeType.animation,                               /** 连接拖拽时的 Edge 的种类 */
        markerEnd: { type: MarkerType.ArrowClosed },                      /** 连接拖拽时的 Edge 的箭头种类 */
        style: { strokeWidth: 3 }                                         /** 连接后的 Edge 的样式，可在 EdgeProps 中覆盖 */
      }}
      // ----------------------------------------------------------------------------------------------------
      // onNodeDragStart={onNodeDragStart}                                /** Node 在 Canvas上的开始 */
      // onNodeDrag={onNodeDrag}                                          /** Node 在 Canvas上的拖动中 */
      // onNodeDragStop={onNodeDragStop}                                  /** Node 在 Canvas上的结束 */
      // onNodeClick={onNodeClick}                                        /** Node 被鼠标单击 ( 鼠标抬起时 ) */
      // onNodeDoubleClick={onNodeDoubleClick}                            /** Node 被鼠标双击 ( 会同时触发单击事件 ) */
      // onNodeContextMenu={onNodeContextMenu}                            /** Node 被鼠标右键单击 ( 鼠标抬起时 ) */
      // onNodeMouseEnter={onNodeMouseEnter}                              /** Node 被鼠标进入 */
      // onNodeMouseMove={onNodeMouseMove}                                /** Node 被鼠标经过 */
      // onNodeMouseLeave={onNodeMouseLeave}                              /** Node 被鼠标离开 */
      // onNodesDelete={onNodesDelete}                                    /** Node 被删除时 */
      // onEdgesDelete={onEdgesDelete}                                    /** Edge 被删除时 */
      // ----------------------------------------------------------------------------------------------------
      // onConnectStart={onConnectStart}                                  /** Edge 连接开始 */
      // onConnect={onConnect}                                            /** Edge 连接成功时 */
      // onConnectEnd={onConnectEnd}                                      /** Edge 连接结束 ( 无论连接成功或失败 ) */
      // onReconnectStart={onReconnectStart}                              /** Edge 重新连接开始 */
      // onReconnect={onReconnect}                                        /** Edge 重新连接成功时 */
      // onReconnectEnd={onReconnectEnd}                                  /** Edge 重新连接结束 ( 无论连接成功或失败 ) */
      isValidConnection={isValidConnection}                               /** 判断是否可以连接 */
      // ----------------------------------------------------------------------------------------------------
      onDragOver={handleOnDragOver}                                       /** 将其他页面元素拖拽进入 Canvas */
      onDrop={handleOnDrop}                                               /** 将拖拽中的其他页面元素放入 Canvas */
      // ----------------------------------------------------------------------------------------------------
      // onInit={onAfterInit}                                             /** Canvas 初始化结束 */
      // onError={onError}                                                /** Canvas 发生错误时 */
      // onBeforeDelete={onBeforeDelete}                                  /** Node 或边在被删除前 */
      // onDelete={onDelete}                                              /** Node 或边被删除时 */
      // ----------------------------------------------------------------------------------------------------
      elementsSelectable                                                  /** Node 与 Edge 是否能被选中 */
      nodesConnectable                                                    /** Node 是否能被连接 */
      nodesDraggable                                                      /** Node 是否能被拖拽 */
      panOnDrag                                                           /** 是否可以拖拽整个 Canvas */
      panOnScroll={false}                                                 /** 是否可以滚动整个 Canvas */
      zoomOnScroll                                                        /** 是否可以滚动缩放整个 Canvas */
      zoomOnPinch                                                         /** 是否可以二指捏合手势缩放整个 Canvas */
      nodesFocusable={false}                                              /** 是否可以使用 Tab 切换 Node  */
      edgesFocusable={false}                                              /** 是否可以使用 Tab 切换 Edge  */
      nodeDragThreshold={5}                                               /** Node 被拖拽了指定 px 之后才会真正在 Canvas 上移动，可防止失误移动 */
      connectionRadius={FEATURE_WORKFLOWS_CONFIGS.styles.nodeWidth / 4}   /** Node 连接的 px 范围 */
      // ----------------------------------------------------------------------------------------------------
      snapToGrid={isGridLayout}                                           /** Canvas 是否使用 Grid 布局 */
      snapGrid={FEATURE_WORKFLOWS_CONFIGS.canvas.gridLayoutGap}           /** Canvas Grid 布局间隔 */
      minZoom={FEATURE_WORKFLOWS_CONFIGS.canvas.minZoom}                  /** Canvas 最小缩放比例 */
      maxZoom={FEATURE_WORKFLOWS_CONFIGS.canvas.maxZoom}                  /** Canvas 最大缩放比例 */
      fitViewOptions={{
        duration: FEATURE_WORKFLOWS_CONFIGS.canvas.zoomDuration           /** Canvas 缩放动画时长 */
      }}
      // ----------------------------------------------------------------------------------------------------
      deleteKeyCode={null}                                                /** 默认删除 Node 与 Edge 的快捷键 */
      // ----------------------------------------------------------------------------------------------------
      proOptions={{ hideAttribution: true }}                              /** 隐藏版权信息 */
    >
      {/* Background */}
      <PlaygroundBackground />

      {/* Actions */}
      <PlaygroundTopLeftPanel />
      <PlaygroundTopRightPanel />
      <PlaygroundBottomLeftPanel />
      <PlaygroundBottomRightPanel />

      {/* Modals */}
      <Suspense fallback={null}>
        <PlaygroundNodeDeleteConfirmModal />
      </Suspense>
    </ReactFlow>
  );
});

export default WorkflowPlayground;
