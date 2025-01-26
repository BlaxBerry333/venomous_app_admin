import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiPaper, { type PaperProps as MuiPaperProps } from "@mui/material/Paper";

const NoteEditMenuBar: NamedExoticComponent<{
  sx?: MuiPaperProps["sx"];
}> = memo(({ sx }) => {
  return (
    <MuiPaper
      sx={{
        p: 2,
        boxShadow: 0,
        display: { xs: "none", sm: "flex" },
        ...sx,
      }}
    >
      xxx
    </MuiPaper>
  );
});

export default NoteEditMenuBar;
