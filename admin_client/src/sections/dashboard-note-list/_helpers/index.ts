import { SelectableNoteType } from "~/services/types/notes";

export const SUPPORTED_NOTE_LIST_CONTENT_TABS = [
  { type: SelectableNoteType.ALL, i18nKey: "all" },
  { type: SelectableNoteType.RAFT, i18nKey: "raft" },
];

/**
 * 获取HTML字符串中的第一行的内容
 */
export function formatHTMLSting(htmlString: string): string {
  return htmlString.match(/>([^<]+)<\/\w+/)?.[1] || "";
}
