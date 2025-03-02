import type { Meta, StoryObj } from "@storybook/react";

import ListItemMeta from "./ListItem.stories";
import ListItemInsideOfNest from "./ListItemInsideOfNest";

const meta = {
  title: "Components/Base ( MUI ) /ListItemInsideOfNest",
  component: ListItemInsideOfNest,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...ListItemMeta.argTypes,
  },
  args: {
    ...ListItemMeta.args,
  },
} satisfies Meta<typeof ListItemInsideOfNest>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <div>
        <ListItemInsideOfNest {...args} />
        <ListItemInsideOfNest {...args} />
        <ListItemInsideOfNest {...args} />
      </div>
    );
  },
};
