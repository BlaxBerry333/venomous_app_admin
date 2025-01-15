import type { NamedExoticComponent, PropsWithChildren } from "react";
import type { TemporalState } from "zundo";
import type { WorkflowElementsType } from "~/common/types/dashboard-workflow";
import type {
  WorkflowActionHistoryStoreContextType,
  WorkflowActionHistoryStoreType,
} from "./WorkflowActionHistoryStoreContext";

import { memo, useMemo } from "react";
import { useStore } from "zustand";

import { INITIAL_WORKFLOW_ELEMENTS } from "~/sections/dashboard-workflow/_helpers/constants";
import {
  createWorkflowActionHistoryStore,
  WorkflowActionHistoryStoreContext,
} from "./WorkflowActionHistoryStoreContext";

const WorkflowActionHistoryContextProvider: NamedExoticComponent<
  PropsWithChildren<{ originalElements: WorkflowElementsType }>
> = memo(({ children, originalElements = INITIAL_WORKFLOW_ELEMENTS }) => {
  const useWorkflowActionHistoryStore = createWorkflowActionHistoryStore({
    elements: originalElements,
  });

  const workflowActionHistoryStore = useWorkflowActionHistoryStore();

  const { futureStates, pastStates, clear, undo, redo } = useStore(
    useWorkflowActionHistoryStore.temporal,
    (state: TemporalState<WorkflowActionHistoryStoreType>) => state,
  );

  const memorizedContextValue = useMemo<WorkflowActionHistoryStoreContextType>(
    () => ({
      currentState: workflowActionHistoryStore.state,
      futureStates: futureStates as WorkflowActionHistoryStoreType[],
      pastStates: pastStates as WorkflowActionHistoryStoreType[],
      updateState: workflowActionHistoryStore.update,
      clear,
      undo,
      redo,
    }),
    [workflowActionHistoryStore, futureStates, pastStates, clear, undo, redo],
  );

  return (
    <WorkflowActionHistoryStoreContext.Provider value={memorizedContextValue}>
      {children}
    </WorkflowActionHistoryStoreContext.Provider>
  );
});

export default WorkflowActionHistoryContextProvider;
