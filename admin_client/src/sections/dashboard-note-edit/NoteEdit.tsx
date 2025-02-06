import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiPaper from "@mui/material/Paper";

import { TipTapEditor } from "~/common/components/custom/editor";
import { CustomLoadingScreen } from "~/common/components/custom/loadings";

const NoteEdit: NamedExoticComponent<{
  isLoading: boolean;
  editorContentString: string;
  setUpdatedEditorContent: (content: string) => void;
}> = memo(({ isLoading, editorContentString, setUpdatedEditorContent }) => {
  if (isLoading) {
    return <CustomLoadingScreen />;
  }

  return (
    <MuiPaper
      sx={{
        minHeight: "850px",
        height: "calc(100svh - 150px)",
        maxHeight: "calc(100svh - 150px)",
        overflowY: "scroll",
        borderRadius: 4,
        position: "relative",
        px: 1,
        border: 1,
        borderColor: "divider",
      }}
    >
      <TipTapEditor
        content={editorContentString}
        editable={!isLoading}
        handleContentChange={(content) => setUpdatedEditorContent(content.html)}
      />
    </MuiPaper>
  );
});

export default NoteEdit;
