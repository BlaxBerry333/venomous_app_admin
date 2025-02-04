import type { NoteDataType } from "~/services/types/notes";

export enum SupportedNoteListContentType {
  Table = "Table",
  Cards = "Cards",
}

export type NoteListTabContentRenderComponentProps = {
  dataSource: NoteDataType[];
  isLoading: boolean;
  setSelectedItem: (item: NoteDataType) => void;
};
