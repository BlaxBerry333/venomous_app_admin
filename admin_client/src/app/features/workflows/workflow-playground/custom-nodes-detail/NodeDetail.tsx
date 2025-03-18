import type { NamedExoticComponent } from "react";
import { memo } from "react";

import {
  usePlaygroundActionStatusStore,
  usePlaygroundSelectedNodeStore,
} from "~/app/features/workflows/workflow-playground/_hooks";
import { useNodeIconStyle } from "~/app/features/workflows/workflow-playground/_hooks/core/use-node-icon-style";
import { BaseColor } from "~/ui/_helpers";
import { CardWithActions, Icon, IconButton } from "~/ui/components";

export const elementID = "node-detail";

const NodeDetail: NamedExoticComponent = memo(() => {
  const { isOpenNodeDetailModal, closeNodeDetailModal } = usePlaygroundActionStatusStore();
  const { selectedNode } = usePlaygroundSelectedNodeStore();

  const nodeIcon = useNodeIconStyle(selectedNode?.type);

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
      avatar={<Icon icon={nodeIcon.icon} width={40} sx={nodeIcon.style} />}
      title={selectedNode.type}
      subTitle={`#${selectedNode.id}`}
      isCustomCardAction
      action={
        <IconButton
          icon="solar:close-circle-line-duotone"
          onClick={closeNodeDetailModal}
          color={BaseColor.INHERIT}
        />
      }
    >
      <div id={elementID} />
    </CardWithActions>
  );
});

export default NodeDetail;
