import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { useDashboardWorkflowsCreateView } from "~/app/features/workflows/_hooks";
import {
  DashboardWorkflowsCommonDetailPaper,
  DashboardWorkflowsCreateForm,
} from "~/app/features/workflows/workflow-detail";

const DashboardWorkflowsCreatePageView: NamedExoticComponent = memo(() => {
  const { create, isCreating } = useDashboardWorkflowsCreateView();

  return (
    <DashboardWorkflowsCommonDetailPaper title="Workflow Create" keepSubTitlePlaceholder>
      <DashboardWorkflowsCreateForm isLoading={isCreating} onSubmit={create} />
    </DashboardWorkflowsCommonDetailPaper>
  );
});

export default DashboardWorkflowsCreatePageView;
