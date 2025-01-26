import "./tiptap-editor.scss";

import type { NamedExoticComponent } from "react";
import { memo } from "react";

import Divider from "@mui/material/Divider";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorProvider, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";

import CodeBlockComponent from "./TipTapEditorCodeBlock";
import TipTapEditorToolbar from "./TipTapEditorToolbar";

const TipTapEditor: NamedExoticComponent<{
  content: string;
  editable: boolean;
}> = memo(({ content, editable }) => {
  return (
    <EditorProvider
      content={content}
      editable={editable}
      autofocus={editable ? "end" : false}
      extensions={[
        StarterKit.configure({ codeBlock: false }),
        Underline,
        Color,
        Link,
        TextStyle,
        TaskList,
        TaskItem.configure({ nested: true }),
        Image.configure({ inline: true, allowBase64: true }),
        CodeBlockLowlight.extend({
          addNodeView: () => ReactNodeViewRenderer(CodeBlockComponent),
        }).configure({
          lowlight: createLowlight(all),
          defaultLanguage: "plaintext",
        }),
      ]}
      slotBefore={
        <>
          <TipTapEditorToolbar />
          <Divider />
        </>
      }
    />
  );
});

export default TipTapEditor;
