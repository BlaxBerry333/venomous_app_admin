import type { Meta, StoryObj } from "@storybook/react";

import { BaseColor, BaseSize } from "~/ui/_helpers";
import { IconButton } from "../iconbutton";
import ListItem, { ListItemSize } from "./ListItem";

const meta = {
  title: "Components/Base ( MUI ) /ListItem",
  component: ListItem,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    title: {
      description: "标题",
      control: "text",
    },
    subtitle: {
      description: "副标题",
      control: "text",
    },
    size: {
      description: "尺寸",
      control: "select",
      options: Object.values(ListItemSize),
    },
  },
  args: {
    title: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    subtitle: "xxxxxxxxx",
    size: ListItemSize.LARGE,
  },
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <>
        <ListItem {...args} subtitle={undefined} />
        <ListItem {...args} />
        <ListItem
          icon="solar:box-minimalistic-bold-duotone"
          title={args.title}
          subtitle={args.subtitle}
        />
        <ListItem
          title={args.title}
          subtitle={args.subtitle}
          endElement={
            <IconButton
              icon="solar:trash-bin-trash-bold-duotone"
              color={BaseColor.ERROR}
              size={BaseSize.SMALL}
            />
          }
        />

        <ListItem {...args} selected />
        <ListItem
          icon="solar:box-minimalistic-bold-duotone"
          title={args.title}
          subtitle={args.subtitle}
          selected
        />
        <ListItem
          title={args.title}
          subtitle={args.subtitle}
          endElement={
            <IconButton
              icon="solar:trash-bin-trash-bold-duotone"
              color={BaseColor.ERROR}
              size={BaseSize.SMALL}
            />
          }
          selected
        />
      </>
    );
  },
};
