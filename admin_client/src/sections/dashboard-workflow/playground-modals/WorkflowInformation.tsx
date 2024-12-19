import type { NamedExoticComponent } from "react";

import MuiTooltip from "@mui/material/Tooltip";
import MuiTypography from "@mui/material/Typography";
import { memo } from "react";

import { useWorkflowOriginalDataContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";

const WorkflowInformation: NamedExoticComponent = memo(() => {
  const { workflowInfo } = useWorkflowOriginalDataContext();

  return (
    <MuiTooltip
      arrow
      placement="right"
      title={
        <>
          <MuiTypography variant="subtitle2">{workflowInfo.title}</MuiTypography>
          <MuiTypography variant="caption" component="p">
            {workflowInfo.updatedAt}
          </MuiTypography>
          <MuiTypography variant="caption" component="p">
            {workflowInfo.createdAt}
          </MuiTypography>
        </>
      }
    >
      <MuiTypography
        component="div"
        variant="caption"
        noWrap
        sx={(theme) => ({
          minWidth: "100px",
          maxWidth: "200px",
          fontWeight: 600,
          backgroundColor:
            theme.palette.mode === "dark" ? "rgba(44, 44, 44)" : "rgba(229, 229, 229)",
          px: 1,
          py: 0.5,
          borderRadius: 2,
          cursor: "pointer",
        })}
      >
        {workflowInfo.title}
      </MuiTypography>
    </MuiTooltip>
  );
});

export default WorkflowInformation;
