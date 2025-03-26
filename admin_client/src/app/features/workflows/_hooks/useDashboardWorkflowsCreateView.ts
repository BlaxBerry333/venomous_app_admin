import { useCallback } from "react";

import type { IWorkflowDataResponse } from "~/app/types/_workflow";
import { toast } from "~/ui/components";
import { useAPIWorkflowDataCrete } from "~/utils/libs/apis/_hooks/workflows";
import { DASHBOARD_PATHS, useRouteNavigate } from "~/utils/libs/router";

export default function useDashboardWorkflowsCreateView() {
  const { mutateAsync: createAsync, isPending: isCreating } = useAPIWorkflowDataCrete();

  const { replace } = useRouteNavigate();

  const create = useCallback(
    async (data: Partial<IWorkflowDataResponse>) => {
      createAsync(data)
        .then(({ id }) => {
          toast.success(`created successfully`);
          replace(`${DASHBOARD_PATHS.workflows.playground}?id=${id}`);
        })
        .catch(() => toast.error(`Error creating`));
    },
    [createAsync, replace],
  );

  return {
    create,
    isCreating,
  };
}
