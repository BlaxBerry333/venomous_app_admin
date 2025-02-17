import type { Meta, StoryObj } from "@storybook/react";

import { ButtonColor } from "~/ui/components/base/button";
import Icon from "./Icon";

const meta = {
  title: "Customs/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    color: {
      description: "图标颜色",
      control: "radio",
      options: Object.values(ButtonColor),
    },
    icon: {
      description: "图标名称 ( https://icon-sets.iconify.design/ )",
      control: "select",
      options: [
        "solar:box-minimalistic-bold-duotone",
        "solar:filters-bold-duotone",
        "devicon:google",
        "skill-icons:instagram",
      ],
    },
  },
  args: {
    color: ButtonColor.PRIMARY,
    icon: "solar:box-minimalistic-bold-duotone",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  args: {
    width: 40,
  },
};
