import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiPapper from "@mui/material/Paper";
import { IconButton } from "~/ui/components";

const PlaygroundUndoRedoAction: NamedExoticComponent = memo(() => {
  return (
    <MuiPapper
      elevation={0}
      sx={{
        p: 0,
        display: "flex",
        alignItems: "center",
        border: 1,
        borderColor: "divider",
      }}
    >
      {/* Redo */}
      <IconButton
        icon="solar:multiple-forward-left-line-duotone"
        isCircle={false}
        tooltip="Undo"
        sx={{ border: 0 }}
      />
      {/* Undo */}
      <IconButton
        icon="solar:multiple-forward-right-line-duotone"
        isCircle={false}
        tooltip="Redo"
        sx={{ border: 0 }}
      />

      {/* History */}
      <IconButton
        icon="solar:history-bold-duotone"
        isCircle={false}
        tooltip="History of Undo Redo"
        sx={{ border: 0 }}
      />
    </MuiPapper>
  );
});

export default PlaygroundUndoRedoAction;
