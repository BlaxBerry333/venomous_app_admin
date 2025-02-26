import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Switch from "./Switch";

const meta = {
  title: "Components/Base ( MUI ) /Switch",
  component: Switch,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    checked: {
      description: "是否选中",
      control: "boolean",
    },
    onChange: {
      description: "切换事件",
      action: "onChange",
    },
  },
  args: {
    checked: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  args: {},
};
