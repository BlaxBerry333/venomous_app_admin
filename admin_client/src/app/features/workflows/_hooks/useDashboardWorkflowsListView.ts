import { useCallback, useMemo, useState } from "react";

import type { IWorkflowDataListResponse, IWorkflowDataResponse } from "~/app/types/_workflow";
import { toast } from "~/ui/components";
import {
  useAPIWorkflowDataCrete,
  useAPIWorkflowDataDelete,
  useAPIWorkflowsDataList,
} from "~/utils/libs/apis/_hooks/workflows";

export default function useDashboardWorkflowsListView() {
  const { data: dataSource, isLoading } = useAPIWorkflowsDataList();
  const { mutateAsync: createAsync, isPending: isCreating } = useAPIWorkflowDataCrete();
  const { mutateAsync: removeAsync, isPending: isRemoving } = useAPIWorkflowDataDelete();

  const data = useMemo<IWorkflowDataListResponse["results"]>(() => {
    if (!dataSource) return [];
    return dataSource.results;
  }, [dataSource]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const create = useCallback(
    async (data: IWorkflowDataResponse) => {
      createAsync(data)
        .then(() => toast.success(`#${data.id} created successfully`))
        .catch(() => toast.error(`Error creating #${data.id}`));
    },
    [createAsync],
  );

  const remove = useCallback(
    async (callback: VoidFunction) => {
      if (!selectedId) return;
      removeAsync(selectedId)
        .then(() => toast.success(`#${selectedId} removed successfully`))
        .catch(() => toast.error(`Error removing #${selectedId}`))
        .finally(() => {
          setSelectedId(null);
          callback();
        });
    },
    [selectedId, removeAsync],
  );

  return {
    data,
    isLoading,
    create,
    isCreating,
    remove,
    isRemoving,
    selectedId,
    setSelectedId,
  };
}
