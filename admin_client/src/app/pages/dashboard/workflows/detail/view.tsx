import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import {
  DashboardWorkflowsCommonDetailPaper,
  DashboardWorkflowsDetailForm,
} from "~/app/features/workflows/workflow-detail";
import { FullPageLoading, toast } from "~/ui/components";
import {
  useAPIWorkflowDataDetail,
  useAPIWorkflowDataUpdate,
} from "~/utils/libs/apis/_hooks/workflows";
import type { IWorkflowDataResponse } from "~/utils/libs/apis/types/_workflow";
import {
  DASHBOARD_PATHS,
  useRouteNavigate,
  useRouteRedirect,
  useRouteSearchParams,
} from "~/utils/libs/router";

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

// ----------------------------------------------------------------------------------------------------

function useDashboardWorkflowsDetailView() {
  const { data, isLoading, failureReason } = useAPIWorkflowDataDetail();
  const { mutateAsync: updateAsync, isPending: isUpdating } = useAPIWorkflowDataUpdate();

  const { replace } = useRouteNavigate();
  const { id } = useRouteSearchParams<{ id: string }>();
  const shouldRedirect: boolean = !id || !!failureReason;
  useRouteRedirect(shouldRedirect, DASHBOARD_PATHS.workflows.list);

  const update = useCallback(
    async (data: Partial<IWorkflowDataResponse>) => {
      updateAsync(data)
        .then(({ id }) => {
          toast.success(`#${id} updated successfully`);
          replace(`${DASHBOARD_PATHS.workflows.playground}?id=${id}`);
        })
        .catch(() => toast.error(`Error creating #${data.id}`));
    },
    [updateAsync, replace],
  );

  return {
    data,
    isLoading,
    update,
    isUpdating,
  };
}
