import type { NotNullable } from "~/common/types/tools";
import type { WorkflowOriginalDataContextType } from "~/sections/dashboard-workflow/_contexts/WorkflowOriginalDataContext";
import type { WorkflowWidgetStatusContextType } from "~/sections/dashboard-workflow/_contexts/WorkflowWidgetStatusContext";

import { useContext } from "react";
import { WorkflowOriginalDataContext } from "~/sections/dashboard-workflow/_contexts/WorkflowOriginalDataContext";
import { WorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_contexts/WorkflowWidgetStatusContext";

export function useWorkflowOriginalDataContext(): NotNullable<WorkflowOriginalDataContextType> {
  const context = useContext<WorkflowOriginalDataContextType>(WorkflowOriginalDataContext);
  if (!context) {
    throw new Error(
      "useWorkflowOriginalData hook must be used within a <WorkflowOriginalDataContext.Provider>",
    );
  }
  return {
    workflowInfo: context.workflowInfo,
    originalElements: context.originalElements,
  };
}

export function useWorkflowWidgetStatusContext(): NotNullable<WorkflowWidgetStatusContextType> {
  const context = useContext<WorkflowWidgetStatusContextType>(WorkflowWidgetStatusContext);
  if (!context) {
    throw new Error(
      "useWorkflowWidgetStatus hook must be used within a <WorkflowWidgetStatusContext.Provider>",
    );
  }
  return {
    canvasBackground: context.canvasBackground,
    specificNodeFormWidget: context.specificNodeFormWidget,
  };
}
