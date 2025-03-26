import { memo, type NamedExoticComponent } from "react";

import { useDashboardWorkflowsPlaygrounView } from "~/app/features/workflows/_hooks";
import { mock_nodes } from "~/app/features/workflows/_hooks/useDashboardWorkflowsPlaygrounView";
import {
  WorkflowPlayground,
  WorkflowPlaygroundWrapper,
} from "~/app/features/workflows/workflow-playground";
import { FullPageLoading } from "~/ui/components";

const DashboardWorkflowsPlaygroundView: NamedExoticComponent = memo(() => {
  const { data, isLoading } = useDashboardWorkflowsPlaygrounView();

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <WorkflowPlaygroundWrapper
      information={{ id: data?.id, name: data?.name, created_at: data?.created_at }}
      originalElement={{
        nodes: mock_nodes,
        edges: [],
      }}
    >
      <WorkflowPlayground />
    </WorkflowPlaygroundWrapper>
  );
});

export default DashboardWorkflowsPlaygroundView;
