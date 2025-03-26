import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { useDashboardWorkflowsDetailView } from "~/app/features/workflows/_hooks";
import {
  DashboardWorkflowsCommonDetailPaper,
  DashboardWorkflowsDetailForm,
} from "~/app/features/workflows/workflow-detail";
import { FullPageLoading } from "~/ui/components";

const DashboardWorkflowsDetailPageView: NamedExoticComponent = memo(() => {
  const { data, isLoading, update, isUpdating } = useDashboardWorkflowsDetailView();

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <DashboardWorkflowsCommonDetailPaper title="Workflow Detail" subTitle={`#${data?.id}`}>
      <DashboardWorkflowsDetailForm defaultValues={data} isLoading={isUpdating} onSubmit={update} />
    </DashboardWorkflowsCommonDetailPaper>
  );
});

export default DashboardWorkflowsDetailPageView;
