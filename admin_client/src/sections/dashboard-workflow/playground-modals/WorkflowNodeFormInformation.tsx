import type { NamedExoticComponent } from "react";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";

import MuiCard from "@mui/material/Card";
import { memo } from "react";

import useWorkflowInstance from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-instance";
import { useWorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";

export const WORKFLOW_NODE_FORM_INFORMATION_ID = "workflow-node-form-information";

const WorkflowNodeFormInformation: NamedExoticComponent = memo(() => {
  const { getNodes } = useWorkflowInstance();

  const { specificNodeFormWidget } = useWorkflowWidgetStatusContext();

  return (
    <ClickAwayListener
      onClickAway={() => {
        const isOnlyAnotherOneNodeSelected = getNodes().filter((n) => n.selected).length === 1;
        if (!isOnlyAnotherOneNodeSelected) {
          specificNodeFormWidget.clearSpecificNodeId();
        }
      }}
    >
      <MuiCard
        id={WORKFLOW_NODE_FORM_INFORMATION_ID}
        sx={{
          display: specificNodeFormWidget.specificNodeId ? "block" : "none",
          minHeight: 600,
          width: 295,
          position: "absolute",
          bottom: 48,
          right: 0,
          zIndex: 9999,
          py: 1,
          px: 0,
          border: 1,
          borderColor: "divider",
        }}
      />
    </ClickAwayListener>
  );
});

export default WorkflowNodeFormInformation;
