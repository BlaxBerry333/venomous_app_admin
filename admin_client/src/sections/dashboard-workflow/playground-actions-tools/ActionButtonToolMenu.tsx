import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Icon } from "@iconify/react";

import { debounce } from "lodash-es";
import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { CustomNormalListItem } from "~/common/components/custom/list";
import { CustomPulldownMenuList } from "~/common/components/custom/pulldown";
import { toast } from "~/common/components/custom/snackbar";
import useRouteSearchParams from "~/common/hooks/useRouteSearchParams";
import { downloadWorkflowData } from "~/services/apis-hooks/workflow";

const ActionButtonToolMenu: NamedExoticComponent = memo(() => {
  const { workflowId } = useRouteSearchParams<{ workflowId: string }>();

  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomPulldownMenuList
      renderMainItem={({ isOpen }) => (
        <CustomSquareBlock size="medium" disabled={isOpen} sx={{ position: "relative" }}>
          <Icon icon="solar:menu-dots-bold-duotone" width={20} />
        </CustomSquareBlock>
      )}
      menuListProps={{
        disablePadding: true,
        dense: true,
      }}
    >
      <CustomNormalListItem
        icon={<Icon icon="solar:xxx-linear" />}
        MuiListItemTextProps={{ primary: "所有变量" }}
        MuiListItemButtonProps={{
          sx: { px: 1 },
          disabled: true,
          onClick: () => {
            // ...
          },
        }}
      />
      <CustomNormalListItem
        icon={<Icon icon="solar:database-linear" />}
        MuiListItemTextProps={{ primary: "数据结构" }}
        MuiListItemButtonProps={{
          sx: { px: 1 },
          disabled: true,
          onClick: () => {
            // ...
          },
        }}
      />
      <CustomNormalListItem
        icon={<Icon icon="solar:export-linear" />}
        MuiListItemTextProps={{ primary: "导入流程图" }}
        MuiListItemButtonProps={{
          sx: { px: 1 },
          disabled: true,
          onClick: () => {
            // ...
          },
        }}
      />
      <CustomNormalListItem
        icon={<Icon icon="solar:import-linear" />}
        MuiListItemTextProps={{ primary: "导出流程图" }}
        MuiListItemButtonProps={{
          sx: { px: 1 },
          onClick: debounce(async () => {
            downloadWorkflowData(workflowId)
              .then((res) => toast.success(`下载成功！${res.fileName}`))
              .catch((error) => toast.error("下载失败！" + (error as Error).message));
          }, 2000),
        }}
      />
    </CustomPulldownMenuList>
  );
});

export default ActionButtonToolMenu;
