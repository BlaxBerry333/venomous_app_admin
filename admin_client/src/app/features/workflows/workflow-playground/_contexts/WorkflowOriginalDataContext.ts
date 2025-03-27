import { createContext, useContext } from "react";

import type { Workflows } from "~/app/features/workflows/_types";
import type { IWorkflowDataResponse } from "~/utils/libs/apis/types/_workflow";

export type WorkflowOriginalDataContextType = {
  information: undefined | Pick<IWorkflowDataResponse, "id" | "name" | "createdAt" | "updatedAt">;
  originalElement: undefined | Workflows.Element;
};

const WorkflowOriginalDataContextDefaultValue: WorkflowOriginalDataContextType = {
  information: {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  },
  originalElement: {
    nodes: [],
    edges: [],
  },
};

// ----------------------------------------------------------------------------------------------------

export const WorkflowOriginalDataContext = createContext<WorkflowOriginalDataContextType>(
  WorkflowOriginalDataContextDefaultValue,
);

export function useWorkflowOriginalData(): WorkflowOriginalDataContextType {
  const context = useContext(WorkflowOriginalDataContext);
  if (!context) {
    throw new Error(
      "useWorkflowOriginalData must be used within WorkflowOriginalDataContext.Provider",
    );
  }
  return context;
}
