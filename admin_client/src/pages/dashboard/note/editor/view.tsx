import { useEffect, useState } from "react";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import useRouteSearchParams from "~/common/hooks/useRouteSearchParams";
import NoteEdit from "~/sections/dashboard-note-edit/NoteEdit";

export default function DashboardNoteEditorPageView() {
  const { noteId } = useRouteSearchParams<{ noteId: string }>();
  console.log(noteId);

  // ----------------------------------------------------------------------------------------------------

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
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <NoteEdit isLoading={isLoading} editorContentString={data} />
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
