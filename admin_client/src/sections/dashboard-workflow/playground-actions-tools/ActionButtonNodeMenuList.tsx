import type { NamedExoticComponent } from "react";
import type { ObjectKeyof } from "~/common/types/tools";

import { Icon } from "@iconify/react";
import MuiMenu from "@mui/material/Menu";
import { memo, useState } from "react";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { CustomCollapsibleList, CustomDraggableListItem } from "~/common/components/custom/list";
import useTranslation from "~/common/hooks/useTranslation";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs/_dashboard-workflow";
import { getNodeGroupColor } from "~/sections/dashboard-workflow/_helpers/functions";
import useWorkflowNodeRegister from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-register";

const ActionButtonNodeMenuList: NamedExoticComponent = memo(() => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenNodeMenuList = Boolean(anchorEl);
  const openNodeMenuList = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const closeNodeMenuList = () => setAnchorEl(null);

  // ----------------------------------------------------------------------------------------------------

  const { handleOnDragStart } = useWorkflowNodeRegister();

  const nodeMenuList = Object.entries(DASHBOARD_WORKFLOW_CONFIGS.NodeTypeGroup).map(
    ([groupName, nodeTypes]) => {
      const nodeGroupName = groupName as ObjectKeyof<
        typeof DASHBOARD_WORKFLOW_CONFIGS.NodeTypeGroup
      >;
      return {
        groupName: nodeGroupName,
        groupColor: getNodeGroupColor(nodeGroupName),
        nodeTypes: nodeTypes.map((nodeType) => ({ type: nodeType })),
      };
    },
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <CustomSquareBlock color="primary" size="medium" onClick={openNodeMenuList}>
        <Icon icon="solar:add-circle-linear" width={20} />
      </CustomSquareBlock>

      <MuiMenu
        anchorEl={anchorEl}
        open={isOpenNodeMenuList}
        onClose={closeNodeMenuList}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              height: 500,
              borderRadius: 2,
              mt: 1,
              px: 1,
            },
          },
        }}
      >
        {nodeMenuList.map((group) => (
          <CustomCollapsibleList
            key={group.groupName}
            expandedTitle={t(`workflow.workflow-playground.custom-nodes-groups.${group.groupName}`)}
          >
            {group.nodeTypes.map((node) => (
              <CustomDraggableListItem
                key={node.type}
                MuiListItemTextProps={{
                  primary: t(`workflow.workflow-playground.custom-nodes.${node.type}`),
                }}
                MuiListItemButtonProps={{
                  sx: { boxShadow: 2, pl: 1 },
                  onDragStart: (e) => handleOnDragStart(e, node),
                }}
                icon={
                  <Icon
                    icon="clarity:block-solid"
                    width={24}
                    color={group.groupColor}
                    style={{ marginRight: 8 }}
                  />
                }
              />
            ))}
          </CustomCollapsibleList>
        ))}
      </MuiMenu>
    </>
  );
});

export default ActionButtonNodeMenuList;
