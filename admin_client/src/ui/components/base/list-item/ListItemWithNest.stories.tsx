import type { Meta, StoryObj } from "@storybook/react";

import ListItemMeta from "./ListItem.stories";
import ListItemWithNest from "./ListItemWithNest";

const meta = {
  title: "Components/Base ( MUI ) /ListItemWithNest",
  component: ListItemWithNest,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...ListItemMeta.argTypes,
    nestList: {
      description: "子项列表",
      control: "object",
    },
  },
  args: {
    ...ListItemMeta.args,
    nestList: [
      {
        title: "子项1",
        icon: "solar:box-minimalistic-bold-duotone",
      },
      {
        title: "子项2",
        icon: "solar:box-minimalistic-bold-duotone",
      },
    ],
  },
} satisfies Meta<typeof ListItemWithNest>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
