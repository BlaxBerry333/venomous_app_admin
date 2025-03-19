import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Panel } from "@xyflow/react";

import MuiStack from "@mui/material/Stack";

import { PlaygroundRunningAction, PlaygroundSaveAction } from "../custom-playground-actions";

const PlaygroundTopRightPanel: NamedExoticComponent = memo(() => {
  return (
    <Panel position="top-right" style={{ margin: "2px" }}>
      <MuiStack direction="row" spacing={0.5}>
        <PlaygroundRunningAction />
        <PlaygroundSaveAction />
      </MuiStack>
    </Panel>
  );
});

export default PlaygroundTopRightPanel;
