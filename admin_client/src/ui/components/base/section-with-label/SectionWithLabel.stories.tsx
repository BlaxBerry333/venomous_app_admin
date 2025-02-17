import type { Meta, StoryObj } from "@storybook/react";

import SectionWithLabel from "./SectionWithLabel";

const meta = {
  title: "Base ( MUI ) /SectionWithLabel",
  component: SectionWithLabel,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {},
  args: {
    children: "content xxx",
    title: "title xxx",
  },
} satisfies Meta<typeof SectionWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
