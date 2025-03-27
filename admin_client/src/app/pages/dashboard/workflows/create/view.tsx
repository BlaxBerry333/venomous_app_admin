import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import {
  DashboardWorkflowsCommonDetailPaper,
  DashboardWorkflowsCreateForm,
} from "~/app/features/workflows/workflow-detail";
import { toast } from "~/ui/components";
import { useAPIWorkflowDataCrete } from "~/utils/libs/apis/_hooks/workflows";
import type { IWorkflowDataResponse } from "~/utils/libs/apis/types/_workflow";
import { DASHBOARD_PATHS, useRouteNavigate } from "~/utils/libs/router";

const DashboardWorkflowsCreatePageView: NamedExoticComponent = memo(() => {
  const { create, isCreating } = useDashboardWorkflowsCreateView();

  return (
    <DashboardWorkflowsCommonDetailPaper title="Workflow Create" keepSubTitlePlaceholder>
      <DashboardWorkflowsCreateForm isLoading={isCreating} onSubmit={create} />
    </DashboardWorkflowsCommonDetailPaper>
  );
});

export default DashboardWorkflowsCreatePageView;

// ----------------------------------------------------------------------------------------------------

function useDashboardWorkflowsCreateView() {
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
