import type { Meta, StoryObj } from "@storybook/react";

import SectionWithLabel from "./SectionWithLabel";

const meta = {
  title: "Components/Base ( MUI ) /SectionWithLabel",
  component: SectionWithLabel,
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
} satisfies Meta<typeof SectionWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
