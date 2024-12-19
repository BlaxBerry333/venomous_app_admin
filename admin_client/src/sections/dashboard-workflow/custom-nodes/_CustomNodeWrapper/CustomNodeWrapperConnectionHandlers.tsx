import type { NamedExoticComponent } from "react";
import type { CustomNodeWrapperProps } from "~/common/types/dashboard-workflow";

import { memo } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

import { Handle as _Handle, Position as _Position } from "@xyflow/react";

import useWorkflowConnectionEvents from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-connection-events";
import useWorkflowNodeStyles from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-styles";

// eslint-disable-next-line react-refresh/only-export-components
const CustomNodeWrapperConnectionSourceHandler: NamedExoticComponent<CustomNodeWrapperProps> = memo(
  (nodeWrapperProps) => {
    const { isMultipleConnectionSources, isConnectable } = nodeWrapperProps;

    // ----------------------------------------------------------------------------------------------------

    const { commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeWrapperProps);

    const { onHandlerConnect } = useWorkflowConnectionEvents();

    // ----------------------------------------------------------------------------------------------------

    if (isMultipleConnectionSources) {
      return null;
    }

    return (
      <_Handle
        type="source"
        position={_Position.Right}
        isConnectable={isConnectable}
        onConnect={onHandlerConnect}
        style={{ ...commonNodeHandlerStyles }}
      />
    );
  },
);

// eslint-disable-next-line react-refresh/only-export-components
const CustomNodeWrapperConnectionTargetHandler: NamedExoticComponent<CustomNodeWrapperProps> = memo(
  (nodeWrapperProps) => {
    const { isConnectable } = nodeWrapperProps;

    // ----------------------------------------------------------------------------------------------------

    const { commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeWrapperProps);

    const { onHandlerConnect } = useWorkflowConnectionEvents();

    // ----------------------------------------------------------------------------------------------------

    return (
      <_Handle
        type="target"
        position={_Position.Left}
        isConnectable={isConnectable}
        onConnect={onHandlerConnect}
        style={{ ...commonNodeHandlerStyles }}
      />
    );
  },
);

// eslint-disable-next-line react-refresh/only-export-components
const CustomNodeWrapperConnectionMultipleSourceHandler: NamedExoticComponent<CustomNodeWrapperProps> =
  memo((nodeWrapperProps) => {
    const { isMultipleConnectionSources, multipleConnectionItems, isConnectable } =
      nodeWrapperProps;

    // ----------------------------------------------------------------------------------------------------

    const { commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeWrapperProps);

    const { onHandlerConnect } = useWorkflowConnectionEvents();

    // ----------------------------------------------------------------------------------------------------

    if (!isMultipleConnectionSources || !multipleConnectionItems?.length) {
      return null;
    }

    return (
      <>
        {multipleConnectionItems?.map((item) => (
          <MuiBox
            key={item.id}
            component="div"
            sx={{
              position: "relative",
              overflow: "visible",
              px: 2,
              height: "40px",
            }}
          >
            <MuiTypography variant="subtitle2" noWrap sx={{ height: "100%", lineHeight: "40px" }}>
              {item.text}
            </MuiTypography>

            <_Handle
              type="source"
              id={String(item.id)}
              position={_Position.Right}
              isConnectable={isConnectable}
              onConnect={onHandlerConnect}
              style={{
                ...commonNodeHandlerStyles,
                position: "absolute",
                top: "20px",
                zIndex: 2,
                right: -3,
              }}
            />
          </MuiBox>
        ))}
      </>
    );
  });

export default {
  Source: CustomNodeWrapperConnectionSourceHandler,
  Target: CustomNodeWrapperConnectionTargetHandler,
  MultipleSource: CustomNodeWrapperConnectionMultipleSourceHandler,
};
