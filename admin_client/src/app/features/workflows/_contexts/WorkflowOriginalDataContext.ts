import { createContext, useContext } from "react";

import type { Workflows } from "~/app/features/workflows/_types";
import type { IWorkflowDataResponse } from "~/app/types/_workflow";

export type WorkflowOriginalDataContextType = {
  information: Partial<Pick<IWorkflowDataResponse, "id" | "name" | "created_at">>;
  originalElement: undefined | Workflows.Element;
};

const WorkflowOriginalDataContextDefaultValue: WorkflowOriginalDataContextType = {
  information: {
    id: "",
    name: "",
    created_at: "",
  },
  originalElement: {
    nodes: [],
    edges: [],
  },
};

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
