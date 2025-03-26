import type { NamedExoticComponent } from "react";
import { memo, Suspense } from "react";

import { useDashboardWorkflowsListView } from "~/app/features/workflows/_hooks";
import { DashboardWorkflowsListItem } from "~/app/features/workflows/workflow-list";
import { useDashboardWorkflowsListViewConfirmModalOfDelete } from "~/app/features/workflows/workflow-list/_hooks";
import { FullPageLoading, Modal, VirtualGrid } from "~/ui/components";
import { useRouteNavigate } from "~/utils/libs/router";

const DashboardWorkflowsListView: NamedExoticComponent = memo(() => {
  const { push } = useRouteNavigate();

  const { data, isLoading, remove, isRemoving, selectedId, setSelectedId } =
    useDashboardWorkflowsListView();

  const {
    isOpenConfirmModalOfRemove,
    handleOpenConfirmModalOfRemove,
    handleCloseConfirmModalOfRemove,
  } = useDashboardWorkflowsListViewConfirmModalOfDelete({ setSelectedId });

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
      <VirtualGrid
        list={data}
        cols={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
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
