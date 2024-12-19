import type { FC } from "react";
import type { CustomEdgeProps } from "~/common/types/dashboard-workflow";

import { memo, useCallback } from "react";

import { Icon } from "@iconify/react";

import MuiIconButton from "@mui/material/IconButton";
import MuiPaper from "@mui/material/Paper";

import { WorkflowActionEventName } from "~/common/types/dashboard-workflow";
import { useWorkflowActionHistoryStoreUndoRedo } from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-action-history-store";
import useWorkflowInstance from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-instance";

const CustomEdgeWrapperDeleteLabel: FC<{
  edgeProps: CustomEdgeProps;
  edgeLabelProps: {
    labelX: number;
    labelY: number;
  };
}> = ({ edgeProps, edgeLabelProps }) => {
  const { id, selected } = edgeProps;
  const { labelX, labelY } = edgeLabelProps;

  // ----------------------------------------------------------------------------------------------------

  const { updateActionHistory } = useWorkflowActionHistoryStoreUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  const { setEdges } = useWorkflowInstance();

  const handleClickEdgerDeleteLabel = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
    updateActionHistory(WorkflowActionEventName.DeleteEdgeByLabel);
  }, [setEdges, id, updateActionHistory]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiPaper
      className="nodrag nopan"
      style={{
        display: selected ? "flex" : "none",
        position: "absolute",
        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        pointerEvents: "all",
        borderRadius: "50%",
      }}
      variant="outlined"
    >
      <MuiIconButton
        size="medium"
        onClick={handleClickEdgerDeleteLabel}
        color="primary"
        sx={{ padding: 0 }}
      >
        <Icon icon="solar:close-circle-linear" />
      </MuiIconButton>
    </MuiPaper>
  );
};

export default memo(CustomEdgeWrapperDeleteLabel);
