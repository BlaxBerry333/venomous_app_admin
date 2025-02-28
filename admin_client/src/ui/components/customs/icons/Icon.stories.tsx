import type { Meta, StoryObj } from "@storybook/react";

import { BaseColor } from "~/ui/_helpers";
import Icon from "./Icon";

const meta = {
  title: "Components/Customs ( 3rd-party ) /Icon",
  component: Icon,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    color: {
      description: "图标颜色",
      control: "select",
      options: Object.values(BaseColor),
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
    color: BaseColor.PRIMARY,
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
