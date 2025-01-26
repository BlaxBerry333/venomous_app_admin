import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiFade from "@mui/material/Fade";
import MuiLinearProgress from "@mui/material/LinearProgress";
import MuiPaper, { type PaperProps as MuiPaperProps } from "@mui/material/Paper";

import { TipTapEditor } from "~/common/components/custom/editor";

const NoteEdit: NamedExoticComponent<{
  isLoading: boolean;
  editorContentString: string;
  sx?: MuiPaperProps["sx"];
}> = memo(({ isLoading, editorContentString, sx }) => {
  if (isLoading) {
    return (
      <MuiPaper sx={{ borderRadius: 4, ...sx }}>
        <MuiLinearProgress color="primary" sx={{ width: 1 }} />
      </MuiPaper>
    );
  }

  return (
    <MuiPaper sx={{ borderRadius: 4, ...sx }}>
      <MuiFade in={!isLoading} unmountOnExit>
        <div>
          <TipTapEditor content={editorContentString} editable={!isLoading} />
        </div>
      </MuiFade>
    </MuiPaper>
  );
});

export default NoteEdit;
