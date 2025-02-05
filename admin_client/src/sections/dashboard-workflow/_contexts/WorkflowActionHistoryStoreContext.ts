import type {
  WorkflowActionEventName,
  WorkflowElementsType,
} from "~/common/types/dashboard-workflow";
import type { Nullable } from "~/common/types/tools";

import { createContext } from "react";
import { temporal } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";
import { INITIAL_WORKFLOW_ELEMENTS } from "~/sections/dashboard-workflow/_helpers/constants";

export type WorkflowActionHistoryStoreContextType = Nullable<{
  currentState: WorkflowActionHistoryStoreType["state"];
  futureStates: WorkflowActionHistoryStoreType[];
  pastStates: WorkflowActionHistoryStoreType[];
  updateState: WorkflowActionHistoryStoreType["update"];
  clear: VoidFunction;
  undo: (steps?: number) => void;
  redo: (steps?: number) => void;
}>;

export const WorkflowActionHistoryStoreContext =
  createContext<WorkflowActionHistoryStoreContextType>(null);

// ----------------------------------------------------------------------------------------------------

export type WorkflowActionHistoryStoreType = {
  state: WorkflowActionHistoryStoreStateType;
  update: (state: WorkflowActionHistoryStoreStateType) => void;
};

type WorkflowActionHistoryStoreStateType = {
  actionEventName: WorkflowActionEventName | null;
  elements: WorkflowElementsType;
};

export function createWorkflowActionHistoryStore(params: { elements: WorkflowElementsType }) {
  return create(
    devtools(
      temporal<WorkflowActionHistoryStoreType>(
        (set) => {
          const defaultState: WorkflowActionHistoryStoreStateType = {
            actionEventName: null,
            elements: params.elements || INITIAL_WORKFLOW_ELEMENTS,
          };
          return {
            state: defaultState,
            clear: () => set({ state: defaultState }),
            update: (state: WorkflowActionHistoryStoreStateType) => set({ state }),
          };
        },
        { limit: DASHBOARD_WORKFLOW_CONFIGS.FlowUndoRedoHistoryMaxCount },
      ),
    ),
  );
}
