import type { NamedExoticComponent } from "react";
import { memo } from "react";

import type { IWorkflowDataResponse } from "~/app/types/_workflow";
import { CardWithActions, Typography } from "~/ui/components";
import { DASHBOARD_PATHS } from "~/utils/libs/router";
import { formateDateTime } from "~/utils/libs/tools/datetime";

type DashboardWorkflowsListItemProps = {
  item: IWorkflowDataResponse;
  selectedItemId: string | null;
  handleNavigate: (path: string) => void;
  openConfirmModalOfRemove: VoidFunction;
};
const DashboardWorkflowsListItem: NamedExoticComponent<DashboardWorkflowsListItemProps> = memo(
  ({ item, selectedItemId, handleNavigate, openConfirmModalOfRemove }) => {
    const { id, name, updated_at, created_at } = item;
    const isSelected: boolean = selectedItemId === id;

    return (
      <CardWithActions
        id={id}
        title={name}
        subTitle={`#${id}`}
        // action={<Tooltip title={description} />}
        wrapperSx={{
          width: "100%",
          height: "150px",
          pl: 2,
          transition: "outline 0.2s ease-in-out",
          outline: ({ palette: { primary } }) =>
            `4px solid ${isSelected ? primary.main : "transparent"}`,
        }}
        actionItemList={[
          {
            title: "演示",
            icon: "solar:routing-3-line-duotone",
            onClick: () => handleNavigate(`${DASHBOARD_PATHS.workflows.playground}?id=${id}`),
          },
          {
            title: "编辑",
            icon: "solar:pen-new-square-line-duotone",
            onClick: () => handleNavigate(`${DASHBOARD_PATHS.workflows.detail}?id=${id}`),
          },
          {
            title: "删除",
            icon: "solar:trash-bin-trash-line-duotone",
            onClick: openConfirmModalOfRemove,
          },
        ]}
      >
        <Typography noWrap variant="caption" component="div" sx={{ pr: 1, mt: 1 }}>
          更新日期:&nbsp;{formateDateTime(updated_at)}
        </Typography>
        <Typography noWrap variant="caption" component="div" sx={{ pr: 1 }}>
          创建日期:&nbsp;{formateDateTime(created_at)}
        </Typography>

        {/* {is_active && (
          <Typography noWrap variant="caption" color="success" sx={{ fontWeight: "bold" }}>
            启动中
          </Typography>
        )} */}
      </CardWithActions>
    );
  },
);

export default DashboardWorkflowsListItem;
