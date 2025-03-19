import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { BasePosition } from "~/ui/_helpers";

import { IconButton, Popover, Typography, usePopover } from "~/ui/components";
import { Workflows } from "../../_types";
import { useNodeRegister } from "../_hooks/core";
import { NodeWrapperIcon } from "../custom-nodes/_node-wrapper";

const PlaygroundNodeRegisterAction: NamedExoticComponent = memo(() => {
  const popover = usePopover();

  const { handleOnDragStart } = useNodeRegister();

  return (
    <>
      <IconButton
        isCircle={false}
        icon={"solar:widget-add-line-duotone"}
        tooltip={"注册 Node"}
        onClick={popover.handleOpen}
      />
      <Popover
        isOpen={popover.isOpen}
        anchorEl={popover.anchorEl}
        handleClose={popover.handleClose}
        position={BasePosition.TOP_CENTER}
      >
        {Object.values(Workflows.NodeType).map((nodeType) => {
          return (
            <NodeItem
              key={nodeType}
              nodeType={nodeType}
              onDragStart={(e) => handleOnDragStart(e, nodeType)}
            />
          );
        })}
      </Popover>
    </>
  );
});

export default PlaygroundNodeRegisterAction;

const NodeItem: NamedExoticComponent<{
  nodeType: Workflows.NodeType;
  onDragStart: (e: React.DragEvent<HTMLSpanElement>) => void;
}> = memo(({ nodeType, onDragStart }) => {
  return (
    <Typography
      key={nodeType}
      component="div"
      noWrap
      draggable
      onDragStart={(e) => onDragStart(e)}
      sx={{ display: "flex", alignItems: "center", my: 1, width: 150, cursor: "grab" }}
    >
      <NodeWrapperIcon nodeType={nodeType} />

      <Typography variant="subtitle2" sx={{ fontWeight: "bold", ml: 1 }}>
        {nodeType}
      </Typography>
    </Typography>
  );
});
