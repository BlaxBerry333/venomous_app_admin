import { useHotkeys } from "react-hotkeys-hook";

import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";
import { useWorkflowActionHistoryStoreUndoRedo } from "./use-workflow-action-history-store";
import useWorkflowNodesCopyPasteDelete from "./use-workflow-nodes-copy-paste-delete";

export default function useWorkflowHotkeys(): void {
  const { copySelectedNodes, pasteStoredNodes, deleteSelectedElements } =
    useWorkflowNodesCopyPasteDelete();

  const { canUndo, canRedo, undo, redo } = useWorkflowActionHistoryStoreUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.CopyNode,
    () => copySelectedNodes(),
    { enabled: true, preventDefault: true },
    [copySelectedNodes],
  );

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.PasteNode,
    () => pasteStoredNodes(),
    { enabled: true, preventDefault: true },
    [pasteStoredNodes],
  );

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.DeleteElements,
    () => deleteSelectedElements(),
    { enabled: true, preventDefault: true },
    [deleteSelectedElements],
  );

  // ----------------------------------------------------------------------------------------------------

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.Undo,
    () => {
      if (canUndo) undo();
    },
    { enabled: canUndo, preventDefault: true },
    [undo, canUndo],
  );

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.Redo,
    () => {
      if (canRedo) redo();
    },
    { enabled: canRedo, preventDefault: true },
    [redo, canRedo],
  );
}
