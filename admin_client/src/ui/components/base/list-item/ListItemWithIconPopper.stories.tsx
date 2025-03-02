import type { Meta, StoryObj } from "@storybook/react";

import { PopperPlacement } from "../popper";
import ListItemWithIconPopper from "./ListItemWithIconPopper";
import ListItemWithNestMeta from "./ListItemWithNest.stories";

const meta = {
  title: "Components/Base ( MUI ) /ListItemWithIconPopper",
  component: ListItemWithIconPopper,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...ListItemWithNestMeta.argTypes,
    popperPlacement: {
      description: "弹出位置",
      control: "select",
      options: Object.values(PopperPlacement),
    },
  },
  args: {
    ...ListItemWithNestMeta.args,
    popperPlacement: PopperPlacement.right,
  },
} satisfies Meta<typeof ListItemWithIconPopper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <div>
        <ListItemWithIconPopper {...args} />
      </div>
    );
  },
};
