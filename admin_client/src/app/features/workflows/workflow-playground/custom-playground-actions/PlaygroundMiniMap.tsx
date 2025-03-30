import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { useTheme } from "@mui/material/styles";
import { MiniMap as XYFlowMiniMap } from "@xyflow/react";

import type { Workflows } from "~/app/features/workflows/_types";
import { getNodeColor } from "~/app/features/workflows/workflow-playground/_helpers";
import { IconButton } from "~/ui/components";
import { usePlaygroundActionStatusStore } from "../_hooks";
import { useCanvasViewport } from "../_hooks/core";

const PlaygroundMiniMap: NamedExoticComponent = memo(() => {
  const theme = useTheme();
  const isDarkMode: boolean = theme.palette.mode === "dark";

  const { isOpenMiniMap } = usePlaygroundActionStatusStore();

  const { moveToSpecificNode } = useCanvasViewport();

  return (
    <XYFlowMiniMap
      position="bottom-left"
      style={{
        display: isOpenMiniMap ? "block" : "none",
        background: isDarkMode ? "#121212" : "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        margin: 0,
        bottom: "48px",
      }}
      nodeBorderRadius={16}
      maskColor={isDarkMode ? "rgba(255, 255, 255, 0.08)" : "hsla(0, 0.00%, 0.00%, 0.16)"}
      pannable
      zoomable
      onNodeClick={(e, node) => {
        e.stopPropagation();
        moveToSpecificNode(node.id, node.position);
      }}
      nodeColor={(node) => {
        const { type, selected, data } = node as Workflows.Node;
        if (data.isFormInvalid) return "#ff0000";
        if (selected) return getNodeColor(type!);
        return isDarkMode ? "grey" : "#e2e2e2";
      }}
    />
  );
});

export default PlaygroundMiniMap;

export const PlaygroundMiniMapSwitcher: NamedExoticComponent = memo(() => {
  const { isOpenMiniMap, toggleMiniMap } = usePlaygroundActionStatusStore();
  return (
    <IconButton
      isCircle={false}
      icon={isOpenMiniMap ? "line-md:map-marker-off-loop" : "line-md:map-marker-alt-loop"}
      tooltip={isOpenMiniMap ? "关闭迷你地图" : "开启迷你地图"}
      onClick={toggleMiniMap}
    />
  );
});
