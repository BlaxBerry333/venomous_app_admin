import type {
  Connection,
  HandleType,
  IsValidConnection,
  OnConnect,
  OnConnectEnd,
  OnConnectStart,
  OnReconnect,
} from "@xyflow/react";
import type { CustomEdgeType } from "~/common/types/dashboard-workflow";

import { addEdge, reconnectEdge } from "@xyflow/react";
import { useCallback, useRef } from "react";

import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { useWorkflowActionHistoryStoreUndoRedo } from "./use-workflow-action-history-store";
import useWorkflowInstance from "./use-workflow-instance";

type OnReconnectStart = (
  event: React.MouseEvent,
  edge: CustomEdgeType,
  handleType: HandleType,
) => void;

type OnReconnectEnd = (
  event: MouseEvent | TouchEvent,
  edge: CustomEdgeType,
  handleType: HandleType,
) => void;

export default function useWorkflowConnectionEvents() {
  const { setEdges, getEdges } = useWorkflowInstance();
  const { updateActionHistory } = useWorkflowActionHistoryStoreUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  /** 边连接开始 */
  const onConnectStart: OnConnectStart = useCallback(() => {
    // ...
  }, []);

  /** 边连接成功时 */
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const currentEdges = getEdges();

      const isNodeAlreadyConnected: boolean = !!currentEdges.find((edge) => {
        const isDifferentTarget: boolean = connection.target !== edge.target;
        if (!connection.sourceHandle) {
          const isSameSource: boolean = connection.source === edge.source;
          return isDifferentTarget && isSameSource;
        }
        const isSameSourceHandle: boolean = connection.sourceHandle === edge.sourceHandle;
        return isDifferentTarget && isSameSourceHandle;
      });

      if (isNodeAlreadyConnected) {
        setEdges((eds) => eds.filter((e) => e.source !== connection.source));
      }
      setEdges((els) => addEdge(connection, els));

      // 不建议在此处 onConnect、onConnectEnd 处理连接逻辑。会导致多次状态的存储
      // 建议在 Handler 组件的 onConnect 事件处理
    },
    [setEdges, getEdges],
  );

  /** 边连接结束 ( 无论连接成功或失败 ) */
  const onConnectEnd: OnConnectEnd = useCallback(() => {
    // ...
  }, []);

  /** 连接组件 Handler 连接成功时 */
  const onHandlerConnect: OnConnect = useCallback(() => {
    updateActionHistory(WorkflowActionEventName.Connect);
  }, [updateActionHistory]);

  // ----------------------------------------------------------------------------------------------------

  const edgeReconnectSuccessful = useRef<boolean>(true);

  /** 边重新连接开始 */
  const onReconnectStart: OnReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  /** 边重新连接成功时 */
  const onReconnect: OnReconnect<CustomEdgeType> = useCallback(
    (oldEdge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));

      if (!(oldEdge.target === newConnection.target)) {
        updateActionHistory(WorkflowActionEventName.Reconnect);
      }
    },
    [setEdges, updateActionHistory],
  );

  /** 边重新连接结束 ( 无论连接成功或失败 ) */
  const onReconnectEnd: OnReconnectEnd = useCallback(
    async (_, edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        updateActionHistory(WorkflowActionEventName.DeleteEdgeByDrop);
      }
      edgeReconnectSuccessful.current = true;
    },
    [setEdges, updateActionHistory],
  );

  // ----------------------------------------------------------------------------------------------------

  /** 判断是否可以连接 */
  const isValidConnection: IsValidConnection = useCallback((): boolean => {
    // 渲染次数过多，不建议在此处作处理
    return true;
  }, []);

  return {
    onConnectStart,
    onConnect,
    onConnectEnd,
    onHandlerConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    isValidConnection,
  };
}
