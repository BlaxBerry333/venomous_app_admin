import "@xyflow/react/dist/base.css";
import "./index.css";

import type { NamedExoticComponent } from "react";
import type { WorkflowElementsType, WorkflowInfoType } from "~/common/types/dashboard-workflow";

import MuiCard from "@mui/material/Card";
import { memo } from "react";

import WorkflowActionHistoryContextProvider from "~/sections/dashboard-workflow/_contexts/WorkflowActionHistoryStoreContextProvider";
import WorkflowDataContextProvider from "~/sections/dashboard-workflow/_contexts/WorkflowOriginalDataContextProvider";
import WorkflowWidgetStatusContextProvider from "~/sections/dashboard-workflow/_contexts/WorkflowWidgetStatusContextProvider";
import WorkflowPlayground from "./WorkflowPlayground";

const WorkflowPlaygroundWrapper: NamedExoticComponent<{
  workflowInfo: WorkflowInfoType;
  originalElements: WorkflowElementsType;
}> = memo(({ workflowInfo, originalElements }) => {
  return (
    <MuiCard variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <WorkflowDataContextProvider workflowInfo={workflowInfo} originalElements={originalElements}>
        <WorkflowActionHistoryContextProvider originalElements={originalElements}>
          <WorkflowWidgetStatusContextProvider>
            <WorkflowPlayground elements={originalElements} />
          </WorkflowWidgetStatusContextProvider>
        </WorkflowActionHistoryContextProvider>
      </WorkflowDataContextProvider>
    </MuiCard>
  );
});

export default WorkflowPlaygroundWrapper;
