import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BaseColor, BaseSize } from "~/ui/_helpers";
import Button, { ButtonVariant } from "./Button";

const meta = {
  title: "Components/Base ( MUI ) /Button",
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
      control: "radio",
      options: Object.values(BaseSize),
    },
    color: {
      description: "按钮颜色",
      control: "select",
      options: Object.values(BaseColor),
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
    size: BaseSize.MEDIUM,
    color: BaseColor.PRIMARY,
    isLoading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
