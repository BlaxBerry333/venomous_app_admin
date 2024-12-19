import { useCallback } from "react";

import useWorkflowInstance from "./_core/use-workflow-instance";
import { useWorkflowOriginalDataContext } from "./use-workflow-custom-context";

export default function useWorkflowRecord() {
  const { setElements } = useWorkflowInstance();
  const { originalElements } = useWorkflowOriginalDataContext();

  // ----------------------------------------------------------------------------------------------------

  /**
   * 回退到指定的历史记录
   */
  const rollbackToSpecificRecord = useCallback(() => {
    // ...
  }, []);

  /**
   * 回退到最新的历史记录 ( 当前 )
   */
  const rollbackToLatestRecord = useCallback(() => {
    setElements(originalElements);
  }, [setElements, originalElements]);

  // ----------------------------------------------------------------------------------------------------

  return {
    rollbackToSpecificRecord,
    rollbackToLatestRecord,
  };
}
