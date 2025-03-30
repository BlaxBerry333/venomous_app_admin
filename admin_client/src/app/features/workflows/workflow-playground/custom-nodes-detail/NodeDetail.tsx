import type { NamedExoticComponent } from "react";
import { memo, useEffect } from "react";

import MuiStack from "@mui/material/Stack";

import {
  usePlaygroundActionStatusStore,
  usePlaygroundSelectedNodeStore,
} from "~/app/features/workflows/workflow-playground/_hooks";
import { useCanvasViewport } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { BaseColor } from "~/ui/_helpers";
import { CardWithActions, IconButton } from "~/ui/components";
import { NodeWrapperIcon } from "../custom-nodes/_node-wrapper";

export const protalElementID = "node-detail" as const;
export const protalElementCloseFunctionName = "node-detail-close" as const;

const NodeDetail: NamedExoticComponent = memo(() => {
  const { isOpenNodeDetailModal, closeNodeDetailModal } = usePlaygroundActionStatusStore();

  const { selectedNode } = usePlaygroundSelectedNodeStore();

  const { moveToSpecificNode } = useCanvasViewport();

  useSetCloseFunctionForProtalElement({ showElement: isOpenNodeDetailModal });

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
      <div id={protalElementID} />
    </CardWithActions>
  );
});

export default NodeDetail;

/**
 * 创建一个自定义事件
 * 使渲染到这个 ProtalElement 容器内的组件可以监听到该自定义事件，从而解决子组件不会被卸的问题
 */
export function useSetCloseFunctionForProtalElement({ showElement }: { showElement: boolean }) {
  useEffect(() => {
    if (!showElement) {
      const event = new CustomEvent(protalElementCloseFunctionName);
      document.getElementById(protalElementID)?.dispatchEvent(event);
    }
  }, [showElement]);
}

/**
 * 监听一个自定义事件
 * 使渲染到这个 ProtalElement 容器内的组件可以在监听到该自定义事件后执行某些行为，比如数据重置等，以解决子组件不会被卸的问题
 */
export function useDosomethingWhenCloseProtalElement({ func }: { func: VoidFunction }) {
  useEffect(() => {
    const protalElement = document.getElementById(protalElementID);
    protalElement?.addEventListener("node-detail-close", func);
    return () => {
      protalElement?.removeEventListener("node-detail-close", func);
    };
  }, [func]);
}
