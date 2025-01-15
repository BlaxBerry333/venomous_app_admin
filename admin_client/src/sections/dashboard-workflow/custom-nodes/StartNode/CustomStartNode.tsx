import type { FC } from "react";
import type { CustomNodeProps } from "~/common/types/dashboard-workflow";

import { memo } from "react";

import { Handle as _Handle, Position as _Position } from "@xyflow/react";

import { Icon } from "@iconify/react";

import MuiCard from "@mui/material/Card";
import MuiTypography from "@mui/material/Typography";

import useWorkflowConnectionEvents from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-connection-events";
import useWorkflowNodeStyles from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-styles";

const CustomStartNode: FC<CustomNodeProps> = (nodeProps) => {
  const { isConnectable } = nodeProps;

  // ----------------------------------------------------------------------------------------------------

  const { startNodeWrapperStyles, commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  const { onHandlerConnect } = useWorkflowConnectionEvents();

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiCard component="div" sx={startNodeWrapperStyles}>
      <MuiTypography component="div" variant="body2" noWrap>
        <Icon icon="solar:home-smile-bold" width={40} />
      </MuiTypography>

      <_Handle
        type="source"
        position={_Position.Right}
        isConnectable={isConnectable}
        onConnect={onHandlerConnect}
        style={{ ...commonNodeHandlerStyles }}
      />
    </MuiCard>
  );
};

export default memo(CustomStartNode);
