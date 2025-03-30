import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from "./Tooltip";

const meta = {
  title: "Components/Base ( MUI ) /Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    title: {
      description: "提示信息",
      control: "text",
    },
    children: {
      description: "触发提示信息的元素",
      control: "text",
    },
  },
  args: {
    children: <div>Hover me!</div>,
    title: "Tooltip title",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
