import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { BaseColor } from "~/ui/_helpers";
import { CardWithActions, IconButton, Typography } from "~/ui/components";
import type { IWorkflowDataResponse } from "~/utils/libs/apis/types/_workflow";
import { DASHBOARD_PATHS } from "~/utils/libs/router";
import { formateDateTime } from "~/utils/libs/tools/datetime";
import DashboardWorkflowsListItemAvatar from "./DashboardWorkflowsListItemAvatar";

type DashboardWorkflowsListItemProps = {
  item: IWorkflowDataResponse;
  selectedItemId: string | null;
  handleNavigate: (path: string) => void;
  openConfirmModalOfRemove: VoidFunction;
};
const DashboardWorkflowsListItem: NamedExoticComponent<DashboardWorkflowsListItemProps> = memo(
  ({ item, selectedItemId, handleNavigate, openConfirmModalOfRemove }) => {
    const { id, name, updatedAt, createdAt, isActive } = item;
    const isSelected: boolean = selectedItemId === id;

    const navigateToDetail = useCallback(() => {
      handleNavigate(`${DASHBOARD_PATHS.workflows.detail}?id=${id}`);
    }, [handleNavigate, id]);

    const navigateToPlayground = useCallback(() => {
      handleNavigate(`${DASHBOARD_PATHS.workflows.playground}?id=${id}`);
    }, [handleNavigate, id]);

    return (
      <CardWithActions
        id={id}
        title={name}
        subTitle={`#${id}`}
        avatar={<DashboardWorkflowsListItemAvatar item={item} />}
        action={
          isActive && (
            <IconButton
              icon="solar:check-circle-bold-duotone"
              color={BaseColor.PRIMARY}
              onClick={navigateToDetail}
            />
          )
        }
        wrapperSx={{
          width: "100%",
          height: "150px",
          pl: 2,
          transition: "outline 0.2s ease-in-out",
          outline: ({ palette: { primary } }) =>
            `4px solid ${isSelected ? primary.main : "transparent"}`,
        }}
        contentSx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          py: 2,
        }}
        actionItemList={[
          {
            title: "演示图",
            icon: "solar:routing-3-line-duotone",
            onClick: () => navigateToPlayground(),
          },
          {
            title: "编辑",
            icon: "solar:pen-new-square-line-duotone",
            onClick: () => navigateToDetail(),
          },
          {
            title: "删除",
            icon: "solar:trash-bin-trash-line-duotone",
            onClick: openConfirmModalOfRemove,
          },
        ]}
      >
        <Typography noWrap variant="caption" component="div">
          更新日期:&nbsp;{formateDateTime(updatedAt)}
        </Typography>
        <Typography noWrap variant="caption" component="div">
          创建日期:&nbsp;{formateDateTime(createdAt)}
        </Typography>

        {/* {isActive && (
          <Typography noWrap variant="caption" color="success" sx={{ fontWeight: "bold" }}>
            启动中
          </Typography>
        )} */}
      </CardWithActions>
    );
  },
);

export default DashboardWorkflowsListItem;
