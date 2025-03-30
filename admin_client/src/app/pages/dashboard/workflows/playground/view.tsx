import { memo, useMemo, type NamedExoticComponent } from "react";

import {
  WorkflowPlayground,
  WorkflowPlaygroundWrapper,
} from "~/app/features/workflows/workflow-playground";
import { transformElementFromBackendToFrontend } from "~/app/features/workflows/workflow-playground/_helpers";
import { FullPageLoading } from "~/ui/components";
import { useAPIWorkflowDataDetail } from "~/utils/libs/apis/_hooks/workflows";
import { DASHBOARD_PATHS, useRouteRedirect, useRouteSearchParams } from "~/utils/libs/router";

const DashboardWorkflowsPlaygroundView: NamedExoticComponent = memo(() => {
  const { information, element, isLoading } = useDashboardWorkflowsPlaygrounView();

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <WorkflowPlaygroundWrapper information={information} originalElement={element}>
      <WorkflowPlayground />
    </WorkflowPlaygroundWrapper>
  );
});

export default DashboardWorkflowsPlaygroundView;

// ----------------------------------------------------------------------------------------------------

function useDashboardWorkflowsPlaygrounView() {
  const { data: dataSource, isLoading, failureReason } = useAPIWorkflowDataDetail();

  const { id } = useRouteSearchParams<{ id: string }>();
  const shouldRedirect: boolean = !id || !!failureReason;
  useRouteRedirect(shouldRedirect, DASHBOARD_PATHS.workflows.list);

  const information = useMemo(() => {
    if (!dataSource) return undefined;
    return {
      id: dataSource.id,
      name: dataSource.name,
      createdAt: dataSource.createdAt,
      updatedAt: dataSource.updatedAt,
    };
  }, [dataSource]);

  const element = useMemo(() => {
    if (!dataSource) return undefined;
    return transformElementFromBackendToFrontend(JSON.parse(dataSource.element));
  }, [dataSource]);

  return {
    information,
    element,
    isLoading,
  };
}
