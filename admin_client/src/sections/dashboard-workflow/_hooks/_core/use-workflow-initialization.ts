import type { OnInit, XYPosition } from "@xyflow/react";
import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";
import type { Nullable } from "~/common/types/tools";

import { useCallback, useEffect, useLayoutEffect } from "react";

import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { getWorkflowStartNode } from "~/sections/dashboard-workflow/_helpers/functions";
import { useWorkflowOriginalDataContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";
import {
  useWorkflowActionHistoryStoreState,
  useWorkflowActionHistoryStoreUndoRedo,
} from "./use-workflow-action-history-store";
import useWorkflowInstance from "./use-workflow-instance";

export default function useWorkflowInitialization() {
  const { setElements, setCenter, getViewport } = useWorkflowInstance();

  const { originalElements } = useWorkflowOriginalDataContext();

  const { currentState, isElementsInitd } = useWorkflowActionHistoryStoreState();
  const { updateActionHistory } = useWorkflowActionHistoryStoreUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  useLayoutEffect(() => {
    // 回退到最新的历史记录
    setElements(originalElements);

    // 将指定位置设为画布的中央
    const firstNode: Nullable<CustomNodeType> = getWorkflowStartNode(originalElements.nodes);
    const { x, y }: XYPosition = firstNode?.position ?? { x: 0, y: 0 };
    setCenter(x, y, { duration: 0, zoom: getViewport().zoom });
  }, [originalElements, setElements, setCenter, getViewport]);

  useEffect(() => {
    if (!isElementsInitd) {
      return;
    }
    setElements(currentState.elements);
  }, [currentState, setElements, isElementsInitd]);

  // ----------------------------------------------------------------------------------------------------

  /** Canvas 初始化结束 */
  const onAfterInit: OnInit<CustomNodeType, CustomEdgeType> = useCallback(() => {
    updateActionHistory(WorkflowActionEventName.Init);
  }, [updateActionHistory]);

  return {
    onAfterInit,
  };
}
