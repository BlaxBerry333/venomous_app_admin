import type { CustomEdgeType } from "./_edges";
import type { CustomNodeType } from "./_nodes";

export type WorkflowInfoType = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isDraft?: boolean;
  isLocked?: boolean;
};

export type WorkflowElementsType = {
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
};

export type WorkflowRecordHistoryType = {
  id: string;
  title: string;
  elements: WorkflowElementsType;
  createdAt: string;
  updatedAt: string;
};

// prettier-ignore
export enum WorkflowActionEventName {
  Init = "Init",                                          // ( ReactFlow 的 onInit 事件 )
  Connect = "Connect",                                    // ( ReactFlow Handler 组件的 onConnect 事件, 不建议用于 ReactFlow 的 onConnect 事件 )
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
