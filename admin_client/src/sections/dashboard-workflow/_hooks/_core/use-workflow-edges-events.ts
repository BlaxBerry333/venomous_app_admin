import type { OnEdgesDelete } from "@xyflow/react";
import type { CustomEdgeType } from "~/common/types/dashboard-workflow";

import { useCallback } from "react";

export default function useWorkflowEdgesEvents() {
  /** 受控组件写法：监听边的变化 ( 选中、删除、更新 ) */
  // const onEdgesChange: OnEdgesChange = useCallback((changes) => {
  //   console.log("onEdgesChange", changes);
  // }, []);

  // ----------------------------------------------------------------------------------------------------

  /** 边被删除时 */
  const onEdgesDelete: OnEdgesDelete<CustomEdgeType> = useCallback(() => {
    // 不建议使用该事件记录 UndoRedo, 建议关闭默认删除热键并通过自定义 Hotkey 处理
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return {
    onEdgesDelete,
  };
}
