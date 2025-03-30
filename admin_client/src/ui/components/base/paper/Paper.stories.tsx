import type { Meta, StoryObj } from "@storybook/react";

import Paper from "./Paper";

const meta = {
  title: "Components/Base ( MUI ) /Paper",
  component: Paper,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    hasElevation: {
      description: "是否有浮动阴影",
      control: "boolean",
    },
    title: {
      description: "标题",
      control: "text",
    },
    subTitle: {
      description: "子标题",
      control: "text",
    },
    keepSubTitlePlaceholder: {
      description: "是否保留子标题占位符",
      control: "boolean",
    },
  },
  args: {
    title: "xxx",
    subTitle: "xxx",
    children: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    hasElevation: false,
    keepSubTitlePlaceholder: false,
  },
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
