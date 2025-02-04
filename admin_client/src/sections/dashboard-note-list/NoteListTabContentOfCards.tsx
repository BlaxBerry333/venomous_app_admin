import type { NamedExoticComponent } from "react";
import { memo } from "react";

import type { NoteListTabContentRenderComponentProps } from "./_types";

const NoteListTabContentOfCards: NamedExoticComponent<NoteListTabContentRenderComponentProps> =
  memo(() => {
    return <div>NoteListTabContentOfCards</div>;
  });

export default NoteListTabContentOfCards;
