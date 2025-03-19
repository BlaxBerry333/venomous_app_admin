import { useCallback } from "react";

import type { XYPosition as XYFlowPosition } from "@xyflow/react";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import useInstance from "./use-instance";
import useNodeUpdate from "./use-node-update";

export default function useCanvasViewport() {
  const { zoomIn, zoomOut, zoomTo, getZoom, fitView, setCenter, resetElements } = useInstance();
  const { updateSpecificNode } = useNodeUpdate();

  const increaseZoom = useCallback(() => {
    zoomIn({ duration: FEATURE_WORKFLOWS_CONFIGS.canvas.zoomDuration });
  }, [zoomIn]);

  const decreaseZoom = useCallback(() => {
    zoomOut({ duration: FEATURE_WORKFLOWS_CONFIGS.canvas.zoomDuration });
  }, [zoomOut]);

  const setZoom = useCallback(
    (zoomLevelValue: number, immediate: boolean = true) => {
      zoomTo(zoomLevelValue, {
        duration: immediate ? 0 : FEATURE_WORKFLOWS_CONFIGS.canvas.zoomDuration,
      });
    },
    [zoomTo],
  );

  const autoView = useCallback(
    (immediate: boolean = true) => {
      fitView({ duration: immediate ? 0 : FEATURE_WORKFLOWS_CONFIGS.canvas.zoomDuration });
    },
    [fitView],
  );

  const moveToSpecificNode = useCallback(
    (nodeId: string, { x, y }: XYFlowPosition) => {
      setCenter(
        x + FEATURE_WORKFLOWS_CONFIGS.styles.nodeWidth / 2,
        y + FEATURE_WORKFLOWS_CONFIGS.styles.nodeHeight / 2,
        {
          duration: FEATURE_WORKFLOWS_CONFIGS.canvas.zoomDuration,
          zoom: getZoom(),
        },
      );
      resetElements();
      updateSpecificNode(nodeId, { selected: true });
    },
    [getZoom, setCenter, resetElements, updateSpecificNode],
  );

  return {
    increaseZoom,
    decreaseZoom,
    setZoom,
    moveToSpecificNode,
    autoView,
  };
}
