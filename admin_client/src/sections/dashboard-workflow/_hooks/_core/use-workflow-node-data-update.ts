import type {
  CustomNodeDataFormValueType,
  CustomNodeType,
} from "~/common/types/dashboard-workflow";

import { isEqual } from "lodash-es";
import { useCallback } from "react";
import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { useWorkflowActionHistoryStoreUndoRedo } from "./use-workflow-action-history-store";
import useWorkflowInstance from "./use-workflow-instance";

export default function useWorkflowNodeDataUpdate() {
  const { updateNodeData, getNode } = useWorkflowInstance();
  const { updateActionHistory } = useWorkflowActionHistoryStoreUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  /** 更新指定节点中的表单数据 */
  const updateSpecificNodeFormValue = useCallback(
    (nodeId: CustomNodeType["id"], nodeFormValue: Required<CustomNodeDataFormValueType>) => {
      if (isEqual(nodeFormValue, getNode(nodeId)?.data.form?.value)) {
        return;
      }
      updateNodeData(nodeId, {
        form: {
          isValid: true,
          value: nodeFormValue,
        },
      });

      updateActionHistory(WorkflowActionEventName.UpdateNodeData);
    },
    [updateNodeData, updateActionHistory, getNode],
  );

  return {
    updateSpecificNodeFormValue,
  };
}
