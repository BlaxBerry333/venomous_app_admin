import type { WorkflowElementsType, WorkflowInfoType } from "~/common/types/dashboard-workflow";
import type { Nullable } from "~/common/types/tools";

import { createContext } from "react";

export type WorkflowOriginalDataContextType = Nullable<{
  workflowInfo: WorkflowInfoType;
  originalElements: WorkflowElementsType;
}>;

export const WorkflowOriginalDataContext = createContext<WorkflowOriginalDataContextType>(null);
