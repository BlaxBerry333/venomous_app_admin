import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense, useCallback, useMemo, useState } from "react";

import {
  ConfirmModalContentOfDownload,
  DashboardWorkflowsListItem,
} from "~/app/features/workflows/workflow-list";
import {
  Button,
  FullPageLoading,
  Icon,
  toast,
  useModalWithRefRef,
  VirtualGrid,
} from "~/ui/components";
import {
  downloadWorkflowData,
  useAPIWorkflowDataCrete,
  useAPIWorkflowDataDelete,
  useAPIWorkflowsDataList,
} from "~/utils/libs/apis/_hooks/workflows";
import type {
  IWorkflowDataListResponse,
  IWorkflowDataResponse,
} from "~/utils/libs/apis/types/_workflow";
import { useRouteNavigate } from "~/utils/libs/router";

const ModalWithRef = lazy(() =>
  import("~/ui/components").then((m) => ({ default: m.ModalWithRef })),
);

const DashboardWorkflowsListView: NamedExoticComponent = memo(() => {
  const { push } = useRouteNavigate();

  const { data, isLoading, remove, isRemoving, download, selectedId, setSelectedId } =
    useDashboardWorkflowsListView();

  const confirmModalOfDownload = useModalWithRefRef();
  const confirmModalOfDelete = useModalWithRefRef();

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Button
        startIcon={<Icon icon="solar:cloud-download-outline" />}
        onClick={confirmModalOfDownload.open}
      >
        下载到本地
      </Button>

      <VirtualGrid
        list={data}
        cols={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        renderGridItem={(item) => (
          <DashboardWorkflowsListItem
            item={item}
            selectedItemId={selectedId}
            openConfirmModalOfRemove={() => {
              setSelectedId(item.id);
              confirmModalOfDelete.open();
            }}
            handleNavigate={push}
            handleDownload={() => {
              download(item.id);
            }}
          />
        )}
      />

      {/* Delete Confirm Modal */}
      <Suspense fallback={null}>
        <ModalWithRef
          ref={confirmModalOfDelete.ref}
          title={`删除工作流 #${selectedId}`}
          content="你确定要删除这个工作流吗?"
          cancelText="取消"
          confirmText="删除"
          isConfirmLoading={isRemoving}
          handleConfirm={remove}
        />
      </Suspense>

      {/* Download Confirm Modal */}
      <Suspense fallback={null}>
        <ModalWithRef ref={confirmModalOfDownload.ref} title={`下载到本地 ( ${data?.length} )`}>
          <ConfirmModalContentOfDownload />
        </ModalWithRef>
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

  const download = useCallback(async (selectedId: string) => {
    downloadWorkflowData(selectedId)
      .then((res) => toast.success(`下载成功！${res?.fileName ?? ""}`))
      .catch((error) => toast.error("下载失败！" + (error as Error).message));
  }, []);

  return {
    data,
    isLoading,
    create,
    isCreating,
    remove,
    isRemoving,
    download,
    selectedId,
    setSelectedId,
  };
}
