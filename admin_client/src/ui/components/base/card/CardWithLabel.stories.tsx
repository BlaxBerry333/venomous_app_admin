import type { Meta, StoryObj } from "@storybook/react";

import CardWithLabel from "./CardWithLabel";

const meta = {
  title: "Components/Base ( MUI ) /CardWithLabel",
  component: CardWithLabel,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    title: {
      description: "标题",
      control: "text",
    },
    children: {
      description: "子元素",
      control: "text",
    },
  },
  args: {
    title: "title xxx",
    children: "content xxx",
  },
} satisfies Meta<typeof CardWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
