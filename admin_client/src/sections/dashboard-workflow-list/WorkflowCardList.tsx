import type { NamedExoticComponent } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import { Icon } from "@iconify/react";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid2";
import MuiTypography from "@mui/material/Typography";

import { darken, lighten } from "@mui/material/styles";
import { CardWithPulldownMenuList } from "~/common/components/custom/cards";
import { CustomNormalListItem } from "~/common/components/custom/list";
import { CustomLoadingScreen } from "~/common/components/custom/loadings";
import useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import type { Nullable } from "~/common/types/tools";
import { formatDate } from "~/common/utils/handle-date-formatters";
import type { DRFWorkflowDataType } from "~/services/types/workflow";
import WorkflowCardCreateDialog from "./WorkflowCardCreateDialog";
import WorkflowCardDeleteConfirmDialog from "./WorkflowCardDeleteConfirmDialog";
import WorkflowCardDownloadAllDialog from "./WorkflowCardDownloadAllDialog";
import WorkflowCardEditDialog from "./WorkflowCardEditDialog";

const WorkflowCardList: NamedExoticComponent<{
  cardListData: Array<DRFWorkflowDataType>;
  navigateToSpecificWorkflow: (id: number) => void;
  // ---

  dataSource: Array<DRFWorkflowDataType>;
  isLoading: boolean;
}> = memo(({ cardListData, navigateToSpecificWorkflow, dataSource = [], isLoading }) => {
  const { t } = useTranslation();

  // ----------------------------------------------------------------------------------------------------

  const [selectedWorkflowId, setSelectedWorkflowId] = useState<Nullable<number>>(null);

  const selectedWorkflowItemData = useMemo<DRFWorkflowDataType | undefined>(
    () => cardListData.find((item) => item.id === selectedWorkflowId),
    [cardListData, selectedWorkflowId],
  );

  const clearSelectedWorkflowId = useCallback((): void => {
    setSelectedWorkflowId(null);
  }, []);

  // ----------------------------------------------------------------------------------------------------

  const createDialog = useBoolean(false);
  const editDialog = useBoolean(false);
  const deleteConfirmDialog = useBoolean(false);
  const downloadAllDialog = useBoolean(false);

  const handleOpenDeleteConfirmDialog = useCallback(
    (id: number): void => {
      setSelectedWorkflowId(id);
      deleteConfirmDialog.setTrue();
    },
    [deleteConfirmDialog],
  );

  const handleOpenCreateDialog = useCallback((): void => {
    createDialog.setTrue();
  }, [createDialog]);

  const handleOpenEditDialog = useCallback(
    (id: number): void => {
      setSelectedWorkflowId(id);
      editDialog.setTrue();
    },
    [editDialog],
  );

  const handleOpenDownloadAllDialog = useCallback((): void => {
    downloadAllDialog.setTrue();
  }, [downloadAllDialog]);

  // ----------------------------------------------------------------------------------------------------

  if (isLoading) {
    return <CustomLoadingScreen />;
  }

  if (!dataSource.length) {
    return <MuiTypography>データがありません</MuiTypography>;
  }

  return (
    <>
      <MuiBox
        sx={{
          minHeight: "calc(100svh - 225px)",
          height: "calc(100svh - 225px)",
          maxHeight: "calc(100svh - 225px)",
        }}
      >
        <MuiGrid container spacing={2} sx={{ p: 2 }}>
          {/* 操作卡片 */}
          <MuiGrid size={{ xs: 6, lg: 4 }} sx={{ position: "sticky", top: 0, left: 0, zIndex: 1 }}>
            <CardWithPulldownMenuList
              onlyWrapper
              showActionMenu={false}
              sx={{
                boxShadow: 4,
                transition: "background-color 0s",
                backgroundColor: ({ palette: { mode, primary } }) =>
                  mode === "dark" ? darken(primary.dark, 0.8) : lighten(primary.light, 0.8),
                color: ({ palette: { mode, primary } }) =>
                  mode === "dark" ? primary.light : primary.dark,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {[
                {
                  icon: <Icon icon="solar:add-circle-line-duotone" />,
                  title: t("workflow.workflow-data-create.create-new-blank"),
                  onClick: handleOpenCreateDialog,
                },
                {
                  icon: <Icon icon="solar:export-linear" />,
                  title: t("workflow.workflow-data-create.import-local-workflow"),
                  onClick: () => {},
                  disabled: true,
                },
                {
                  icon: <Icon icon="solar:import-linear" />,
                  title: t("workflow.workflow-data-create.export-all-workflow"),
                  onClick: handleOpenDownloadAllDialog,
                },
              ].map(({ icon, title, onClick, disabled }) => (
                <CustomNormalListItem
                  key={title}
                  icon={icon}
                  MuiListItemTextProps={{ primary: title }}
                  MuiListItemButtonProps={{ sx: { py: 0.5, px: 1, mb: 0 }, disabled, onClick }}
                />
              ))}
            </CardWithPulldownMenuList>
          </MuiGrid>

          {/* 流程图卡片 */}
          {dataSource.map((item) => (
            <MuiGrid key={item.id} size={{ xs: 6, lg: 4 }}>
              <CardWithPulldownMenuList
                primaryTitle={item.name}
                secondaryTitle={
                  <>
                    <div>
                      <strong>{t("common.labels.created_at")}</strong>&nbsp;&nbsp;
                      {formatDate(item.created_at)}
                    </div>
                    <div>
                      <strong>{t("common.labels.created_at")}</strong>&nbsp;&nbsp;
                      {formatDate(item.updated_at)}
                    </div>
                  </>
                }
                sx={{
                  "&:hover": { boxShadow: 8 },
                  transition: "outline 0.15s, box-shadow 0.5s",
                  ...(item.id === selectedWorkflowId
                    ? { outline: 3, outlineColor: ({ palette }) => palette.primary.main }
                    : {}),
                }}
                onClick={() => handleOpenEditDialog(item.id)}
                actionMenuListWidth={220}
                actionMenuList={[
                  {
                    icon: <Icon icon="solar:trash-bin-trash-bold-duotone" />,
                    label: t("common.buttons.delete"),
                    onClick: () => handleOpenDeleteConfirmDialog(item.id),
                    isErrorAction: true,
                  },
                  {
                    icon: <Icon icon="solar:routing-3-bold-duotone" />,
                    label: t("workflow.workflow-data.playground"),
                    onClick: () => navigateToSpecificWorkflow(item.id),
                  },
                ]}
              />
            </MuiGrid>
          ))}
        </MuiGrid>
      </MuiBox>

      {/* 删除确认 Dialog */}
      <WorkflowCardDeleteConfirmDialog
        confirmDialog={deleteConfirmDialog}
        selectedWorkflowId={selectedWorkflowId}
        clearSelectedWorkflowId={clearSelectedWorkflowId}
      />

      {/* 编辑流程图 Dialog */}
      <WorkflowCardEditDialog
        confirmDialog={editDialog}
        selectedWorkflowId={selectedWorkflowId}
        workflowData={selectedWorkflowItemData}
        clearSelectedWorkflowId={clearSelectedWorkflowId}
      />

      {/* 新建流程图 Dialog */}
      <WorkflowCardCreateDialog confirmDialog={createDialog} />

      {/* 文件下载 Dialog */}
      <WorkflowCardDownloadAllDialog confirmDialog={downloadAllDialog} />
    </>
  );
});

export default WorkflowCardList;
