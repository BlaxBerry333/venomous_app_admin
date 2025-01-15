import type { NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import { useViewport } from "@xyflow/react";
import { memo, useCallback, useMemo, useRef, useState } from "react";

import MuiButton from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import MuiDivider from "@mui/material/Divider";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiStack from "@mui/material/Stack";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import useWorkflowViewportEvents, {
  getZoomLevelName,
  getZoomLevelValue,
  WORKFLOW_SUPPORTED_VIEW_ZOOM_LEVELS,
} from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-viewport-events";

const ActionButtonZoom: NamedExoticComponent = memo(() => {
  const ref = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openZoomList = () => setAnchorEl(ref.current);
  const closeZoomList = () => setAnchorEl(null);

  // ----------------------------------------------------------------------------------------------------

  const {
    increaseViewportZoomLevel,
    decreaseViewportZoomLevel,
    setViewportZoomLevel,
    autoFitViewport,
  } = useWorkflowViewportEvents();

  const handleChangeZoomLevel = useCallback(
    (zoomLevelValue: number) => setViewportZoomLevel(zoomLevelValue),
    [setViewportZoomLevel],
  );

  // ----------------------------------------------------------------------------------------------------

  const { zoom: currentViewZoomLevelValue } = useViewport();

  const currentViewZoomLevelName = useMemo(
    () => getZoomLevelName(currentViewZoomLevelValue),
    [currentViewZoomLevelValue],
  );

  const isDisabledZoom = useMemo<{ decrease: boolean; increase: boolean }>(() => {
    const ascZoomValue = WORKFLOW_SUPPORTED_VIEW_ZOOM_LEVELS.map((name) =>
      getZoomLevelValue(name),
    ).sort();
    const minZoomValue = ascZoomValue[0];
    const maxZoomValue = ascZoomValue[ascZoomValue.length - 1];
    return {
      decrease: currentViewZoomLevelValue <= minZoomValue,
      increase: currentViewZoomLevelValue >= maxZoomValue,
    };
  }, [currentViewZoomLevelValue]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <MuiCard sx={{ py: 0.5, px: 0.5 }}>
        <MuiStack spacing={0} ref={ref}>
          <CustomSquareBlock
            variant="text"
            disabled={isDisabledZoom.decrease}
            onClick={decreaseViewportZoomLevel}
          >
            <Icon icon="solar:magnifer-zoom-out-linear" width={20} />
          </CustomSquareBlock>
          <MuiButton
            variant="text"
            sx={{ py: 0, typography: "caption", fontWeight: 600 }}
            onClick={openZoomList}
          >
            {currentViewZoomLevelName}
          </MuiButton>
          <CustomSquareBlock
            variant="text"
            disabled={isDisabledZoom.increase}
            onClick={increaseViewportZoomLevel}
          >
            <Icon icon="solar:magnifer-zoom-in-linear" width={20} />
          </CustomSquareBlock>
        </MuiStack>
      </MuiCard>

      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeZoomList}
        slotProps={{
          paper: {
            elevation: 2,
            sx: { width: 152, ml: -0.5, borderRadius: 2 },
            style: { transform: "translateY(-48px)" },
          },
        }}
        MenuListProps={{
          sx: {
            p: 0.5,
            "&>li": {
              borderRadius: 2,
              typography: "caption",
              fontWeight: 600,
              justifyContent: "center",
              mb: 0.5,
            },
          },
        }}
      >
        {WORKFLOW_SUPPORTED_VIEW_ZOOM_LEVELS.map((levelName) => (
          <MuiMenuItem
            key={levelName}
            selected={currentViewZoomLevelValue === getZoomLevelValue(levelName)}
            onClick={() => handleChangeZoomLevel(getZoomLevelValue(levelName))}
          >
            {levelName}
          </MuiMenuItem>
        ))}
        <MuiDivider style={{ padding: 0, margin: 4 }} />
        <MuiMenuItem onClick={autoFitViewport}>{"auto fit view"}</MuiMenuItem>
      </MuiMenu>
    </>
  );
});

export default ActionButtonZoom;
