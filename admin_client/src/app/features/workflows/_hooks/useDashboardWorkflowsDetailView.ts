import { useCallback } from "react";

import type { IWorkflowDataResponse } from "~/app/types/_workflow";
import { toast } from "~/ui/components";
import {
  useAPIWorkflowDataDetail,
  useAPIWorkflowDataUpdate,
} from "~/utils/libs/apis/_hooks/workflows";
import {
  DASHBOARD_PATHS,
  useRouteNavigate,
  useRouteRedirect,
  useRouteSearchParams,
} from "~/utils/libs/router";

export default function useDashboardWorkflowsDetailView() {
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
          toast.success(`#${data.id} updated successfully`);
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
