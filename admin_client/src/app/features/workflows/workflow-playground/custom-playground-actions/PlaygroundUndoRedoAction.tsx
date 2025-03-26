import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { IconButton, Paper } from "~/ui/components";

const PlaygroundUndoRedoAction: NamedExoticComponent = memo(() => {
  return (
    <Paper
      hasElevation={false}
      sx={{
        p: 0,
        display: "flex",
        alignItems: "center",
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
    </Paper>
  );
});

export default PlaygroundUndoRedoAction;
