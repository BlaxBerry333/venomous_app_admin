import type { Meta, StoryObj } from "@storybook/react";

import Typography, { TypographyColor, TypographyVariant } from "./Typography";

const meta = {
  title: "Base ( MUI ) /Typography",
  component: Typography,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(TypographyVariant),
    },
    color: {
      control: "select",
      options: Object.values(TypographyColor),
    },
  },
  args: {
    children: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    variant: TypographyVariant.BODY1,
    color: TypographyColor.INHERIT,
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
