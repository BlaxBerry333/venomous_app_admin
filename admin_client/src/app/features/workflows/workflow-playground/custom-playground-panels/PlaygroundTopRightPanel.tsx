import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Panel } from "@xyflow/react";

import MuiStack from "@mui/material/Stack";

import { PlaygroundRunningAction, PlaygroundSaveAction } from "../custom-playground-actions";

const PlaygroundTopRightPanel: NamedExoticComponent = memo(() => {
  return (
    <Panel position="top-right">
      <MuiStack direction="row" spacing={1}>
        <PlaygroundRunningAction />
        <PlaygroundSaveAction />
      </MuiStack>
    </Panel>
  );
});

export default PlaygroundTopRightPanel;
