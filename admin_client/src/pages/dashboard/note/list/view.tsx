import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "~/common/components/custom/snackbar";
import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import { ROUTE_PATHS } from "~/common/router";
import { appendQueryParams } from "~/common/utils/handle-route-path";
import AuthenticationLoginDialog from "~/sections/dashboard-note-list/AuthenticationLoginDialog";
import NoteList from "~/sections/dashboard-note-list/NoteList";
import { useGetNoteList } from "~/services/apis-hooks/notes";

export default function DashboardNoteListPageView() {
  const { data: dataSource, isLoading, error, refetch } = useGetNoteList();

  const errorResponseData = useMemo(() => error?.response?.data, [error]);
  const isAuthenticationError = useMemo(
    () => errorResponseData?.code === 401 || errorResponseData?.code === 403,
    [errorResponseData],
  );

  useEffect(() => {
    if (errorResponseData) {
      toast.error(errorResponseData.message);
    }
  }, [errorResponseData]);

  // ----------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const navigateToEditorPage = useCallback(
    (noteId: string): void => {
      navigate(appendQueryParams(ROUTE_PATHS.dashboard.note.editor, { noteId }));
    },
    [navigate],
  );

  // ----------------------------------------------------------------------------------------------------

  if (isAuthenticationError) {
    return <AuthenticationLoginDialog refetch={refetch} />;
  }

  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <NoteList
        dataSource={dataSource?.data?.notes || []}
        isLoading={isLoading}
        navigateToEditorPage={navigateToEditorPage}
      />
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
