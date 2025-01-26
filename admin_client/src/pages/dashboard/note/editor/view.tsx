import { useEffect, useState } from "react";

import MuiBox from "@mui/material/Box";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import NoteEdit from "~/sections/dashboard-note-edit/NoteEdit";
import NoteEditMenuBar from "~/sections/dashboard-note-edit/NoteEditMenuBar";

export default function DashboardNoteEditorPageView() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData("hello world");
      setIsLoading(false);
    }, 2000);
    return () => {
      setIsLoading(false);
      setData("");
    };
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden={false} showCommonFooter>
      <MuiBox sx={{ display: "flex", height: "80vh" }}>
        <NoteEditMenuBar sx={{ width: 200 }} />
        <NoteEdit isLoading={isLoading} editorContentString={data} sx={{ flex: 1, p: 1 }} />
      </MuiBox>
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
