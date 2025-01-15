import type { NamedExoticComponent, PropsWithChildren } from "react";
import type { NotNullable } from "~/common/types/tools";
import type { WorkflowOriginalDataContextType } from "./WorkflowOriginalDataContext";

import { memo, useMemo } from "react";
import { INITIAL_WORKFLOW_ELEMENTS } from "~/sections/dashboard-workflow/_helpers/constants";
import { WorkflowOriginalDataContext } from "./WorkflowOriginalDataContext";

const WorkflowDataContextProvider: NamedExoticComponent<
  PropsWithChildren<NotNullable<WorkflowOriginalDataContextType>>
> = memo(({ children, workflowInfo, originalElements = INITIAL_WORKFLOW_ELEMENTS }) => {
  const memorizedContextValue = useMemo<WorkflowOriginalDataContextType>(
    () => ({
      workflowInfo,
      originalElements,
    }),
    [workflowInfo, originalElements],
  );

  return (
    <WorkflowOriginalDataContext.Provider value={memorizedContextValue}>
      {children}
    </WorkflowOriginalDataContext.Provider>
  );
});

export default WorkflowDataContextProvider;
