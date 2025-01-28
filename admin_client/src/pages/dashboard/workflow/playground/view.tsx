import { ReactFlowProvider } from "@xyflow/react";
import { _MOCK_EDGES, _MOCK_NODES } from "~/__mocks__/mocked-data/_workflow";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import useWorkflowId from "~/sections/dashboard-workflow/_hooks/use-workflow-id";
import { WorkflowPlaygroundWrapper } from "~/sections/dashboard-workflow/playground";
import { useGetWorkflowData } from "~/services/apis-hooks/workflow";

export default function DashboardWorkflowPlaygroundPageView() {
  const workflowId = useWorkflowId();

  // ----------------------------------------------------------------------------------------------------

  const { data } = useGetWorkflowData(workflowId);
  const originalElements = { nodes: _MOCK_NODES, edges: _MOCK_EDGES };

  // ----------------------------------------------------------------------------------------------------

  if (!data) {
    return null;
  }

  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <ReactFlowProvider>
        <WorkflowPlaygroundWrapper workflowInfo={data} originalElements={originalElements} />
      </ReactFlowProvider>
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
