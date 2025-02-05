import type { NamedExoticComponent } from "react";
import { memo, Suspense, useCallback } from "react";

import { MOCK_DATA } from "~/__mocks__/mocked-data/_notes";
import { CustomConfirmDialog } from "~/common/components/custom/dialogs";
import useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import type { Nullable } from "~/common/types/tools";
import { SelectableNoteType, type NoteDataType } from "~/services/types/notes";
import NoteListTabContent from "./NoteListTabContent";
import NoteListTabContentOfCards from "./NoteListTabContentOfCards";
import NoteListTabContentOfList from "./NoteListTabContentOfTable";

const NoteList: NamedExoticComponent<{
  navigateToEditorPage: (id: string) => void;
}> = memo(({ navigateToEditorPage }) => {
  const { t } = useTranslation();

  // ----------------------------------------------------------------------------------------------------

  const getFilteredDataSource = useCallback((type: SelectableNoteType): NoteDataType[] => {
    if (type === SelectableNoteType.ALL) return MOCK_DATA;
    return MOCK_DATA.filter((item) => item.type === type);
  }, []);

  // ----------------------------------------------------------------------------------------------------

  const handleSelectNote = useCallback(
    (note: Nullable<NoteDataType>) => {
      if (!note) return;
      navigateToEditorPage(note._id);
    },
    [navigateToEditorPage],
  );

  // ----------------------------------------------------------------------------------------------------

  const confirmDeleteDialog = useBoolean(false);

  const handleDeleteNote = useCallback(() => {
    // ...
    confirmDeleteDialog.setFalse();
  }, [confirmDeleteDialog]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <NoteListTabContent
        renderContentOfTableType={(tab) => (
          <NoteListTabContentOfList
            dataSource={getFilteredDataSource(tab.type)}
            isLoading={false}
            setSelectedItem={handleSelectNote}
            deleteSelectedItem={confirmDeleteDialog.setTrue}
          />
        )}
        renderContentOfCardType={(tab) => (
          <NoteListTabContentOfCards
            dataSource={getFilteredDataSource(tab.type)}
            isLoading={false}
            setSelectedItem={handleSelectNote}
            deleteSelectedItem={confirmDeleteDialog.setTrue}
          />
        )}
        renderContentFilter={() => <></>}
      />

      <Suspense>
        <CustomConfirmDialog
          isOpen={confirmDeleteDialog.value}
          onClose={confirmDeleteDialog.setFalse}
          onConfirm={handleDeleteNote}
          title={t("common.tooltips.confirm-delete")}
          content={undefined}
        />
      </Suspense>
    </>
  );
});

export default NoteList;
