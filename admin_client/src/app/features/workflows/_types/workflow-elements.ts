import type {
  Edge as XYFlowEdge,
  EdgeProps as XYFlowEdgeProps,
  Node as XYFlowNode,
  NodeProps as XYFlowNodeProps,
} from "@xyflow/react";
import type { NamedExoticComponent } from "react";

import type { WorkflowsFormValue } from "./workflow-form-value";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Workflows {
  /**
   * 元素
   */
  export type Element = {
    nodes: Workflows.Node[];
    edges: Workflows.Edge[];
  };

  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  /**
   * Node
   */
  export type Node<FormValue = NodeDataFormValue> = XYFlowNode<NodeData<FormValue>, NodeType>;

  /**
   * Node 的类型
   */
  export enum NodeType {
    default = "default", // message node
    message = "message",
    fetch = "fetch",
    script = "script",
  }

  /**
   * Node 的数据
   */
  export type NodeData<FormValue = NodeDataFormValue> = Partial<{
    isBlocked: boolean; // 是否禁用
    formValue: FormValue; // 表单值
  }>;

  /**
   * Node 的表单值
   */
  export type NodeDataFormValue =
    | WorkflowsFormValue.MessageNode
    | WorkflowsFormValue.FetchNode
    | WorkflowsFormValue.ScriptNode;

  /**
   * 自定义 Node 组件的 props
   */
  export type NodeProps<FormValue = NodeDataFormValue> = XYFlowNodeProps<Node<FormValue>>;

  /**
   * 自定义 Node 组件 ( React memoized )
   */
  export type NodeComponents = {
    [NodeType.default]: NamedExoticComponent<NodeProps<WorkflowsFormValue.MessageNode>>;
    [NodeType.message]: NamedExoticComponent<NodeProps<WorkflowsFormValue.MessageNode>>;
    [NodeType.fetch]: NamedExoticComponent<NodeProps<WorkflowsFormValue.FetchNode>>;
    [NodeType.script]: NamedExoticComponent<NodeProps<WorkflowsFormValue.ScriptNode>>;
  };

  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  /**
   * Edge
   */
  export type Edge = XYFlowEdge<EdgeData, EdgeType>;

  /**
   * Edge 的类型
   */
  export enum EdgeType {
    default = "default",
    animation = "animation",
  }

  /**
   * Edge 的数据
   */
  export type EdgeData = Partial<{
    animation: boolean; // 是否启用动画
  }>;

  /**
   * 自定义 Edge 组件的 props
   */
  export type EdgeProps = XYFlowEdgeProps<Edge>;

  /**
   * 自定义 Edge 组件 ( React memoized )
   */
  export type EdgeComponents = Record<EdgeType, NamedExoticComponent<EdgeProps>>;

  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  export type FormValue = {
    name: string;
    description: string;
    items: Array<{
      name: string;
      value: string;
    }>;
  };

  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  /**
   * 事件名称
   */
  // prettier-ignore
  export enum ActionEventName {
  Init = "Init",                                          // ( ReactFlow 的 onInit 事件 )
  HandlerConnect = "HandlerConnect",                      // ( ReactFlow Handler 组件的 onConnect 事件 )
  Reconnect = "Reconnect",                                // ( ReactFlow 的 onReconnect 事件 )
  MoveNode = "MoveNode",                                  // ( ReactFlow 的 onNodeDragStop 事件)
  AddNode = "AddNode",                                    // ( ReactFlow 的 onDrop 事件 )
  DeleteNodes = "DeleteNodes",                            // 仅所有删除选中的 nodes
  DeleteEdges = "DeleteEdges",                            // 仅所有删除除选中的 edges
  DeleteElements = "DeleteElements",                      // 同时删除所有选中的 nodes 与 edges
  DeleteOneNode = "DeleteOneNode",                        // 仅删除一个选中的 node
  DeleteOneEdge = "DeleteOneEdge",                        // 仅删除一个选中的 edge
  DeleteEdgeByLabel = "DeleteEdgeByLabel",                // 通过 edge 的关闭 label 后删除
  DeleteEdgeByDrop = "DeleteEdgeByDrop",                  // 通过拖拽 edge 离开 node 后删除
  UpdateNodeData = "UpdateNodeData",                      // 更新 node 的数据
  PastedCopiedNode = "PastedCopiedNode",                  // 粘贴被复制的 nodes
  RollbackToSpecificRecord = "RollbackToSpecificRecord",  // 回退到指定的历史记录
  RollbackToLatestRecord = "RollbackToLatestRecord",      // 回退到最新的历史记录 ( 当前 )
}
}
