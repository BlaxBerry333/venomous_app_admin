import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import { ROUTE_PATHS } from "~/common/router";
import { appendQueryParams } from "~/common/utils/handle-route-path";
import NoteList from "~/sections/dashboard-note-list/NoteList";

export default function DashboardNoteListPageView() {
  const navigate = useNavigate();

  const navigateToEditorPage = useCallback(
    (noteId: string): void => {
      navigate(appendQueryParams(ROUTE_PATHS.dashboard.note.editor, { noteId }));
    },
    [navigate],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden={false} showCommonFooter={false}>
      <NoteList navigateToEditorPage={navigateToEditorPage} />
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
