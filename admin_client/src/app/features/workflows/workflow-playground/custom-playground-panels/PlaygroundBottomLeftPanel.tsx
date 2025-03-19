import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Panel } from "@xyflow/react";

import MuiStack from "@mui/material/Stack";
import {
  PlaygroundMiniMap,
  PlaygroundMiniMapSwitcher,
  PlaygroundNodeRegisterAction,
  PlaygroundUndoRedoAction,
  PlaygroundZoomAction,
} from "../custom-playground-actions";

const PlaygroundBottomLeftPanel: NamedExoticComponent = memo(() => {
  return (
    <Panel position="bottom-left" style={{ margin: "2px" }}>
      {/* MiniMap */}
      <PlaygroundMiniMap />

      <MuiStack direction="row" alignItems="center">
        <MuiStack direction="row" alignItems="center" spacing={0.5} sx={{ mr: 5 }}>
          {/* MiniMap Switcher */}
          <PlaygroundMiniMapSwitcher />
          {/* Zoom */}
          <PlaygroundZoomAction />
        </MuiStack>

        <MuiStack direction="row" alignItems="center" spacing={0.5}>
          {/* Node Register */}
          <PlaygroundNodeRegisterAction />
          {/* Undo, Redo */}
          <PlaygroundUndoRedoAction />
        </MuiStack>
      </MuiStack>
    </Panel>
  );
});

export default PlaygroundBottomLeftPanel;
