import { ReactFlowProvider } from "@xyflow/react";
import { _MOCK_EDGES, _MOCK_NODES, _MOCK_WORKFLOW_INFO } from "~/__mocks__/_workflow";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import { WorkflowPlaygroundWrapper } from "~/sections/dashboard-workflow/playground";

export default function DashboardWorkflowPlaygroundPageView() {
  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <ReactFlowProvider>
        <WorkflowPlaygroundWrapper
          workflowInfo={_MOCK_WORKFLOW_INFO}
          originalElements={{ nodes: _MOCK_NODES, edges: _MOCK_EDGES }}
        />
      </ReactFlowProvider>
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
