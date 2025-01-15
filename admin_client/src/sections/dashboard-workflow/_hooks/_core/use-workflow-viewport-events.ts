import type { XYPosition } from "@xyflow/react";

import { useCallback } from "react";

import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";
import useWorkflowInstance from "./use-workflow-instance";

export const WORKFLOW_SUPPORTED_VIEW_ZOOM_LEVELS: string[] = ["200%", "150%", "100%", "50%"];

export function getZoomLevelValue(levelName: string): number {
  return parseFloat(levelName.slice(0, -1)) / 100;
}

export function getZoomLevelName(levelValue: number): string {
  return `${(levelValue * 100).toFixed(0)}%`;
}

export default function useWorkflowViewportEvents() {
  const { getViewport, setCenter, setViewport, zoomIn, zoomOut, zoomTo, fitView } =
    useWorkflowInstance();

  // ----------------------------------------------------------------------------------------------------

  /** 置设画布的初始位置 */
  const setViewportInitPosition = useCallback(
    (position: XYPosition) => {
      setViewport(
        {
          ...position,
          zoom: getViewport().zoom,
        },
        { duration: 0 },
      );
    },
    [getViewport, setViewport],
  );

  /** 将指定位置设为画布的中央 */
  const moveToViewportCenter = useCallback(
    (position: XYPosition) => {
      const centerPosition: XYPosition = {
        x: position.x + DASHBOARD_WORKFLOW_CONFIGS.NodeMinWidth / 2,
        y: position.y + DASHBOARD_WORKFLOW_CONFIGS.NodeMinHeight / 2,
      };
      setCenter(centerPosition.x, centerPosition.y, {
        duration: DASHBOARD_WORKFLOW_CONFIGS.CanvasViewportTransitionDuration,
        zoom: getViewport().zoom,
      });
    },
    [getViewport, setCenter],
  );

  /** 自动调整画布内容的位置以及缩放 */
  const autoFitViewport = useCallback(() => {
    fitView({ duration: DASHBOARD_WORKFLOW_CONFIGS.CanvasViewportTransitionDuration });
  }, [fitView]);

  // ----------------------------------------------------------------------------------------------------

  /** 视图缩放值加一 */
  const increaseViewportZoomLevel = useCallback(() => {
    zoomIn({ duration: DASHBOARD_WORKFLOW_CONFIGS.CanvasViewportTransitionDuration });
  }, [zoomIn]);

  /** 视图缩放值减一 */
  const decreaseViewportZoomLevel = useCallback(() => {
    zoomOut({ duration: DASHBOARD_WORKFLOW_CONFIGS.CanvasViewportTransitionDuration });
  }, [zoomOut]);

  /** 自定义视图缩放值 */
  const setViewportZoomLevel = useCallback(
    (zoomLevelValue: number) => {
      zoomTo(zoomLevelValue, {
        duration: DASHBOARD_WORKFLOW_CONFIGS.CanvasViewportTransitionDuration,
      });
    },
    [zoomTo],
  );

  // ----------------------------------------------------------------------------------------------------

  return {
    setViewportInitPosition,
    moveToViewportCenter,
    autoFitViewport,
    increaseViewportZoomLevel,
    decreaseViewportZoomLevel,
    setViewportZoomLevel,
  };
}
