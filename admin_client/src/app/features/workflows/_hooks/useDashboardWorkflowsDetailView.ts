import { useEffect, useMemo } from "react";

import type { Workflows } from "~/app/features/workflows/_types";
import type { IWorkflowDataResponse } from "~/app/types/_workflow";
import { useGetWorkflowData } from "~/utils/libs/apis/_hooks/workflows";
import { DASHBOARD_PATHS, useRouteNavigate } from "~/utils/libs/router";

export default function useDashboardWorkflowsDetailView() {
  const { replace } = useRouteNavigate();

  const {
    data: dataSource,
    isLoading,
    failureReason,
  } = useGetWorkflowData<IWorkflowDataResponse>();

  const data = useMemo(
    () => ({
      ...dataSource,
      element: _formatResponseElementToWorkflowElement(dataSource?.element),
    }),
    [dataSource],
  );

  useEffect(() => {
    if (failureReason) {
      replace(DASHBOARD_PATHS.workflows.list);
    }
  }, [failureReason, replace]);

  return {
    data,
    isLoading,
  };
}

function _formatResponseElementToWorkflowElement(
  element: undefined | IWorkflowDataResponse["element"],
): Workflows.Element {
  return {
    nodes: (element?.nodes || []) as Workflows.Node[],
    edges: (element?.edges || []) as Workflows.Edge[],
  };
}
