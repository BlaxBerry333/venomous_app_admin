import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import { Icon } from "@iconify/react";

import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardActions from "@mui/material/CardActions";
import MuiCardContent from "@mui/material/CardContent";
import MuiGrid from "@mui/material/Grid2";
import MuiList from "@mui/material/List";
import MuiTypography from "@mui/material/Typography";
import { darken, lighten } from "@mui/material/styles";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { CustomNormalListItem } from "~/common/components/custom/list";
import useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import type { Nullable } from "~/common/types/tools";
import { formatDate } from "~/common/utils/handle-date-formatters";
import type { DRFWorkflowDataType } from "~/services/types/workflow";
import WorkflowCardCreateDialog from "./WorkflowCardCreateDialog";
import WorkflowCardDeleteConfirmDialog from "./WorkflowCardDeleteConfirmDialog";
import WorkflowCardEditDialog from "./WorkflowCardEditDialog";

const WorkflowCardList: NamedExoticComponent<{
  cardListData: Array<DRFWorkflowDataType>;
  navigateToSpecificWorkflow: (id: number) => void;
}> = memo(({ cardListData, navigateToSpecificWorkflow }) => {
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

  // ----------------------------------------------------------------------------------------------------

  if (!cardListData.length) {
    return null;
  }

  return (
    <>
      <MuiGrid container spacing={1}>
        <MuiGrid
          size={{ xs: 12, sm: 6, xl: 4 }}
          sx={{ position: "sticky", top: 0, left: 0, zIndex: 1 }}
        >
          {/* 操作卡片 */}
          <WorkflowCreateCard handleOpenCreateDialog={handleOpenCreateDialog} />
        </MuiGrid>

        {/* 流程图卡片 */}
        {cardListData?.map((item) => (
          <MuiGrid key={item.id} size={{ xs: 12, sm: 6, xl: 4 }}>
            <WorkflowDataCard
              key={item.id}
              workflowItemData={item}
              isSelected={item.id === selectedWorkflowId}
              navigateToSpecificWorkflow={navigateToSpecificWorkflow}
              handleOpenDeleteConfirmDialog={handleOpenDeleteConfirmDialog}
              handleOpenEditDialog={handleOpenEditDialog}
            />
          </MuiGrid>
        ))}
      </MuiGrid>

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
    </>
  );
});

export default WorkflowCardList;

const WorkflowCardWrapper: NamedExoticComponent<PropsWithChildren<MuiCardProps>> = memo(
  ({ children, sx, ...props }) => (
    <MuiCard
      sx={{
        height: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  ),
);

const WorkflowDataCard: NamedExoticComponent<{
  workflowItemData: DRFWorkflowDataType;
  isSelected: boolean;
  navigateToSpecificWorkflow: (id: number) => void;
  handleOpenDeleteConfirmDialog: (id: number) => void;
  handleOpenEditDialog: (id: number) => void;
}> = memo(
  ({
    workflowItemData: item,
    isSelected,
    navigateToSpecificWorkflow,
    handleOpenDeleteConfirmDialog,
    handleOpenEditDialog,
  }) => {
    const { t } = useTranslation();

    return (
      <WorkflowCardWrapper
        sx={{
          cursor: "pointer",
          "&:hover": {
            boxShadow: ({ palette }) => `0px 1px 8px 0px ${palette.text.secondary}`,
          },
          ...(isSelected
            ? { outline: 3, outlineColor: ({ palette }) => palette.primary.main }
            : {}),
        }}
        onClick={() => handleOpenEditDialog(item.id)}
      >
        <MuiCardContent>
          <MuiTypography variant="subtitle1" noWrap sx={{ mb: 1 }}>
            {item.name}
          </MuiTypography>
          <MuiTypography component="p" variant="caption" color="text.secondary">
            <strong>{t("workflow.workflow-data.updated_at")}</strong>
            {": "}
            {formatDate(item.updated_at)}
          </MuiTypography>
          <MuiTypography component="p" variant="caption" color="text.secondary">
            <strong>{t("workflow.workflow-data.created_at")}</strong>
            {": "}
            {formatDate(item.created_at)}
          </MuiTypography>
        </MuiCardContent>
        <MuiCardActions
          sx={{
            justifyContent: "flex-end",
            float: "inline-end",
            position: "sticky",
            right: 0,
            bottom: 0,
            px: 2,
            pb: 2,
          }}
        >
          <CustomSquareBlock
            color="error"
            tooltip={t("common.buttons.delete")}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDeleteConfirmDialog(item.id);
            }}
          >
            <Icon icon="solar:trash-bin-trash-bold-duotone" width={20} />
          </CustomSquareBlock>
          <CustomSquareBlock
            color="primary"
            tooltip={t("workflow.workflow-data.playground")}
            onClick={(e) => {
              e.stopPropagation();
              navigateToSpecificWorkflow(item.id);
            }}
          >
            <Icon icon="solar:routing-3-bold-duotone" width={20} />
          </CustomSquareBlock>
        </MuiCardActions>
      </WorkflowCardWrapper>
    );
  },
);

const WorkflowCreateCard: NamedExoticComponent<{
  handleOpenCreateDialog: () => void;
}> = memo(({ handleOpenCreateDialog }) => {
  const { t } = useTranslation();

  return (
    <WorkflowCardWrapper
      sx={{
        p: 1,
        justifyContent: "space-around",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? darken(theme.palette.primary.dark, 0.6)
            : lighten(theme.palette.primary.dark, 0.8),
      }}
    >
      <MuiList disablePadding>
        <CustomNormalListItem
          icon={<Icon icon="solar:add-circle-bold-duotone" />}
          MuiListItemTextProps={{
            primary: t("workflow.workflow-data-create.create-new-blank"),
            primaryTypographyProps: { variant: "subtitle2" },
          }}
          MuiListItemButtonProps={{ sx: { p: 1, mb: 0 }, onClick: handleOpenCreateDialog }}
        />
        <CustomNormalListItem
          icon={<Icon icon="solar:clipboard-add-bold-duotone" />}
          MuiListItemTextProps={{
            primary: t("workflow.workflow-data-create.use-existing-template"),
            primaryTypographyProps: { variant: "subtitle2" },
          }}
          MuiListItemButtonProps={{ sx: { p: 1, mb: 0 }, disabled: true, onClick: () => {} }}
        />
        <CustomNormalListItem
          icon={<Icon icon="solar:upload-minimalistic-bold-duotone" />}
          MuiListItemTextProps={{
            primary: t("workflow.workflow-data-create.import-file"),
            primaryTypographyProps: { variant: "subtitle2" },
          }}
          MuiListItemButtonProps={{ sx: { p: 1, mb: 0 }, disabled: true, onClick: () => {} }}
        />
      </MuiList>
    </WorkflowCardWrapper>
  );
});
