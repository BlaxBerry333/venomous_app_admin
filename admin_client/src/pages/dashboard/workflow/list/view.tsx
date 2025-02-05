import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import { ROUTE_PATHS } from "~/common/router";
import { appendQueryParams } from "~/common/utils/handle-route-path";
import WorkflowCardList from "~/sections/dashboard-workflow-list/WorkflowCardList";
import { useGetWorkflowDataList } from "~/services/apis-hooks/workflow";
import type { DRFWorkflowDataType } from "~/services/types/workflow";

export default function DashboardWorkflowListPageView() {
  const { data: dataSource, isLoading } = useGetWorkflowDataList();
  const data = useMemo<Array<DRFWorkflowDataType>>(() => dataSource?.results || [], [dataSource]);

  // ----------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const navigateToSpecificWorkflow = useCallback(
    (id: number): void => {
      const workflowId: string = String(id);
      navigate(appendQueryParams(ROUTE_PATHS.dashboard.workflow.playground, { workflowId }));
    },
    [navigate],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <WorkflowCardList
        cardListData={data}
        navigateToSpecificWorkflow={navigateToSpecificWorkflow}
        dataSource={data}
        isLoading={isLoading}
      />
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
