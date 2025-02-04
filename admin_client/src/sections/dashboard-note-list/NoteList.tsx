import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { MOCK_DATA } from "~/__mocks__/mocked-data/_notes";
import type { Nullable } from "~/common/types/tools";
import { SelectableNoteType, type NoteDataType } from "~/services/types/notes";
import NoteListTabContent from "./NoteListTabContent";
import NoteListTabContentOfCards from "./NoteListTabContentOfCards";
import NoteListTabContentOfList from "./NoteListTabContentOfTable";

const NoteList: NamedExoticComponent<{
  navigateToEditorPage: (id: string) => void;
}> = memo(({ navigateToEditorPage }) => {
  const handleSelectNote = useCallback(
    (note: Nullable<NoteDataType>) => {
      if (!note) return;
      navigateToEditorPage(note._id);
    },
    [navigateToEditorPage],
  );

  // ----------------------------------------------------------------------------------------------------

  const getFilteredDataSource = useCallback((type: SelectableNoteType): NoteDataType[] => {
    if (type === SelectableNoteType.ALL) return MOCK_DATA;
    return MOCK_DATA.filter((item) => item.type === type);
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return (
    <NoteListTabContent
      renderContentOfTableType={(tab) => (
        <NoteListTabContentOfList
          dataSource={getFilteredDataSource(tab.type)}
          isLoading={false}
          setSelectedItem={handleSelectNote}
        />
      )}
      renderContentOfCardType={(tab) => (
        <NoteListTabContentOfCards
          dataSource={getFilteredDataSource(tab.type)}
          isLoading={false}
          setSelectedItem={handleSelectNote}
        />
      )}
      renderContentFilter={() => <></>}
    />
  );
});

export default NoteList;
