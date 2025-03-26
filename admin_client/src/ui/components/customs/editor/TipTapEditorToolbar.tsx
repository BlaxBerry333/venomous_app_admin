import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Icon } from "@iconify/react";
import { useCurrentEditor } from "@tiptap/react";

import MuiDivider from "@mui/material/Divider";
import MuiStack from "@mui/material/Stack";

import { BaseColor } from "~/ui/_helpers";
import { Button, ButtonVariant, Paper, Pulldown } from "~/ui/components/base";

const TipTapEditorToolbar: NamedExoticComponent<unknown> = memo(() => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Paper
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        py: 1,
        px: 0,
        borderBottom: 1,
        borderColor: "divider",
        boxShadow: 0,
        borderRadius: 0,
        display: "flex",
        gap: 0.5,
        flexWrap: "wrap",
      }}
    >
      {/* Headings */}
      <Pulldown
        renderPulldownTrigger={(params) => {
          return (
            <Button
              variant={ButtonVariant.OUTLINED}
              sx={{ width: 200 }}
              onClick={params.handleOpen}
            >
              Headings
            </Button>
          );
        }}
        renderPulldownContent={(params) => {
          return (
            <>
              {[
                {
                  label: "Heading 1",
                  iconString: "hugeicons:heading-01",
                  onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                  isDisabled: !editor.can().toggleHeading({ level: 1 }),
                  isActive: editor.isActive("heading", { level: 1 }),
                },
                {
                  label: "Heading 2",
                  iconString: "hugeicons:heading-02",
                  onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                  isDisabled: !editor.can().toggleHeading({ level: 2 }),
                  isActive: editor.isActive("heading", { level: 2 }),
                },
                {
                  label: "Heading 3",
                  iconString: "hugeicons:heading-03",
                  onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                  isDisabled: !editor.can().toggleHeading({ level: 3 }),
                  isActive: editor.isActive("heading", { level: 3 }),
                },
                {
                  label: "Heading 4",
                  iconString: "hugeicons:heading-04",
                  onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
                  isDisabled: !editor.can().toggleHeading({ level: 4 }),
                  isActive: editor.isActive("heading", { level: 4 }),
                },
                {
                  label: "Heading 5",
                  iconString: "hugeicons:heading-05",
                  onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
                  isDisabled: !editor.can().toggleHeading({ level: 5 }),
                  isActive: editor.isActive("heading", { level: 5 }),
                },
                {
                  label: "Heading 6",
                  iconString: "hugeicons:heading-06",
                  onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
                  isDisabled: !editor.can().toggleHeading({ level: 6 }),
                  isActive: editor.isActive("heading", { level: 6 }),
                },
                {
                  label: "Paragraph",
                  iconString: "hugeicons:paragraph",
                  onClick: () => editor.chain().focus().setParagraph().run(),
                  isDisabled: !editor.can().setParagraph(),
                  isActive: editor.isActive("paragraph"),
                },
              ].map((item) => (
                <Button
                  fullWidth
                  key={item.label}
                  variant={ButtonVariant.TEXT}
                  disabled={item.isDisabled}
                  startIcon={<Icon icon={item.iconString} />}
                  onClick={() => {
                    item.onClick();
                    params.handleClose();
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </>
          );
        }}
      />

      <MuiDivider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

      {/* Text Formatting */}
      {[
        {
          label: "Bold",
          iconString: "solar:text-bold-bold",
          onClick: () => editor.chain().focus().toggleBold().run(),
          isDisabled: !editor.can().chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
        },
        {
          label: "Italic",
          iconString: "solar:text-italic-bold",
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isDisabled: !editor.can().chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
        },
        {
          label: "Underline",
          iconString: "solar:text-underline-bold",
          onClick: () => editor.chain().focus().toggleUnderline().run(),
          isDisabled: !editor.can().chain().focus().toggleUnderline().run(),
          isActive: editor.isActive("underline"),
        },
        {
          label: "Strike",
          iconString: "solar:text-cross-bold",
          onClick: () => editor.chain().focus().toggleStrike().run(),
          isDisabled: !editor.can().chain().focus().toggleStrike().run(),
          isActive: editor.isActive("strike"),
        },
      ].map((item) => (
        <Button
          key={item.label}
          disabled={item.isDisabled}
          color={item.isActive ? BaseColor.PRIMARY : BaseColor.INHERIT}
          onClick={item.onClick}
        >
          <Icon icon={item.iconString} width={20} />
        </Button>
      ))}

      <MuiDivider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

      {/* Code Formatting */}
      {[
        {
          label: "Code",
          iconString: "solar:code-bold",
          onClick: () => editor.chain().focus().toggleCode().run(),
          isDisabled: !editor.can().chain().focus().toggleCode().run(),
          isActive: editor.isActive("code"),
        },
        {
          label: "Code Block",
          iconString: "hugeicons:code",
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          isDisabled: !editor.can().toggleCodeBlock(),
          isActive: editor.isActive("codeBlock"),
        },
        {
          label: "Blockquote",
          iconString: "hugeicons:left-to-right-block-quote",
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          isDisabled: !editor.can().toggleBlockquote(),
          isActive: editor.isActive("blockquote"),
        },
        {
          label: "Image Link",
          iconString: "solar:gallery-minimalistic-outline",
          onClick: () => {
            const url = window.prompt("URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          },
          isDisabled: !editor.can().setImage({ src: "" }),
          isActive: editor.isActive("image"),
        },
      ].map((item) => (
        <Button
          key={item.label}
          disabled={item.isDisabled}
          color={item.isActive ? BaseColor.PRIMARY : BaseColor.INHERIT}
          onClick={item.onClick}
        >
          <Icon icon={item.iconString} width={20} />
        </Button>
      ))}

      <MuiDivider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

      {/* List Formatting */}
      {[
        {
          label: "Bullet List",
          iconString: "hugeicons:left-to-right-list-bullet",
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          isDisabled: !editor.can().toggleBulletList(),
          isActive: editor.isActive("bulletList"),
        },
        {
          label: "Ordered List",
          iconString: "hugeicons:left-to-right-list-number",
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          isDisabled: !editor.can().toggleOrderedList(),
          isActive: editor.isActive("orderedList"),
        },
        {
          label: "Checkable List",
          iconString: "hugeicons:check-list",
          onClick: () => editor.chain().focus().toggleTaskList().run(),
          isDisabled: !editor.can().toggleTaskList(),
          isActive: editor.isActive("taskList"),
        },
      ].map((item) => (
        <Button
          key={item.label}
          disabled={item.isDisabled}
          color={item.isActive ? BaseColor.PRIMARY : BaseColor.INHERIT}
          onClick={item.onClick}
        >
          <Icon icon={item.iconString} width={20} />
        </Button>
      ))}

      <MuiDivider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

      <MuiStack direction="row" spacing={0.5}>
        {[
          {
            label: "Undo",
            iconString: "solar:undo-left-round-bold",
            onClick: () => editor.chain().focus().undo().run(),
            isDisabled: !editor.can().chain().focus().undo().run(),
            isActive: editor.isActive("undo"),
          },
          {
            label: "Redo",
            iconString: "solar:undo-right-round-bold",
            onClick: () => editor.chain().focus().redo().run(),
            isDisabled: !editor.can().chain().focus().redo().run(),
            isActive: editor.isActive("redo"),
          },
        ].map((item) => (
          <Button
            key={item.label}
            disabled={item.isDisabled}
            color={item.isActive ? BaseColor.PRIMARY : BaseColor.INHERIT}
            onClick={item.onClick}
          >
            <Icon icon={item.iconString} width={20} />
          </Button>
        ))}
      </MuiStack>
    </Paper>
  );
});

export default TipTapEditorToolbar;
