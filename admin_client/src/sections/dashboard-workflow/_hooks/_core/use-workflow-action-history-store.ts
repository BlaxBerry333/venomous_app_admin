import type { TemporalState } from "zundo";
import type { WorkflowElementsType } from "~/common/types/dashboard-workflow";

import { isEqual } from "lodash-es";
import { useCallback, useMemo } from "react";
import { temporal } from "zundo";
import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";

import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";
import { INITIAL_WORKFLOW_ELEMENTS } from "~/sections/dashboard-workflow/_helpers/constants";
import useWorkflowInstance from "./use-workflow-instance";

export function useWorkflowActionHistoryStoreState() {
  const store = workflowActionHistoryStore();
  const { state: currentState, update: updateState } = store;

  const { futureStates, pastStates } = useStore(
    workflowActionHistoryStore.temporal,
    (state: TemporalState<WorkflowActionHistoryStoreType>) => state,
  );

  const isElementsInitd = useMemo<boolean>(() => {
    return !isEqual(currentState.elements, INITIAL_WORKFLOW_ELEMENTS);
  }, [currentState.elements]);

  return {
    currentState,
    futureStates,
    pastStates,
    updateState,
    isElementsInitd,
  };
}

export function useWorkflowActionHistoryStoreUndoRedo() {
  const { getNodes, getEdges } = useWorkflowInstance();

  // ----------------------------------------------------------------------------------------------------

  const { currentState, futureStates, pastStates, updateState } =
    useWorkflowActionHistoryStoreState();

  const { undo, redo, clear } = useStore(
    workflowActionHistoryStore.temporal,
    (state: TemporalState<WorkflowActionHistoryStoreType>) => state,
  );

  // ----------------------------------------------------------------------------------------------------

  const updateActionHistory = useCallback(
    async (actionEventName: WorkflowActionEventName) => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      switch (actionEventName) {
        case WorkflowActionEventName.Init:
        case WorkflowActionEventName.MoveNode:
          updateState({
            actionEventName,
            elements: {
              nodes: getNodes(),
              edges: getEdges(),
            },
          });
          break;

        case WorkflowActionEventName.Connect:
        case WorkflowActionEventName.Reconnect:
        case WorkflowActionEventName.AddNode:
        case WorkflowActionEventName.DeleteNodes:
        case WorkflowActionEventName.DeleteOneNode:
        case WorkflowActionEventName.DeleteEdges:
        case WorkflowActionEventName.DeleteOneEdge:
        case WorkflowActionEventName.DeleteEdgeByLabel:
        case WorkflowActionEventName.DeleteEdgeByDrop:
        case WorkflowActionEventName.DeleteElements:
        case WorkflowActionEventName.UpdateNodeData:
        case WorkflowActionEventName.PastedCopiedNode:
          updateState({
            actionEventName,
            elements: {
              nodes: getNodes().map((n) => ({ ...n, selected: false })),
              edges: getEdges().map((e) => ({ ...e, selected: false })),
            },
          });
          break;

        default:
          break;
      }
    },
    [getEdges, getNodes, updateState],
  );

  // ----------------------------------------------------------------------------------------------------

  return {
    canUndo: !!pastStates.length && currentState.actionEventName !== WorkflowActionEventName.Init,
    canRedo: !!futureStates.length,
    undo,
    redo,
    clear,
    updateActionHistory,
  };
}

// ----------------------------------------------------------------------------------------------------

type WorkflowActionHistoryStoreType = {
  state: WorkflowActionHistoryStoreStateType;
  update: (state: WorkflowActionHistoryStoreStateType) => void;
};

type WorkflowActionHistoryStoreStateType = {
  actionEventName: WorkflowActionEventName | null;
  elements: WorkflowElementsType;
};

const workflowActionHistoryStore = create(
  devtools(
    temporal<WorkflowActionHistoryStoreType>(
      (set) => {
        const defaultState: WorkflowActionHistoryStoreStateType = {
          actionEventName: null,
          elements: INITIAL_WORKFLOW_ELEMENTS,
        };
        return {
          state: defaultState,
          clear: () => set({ state: defaultState }),
          update: (state: WorkflowActionHistoryStoreStateType) => set({ state }),
        };
      },
      { limit: DASHBOARD_WORKFLOW_CONFIGS.UndoRedoHistoryMaxCount },
    ),
  ),
);
