import type { Meta, StoryObj } from "@storybook/react";

import TipTapEditor from "./TipTapEditor";

const meta = {
  title: "Components/Customs ( 3rd-party ) /TipTapEditor",
  component: TipTapEditor,
  parameters: { layout: "fullscreen" },
  // tags: ["autodocs"],
  argTypes: {
    content: {
      description: "编辑器内容",
      control: "text",
    },
    editable: {
      description: "是否可编辑",
      control: "boolean",
    },
    handleContentChange: {
      description: "内容变化处理函数",
    },
  },
  args: {
    content: "",
    editable: true,
    handleContentChange: () => {},
  },
} satisfies Meta<typeof TipTapEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
