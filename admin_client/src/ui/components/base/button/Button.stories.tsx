import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button, { ButtonColor, ButtonSize, ButtonVariant } from "./Button";

const meta = {
  title: "Base ( MUI ) /Button",
  component: Button,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "按钮类型",
      control: "select",
      options: Object.values(ButtonVariant),
    },
    size: {
      description: "按钮尺寸",
      control: "select",
      options: Object.values(ButtonSize),
    },
    color: {
      description: "按钮颜色",
      control: "select",
      options: Object.values(ButtonColor),
    },
    isLoading: {
      description: "是否加载中",
      control: "boolean",
    },
  },
  args: {
    onClick: fn(),
    children: "Abc",
    variant: ButtonVariant.CONTAINED,
    size: ButtonSize.MEDIUM,
    color: ButtonColor.PRIMARY,
    isLoading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
