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
      control: "radio",
      options: Object.values(ButtonVariant),
    },
    size: {
      control: "radio",
      options: Object.values(ButtonSize),
    },
    color: {
      control: "radio",
      options: Object.values(ButtonColor),
    },
  },
  args: {
    onClick: fn(),
    children: "xxx",
    variant: ButtonVariant.CONTAINED,
    size: ButtonSize.MEDIUM,
    color: ButtonColor.PRIMARY,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
