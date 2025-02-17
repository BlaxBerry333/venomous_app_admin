import type { Meta, StoryObj } from "@storybook/react";

import { ButtonColor } from "../button";
import { IconButton } from "../iconbutton";
import ListItemMeta from "./ListItem.stories";
import ListNestedItem from "./ListNestedItem";

const meta = {
  title: "Base ( MUI ) /ListNestedItem",
  component: ListNestedItem,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...ListItemMeta.argTypes,
    isOmittedWithPopover: {
      description: "是否省略显示并通过 tooltip 展示 nestedList",
      control: "boolean",
    },
  },
  args: {
    ...ListItemMeta.args,
    isOmittedWithPopover: false,
  },
} satisfies Meta<typeof ListNestedItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  args: {
    nestList: [
      {
        title: "xxxxx",
        subtitle: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        icon: "solar:box-minimalistic-bold-duotone",
      },
      {
        title: "xxxxxx",
        subtitle: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        endElement: (
          <IconButton icon="solar:trash-bin-trash-bold-duotone" color={ButtonColor.ERROR} />
        ),
      },
      {
        title: "xxxxxxx",
        subtitle: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
    ],
  },
  render: (args) => {
    return (
      <div style={{ width: 300 }}>
        <ListNestedItem
          {...args}
          icon={"solar:box-minimalistic-bold-duotone"}
          nestList={args.nestList}
        />
        <ListNestedItem {...args} nestList={args.nestList} />
      </div>
    );
  },
};
