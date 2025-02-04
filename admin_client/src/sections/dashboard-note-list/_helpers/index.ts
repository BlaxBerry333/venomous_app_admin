import { SelectableNoteType } from "~/services/types/notes";

export const SUPPORTED_NOTE_LIST_CONTENT_TABS = [
  { type: SelectableNoteType.ALL, i18nKey: "all" },
  { type: SelectableNoteType.RAFT, i18nKey: "raft" },
];
