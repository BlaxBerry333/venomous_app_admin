import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import { useViewport } from "@xyflow/react";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import { BaseColor, BasePosition } from "~/ui/_helpers";
import { Button, ButtonVariant, IconButton, Menu, Paper, Pulldown } from "~/ui/components";
import { useCanvasViewport } from "../_hooks/core";

const MIN_ZOOM: number = FEATURE_WORKFLOWS_CONFIGS.canvas.minZoom;
const MAX_ZOOM: number = FEATURE_WORKFLOWS_CONFIGS.canvas.maxZoom;

const PlaygroundZoomAction: NamedExoticComponent = memo(() => {
  const { increaseZoom, decreaseZoom, setZoom, autoView } = useCanvasViewport();

  const { zoom } = useViewport();

  const zoomLevel = useMemo<string>(() => (zoom * 100).toFixed(0), [zoom]);
  const disableIncreaseZoom = useMemo<boolean>(() => zoom >= MAX_ZOOM, [zoom]);
  const disableDecreaseZoom = useMemo<boolean>(() => zoom <= MIN_ZOOM, [zoom]);

  return (
    <Paper
      hasElevation={false}
      sx={{
        width: 150,
        p: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        icon="solar:magnifer-zoom-out-linear"
        isCircle={false}
        sx={{ border: 0 }}
        disabled={disableDecreaseZoom}
        onClick={decreaseZoom}
      />

      <Pulldown
        position={BasePosition.TOP_CENTER}
        renderPulldownTrigger={(params) => (
          <Button
            variant={ButtonVariant.TEXT}
            color={BaseColor.INHERIT}
            onClick={params.handleOpen}
            sx={{ flex: 1, width: "60px", display: "flex", alignItems: "center" }}
          >
            {`${zoomLevel}%`}
          </Button>
        )}
        renderPulldownContent={(params) => (
          <Menu
            list={[
              { title: `${MAX_ZOOM * 100}` },
              { title: `${MAX_ZOOM * 50}` },
              { title: `${MIN_ZOOM * 100}` },
              { title: "Auto" },
            ]}
            renderListItem={(item, index) => (
              <Button
                key={index}
                variant={ButtonVariant.TEXT}
                color={BaseColor.INHERIT}
                onClick={() => {
                  if (isNaN(Number(item.title))) autoView();
                  else setZoom(Number(item.title) / 100);
                  params.handleClose();
                }}
                sx={{ width: "100%", justifyContent: "center", py: 1 }}
              >
                {item.title}
              </Button>
            )}
          />
        )}
      />

      <IconButton
        icon="solar:magnifer-zoom-in-linear"
        isCircle={false}
        sx={{ border: 0 }}
        disabled={disableIncreaseZoom}
        onClick={increaseZoom}
      />
    </Paper>
  );
});

export default PlaygroundZoomAction;
