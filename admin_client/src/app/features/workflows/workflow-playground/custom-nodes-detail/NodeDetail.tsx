import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiStack from "@mui/material/Stack";

import {
  usePlaygroundActionStatusStore,
  usePlaygroundSelectedNodeStore,
} from "~/app/features/workflows/workflow-playground/_hooks";
import { useCanvasViewport } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { BaseColor } from "~/ui/_helpers";
import { CardWithActions, IconButton } from "~/ui/components";
import { NodeWrapperIcon } from "../custom-nodes/_node-wrapper";

export const elementID = "node-detail";

const NodeDetail: NamedExoticComponent = memo(() => {
  const { isOpenNodeDetailModal, closeNodeDetailModal } = usePlaygroundActionStatusStore();

  const { selectedNode } = usePlaygroundSelectedNodeStore();

  const { moveToSpecificNode } = useCanvasViewport();

  if (!selectedNode) {
    return null;
  }

  return (
    <CardWithActions
      wrapperSx={{
        width: { xs: "320px", sm: "400px" },
        display: isOpenNodeDetailModal ? "block" : "none",
        px: 0,
        border: 1,
        borderColor: "divider",
      }}
      headerSx={{
        px: 1.5,
      }}
      contentSx={{
        height: "calc(100svh - 300px)",
        overflow: "scroll",
        pt: 3,
        px: 1.5,
      }}
      avatar={<NodeWrapperIcon nodeType={selectedNode.type} />}
      title={selectedNode.type}
      subTitle={`#${selectedNode.id}`}
      isCustomCardAction
      action={
        <MuiStack direction="row">
          <IconButton
            icon="solar:map-arrow-square-line-duotone"
            color={BaseColor.INHERIT}
            tooltip="将当前 Node 移动到中心位置"
            onClick={() =>
              moveToSpecificNode(selectedNode.id, {
                x: selectedNode.positionAbsoluteX,
                y: selectedNode.positionAbsoluteY,
              })
            }
          />

          <IconButton
            icon="solar:close-circle-line-duotone"
            color={BaseColor.INHERIT}
            onClick={closeNodeDetailModal}
          />
        </MuiStack>
      }
    >
      <div id={elementID} />
    </CardWithActions>
  );
});

export default NodeDetail;
