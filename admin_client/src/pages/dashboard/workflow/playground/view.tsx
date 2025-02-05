import { ReactFlowProvider } from "@xyflow/react";
import { useNavigate } from "react-router-dom";
import { _MOCK_EDGES, _MOCK_NODES } from "~/__mocks__/mocked-data/_workflow";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import useRouteSearchParams from "~/common/hooks/useRouteSearchParams";
import { ROUTE_PATHS } from "~/common/router";
import { WorkflowPlaygroundWrapper } from "~/sections/dashboard-workflow/playground";
import { useGetWorkflowData } from "~/services/apis-hooks/workflow";

export default function DashboardWorkflowPlaygroundPageView() {
  const navigate = useNavigate();

  const { workflowId } = useRouteSearchParams<{ workflowId: string }>({
    callback: async ({ workflowId }) => {
      if (!workflowId) {
        navigate(ROUTE_PATHS.dashboard.workflow.root, { replace: true });
      }
    },
  });

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
