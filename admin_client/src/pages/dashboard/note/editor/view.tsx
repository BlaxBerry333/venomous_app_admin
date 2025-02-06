import { useCallback, useEffect, useMemo, useState } from "react";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiContainer from "@mui/material/Container";

import { toast } from "~/common/components/custom/snackbar";
import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import useRouteSearchParams from "~/common/hooks/useRouteSearchParams";
import useTranslation from "~/common/hooks/useTranslation";
import NoteEdit from "~/sections/dashboard-note-edit/NoteEdit";
import AuthenticationLoginDialog from "~/sections/dashboard-note-list/AuthenticationLoginDialog";
import { useCreateNote, useGetNoteDetail, useUpdateNote } from "~/services/apis-hooks/notes";

export default function DashboardNoteEditorPageView() {
  const { t } = useTranslation();

  // ----------------------------------------------------------------------------------------------------

  const { noteId } = useRouteSearchParams<{ noteId: string }>();

  const isCreation = useMemo<boolean>(() => !noteId, [noteId]);

  // ----------------------------------------------------------------------------------------------------

  const { data: dataSource, isLoading, error, refetch } = useGetNoteDetail(noteId);

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

  const { isPending: isCreatingNote } = useCreateNote();
  const { mutateAsync: updateNote, isPending: isUpdatingNote } = useUpdateNote(noteId);

  const isLoadingUpdatingButton = useMemo<boolean>(
    () => isCreatingNote || isUpdatingNote,
    [isCreatingNote, isUpdatingNote],
  );

  const [updatedEditorContent, setUpdatedEditorContent] = useState<string>("");

  const handleContentChange = useCallback(async () => {
    console.log(updatedEditorContent);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 创建
    if (isCreation) {
      // await createNote({ message: params.html });
      toast.success(t("common.snackbar.create-success"));
      return;
    }
    // // 更新
    await updateNote({ message: updatedEditorContent });
    toast.success(t("common.snackbar.update-success"));
  }, [isCreation, updatedEditorContent, updateNote, t]);

  // ----------------------------------------------------------------------------------------------------

  if (isAuthenticationError) {
    return <AuthenticationLoginDialog refetch={refetch} />;
  }

  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <NoteEdit
        isLoading={isLoading}
        editorContentString={dataSource?.data?.message || ""}
        setUpdatedEditorContent={setUpdatedEditorContent}
      />

      <MuiContainer maxWidth="xl">
        <MuiLoadingButton
          sx={{ position: "absolute", bottom: 24, right: 16 }}
          disabled={isLoadingUpdatingButton}
          loading={isLoadingUpdatingButton}
          onClick={handleContentChange}
        >
          {isCreation ? "Create" : "Update"}
        </MuiLoadingButton>
      </MuiContainer>
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
