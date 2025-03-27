import type { NamedExoticComponent } from "react";
import { memo, Suspense, useCallback, useMemo, useState } from "react";

import { DashboardWorkflowsListItem } from "~/app/features/workflows/workflow-list";
import { useWorkflowsListConfirmModalOfDelete } from "~/app/features/workflows/workflow-list/_hooks";
import { FullPageLoading, Modal, toast, VirtualGrid } from "~/ui/components";
import {
  useAPIWorkflowDataCrete,
  useAPIWorkflowDataDelete,
  useAPIWorkflowsDataList,
} from "~/utils/libs/apis/_hooks/workflows";
import type {
  IWorkflowDataListResponse,
  IWorkflowDataResponse,
} from "~/utils/libs/apis/types/_workflow";
import { useRouteNavigate } from "~/utils/libs/router";

const DashboardWorkflowsListView: NamedExoticComponent = memo(() => {
  const { push } = useRouteNavigate();

  const { data, isLoading, remove, isRemoving, selectedId, setSelectedId } =
    useDashboardWorkflowsListView();

  const {
    isOpenConfirmModalOfRemove,
    handleOpenConfirmModalOfRemove,
    handleCloseConfirmModalOfRemove,
  } = useWorkflowsListConfirmModalOfDelete({ setSelectedId });

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
      <VirtualGrid
        list={data}
        cols={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        renderGridItem={(item) => (
          <DashboardWorkflowsListItem
            item={item}
            selectedItemId={selectedId}
            handleNavigate={push}
            openConfirmModalOfRemove={handleOpenConfirmModalOfRemove(item.id)}
          />
        )}
      />

      {/* Delete Confirm Modal */}
      <Suspense fallback={null}>
        <Modal
          escapeKeyDown
          isOpen={isOpenConfirmModalOfRemove}
          closeModal={handleCloseConfirmModalOfRemove}
          title={`删除工作流 #${selectedId}`}
          message="你确定要删除这个工作流吗?"
          isConfirmLoading={isRemoving}
          handleConfirm={remove}
          cancelText="取消"
          confirmText="删除"
        />
      </Suspense>
    </>
  );
});

export default DashboardWorkflowsListView;

// ----------------------------------------------------------------------------------------------------

function useDashboardWorkflowsListView() {
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
