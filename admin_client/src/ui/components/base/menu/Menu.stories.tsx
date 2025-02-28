import type { Meta, StoryObj } from "@storybook/react";

import { BaseColor } from "~/ui/_helpers";
import { CardWithLabel } from "../card";
import { IconButton } from "../iconbutton";
import { ListItemSize } from "../list-item/ListItem";
import Menu from "./Menu";

const meta = {
  title: "Components/Base ( MUI ) /Menu",
  component: Menu,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    list: {
      description: "列表数据",
    },
    listItemSize: {
      description: "列表项尺寸",
      control: "select",
      options: Object.values(ListItemSize),
    },
  },
  args: {
    listItemSize: ListItemSize.LARGE,
    list: [
      {
        title: "xxxxx",
        subtitle: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        icon: "solar:box-minimalistic-bold-duotone",
      },
      {
        title: "xxxxxx",
        subtitle: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        endElement: (
          <IconButton icon="solar:trash-bin-trash-bold-duotone" color={BaseColor.ERROR} />
        ),
      },
      {
        title: "xxxxxxx",
        subtitle: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
    ],
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <>
        <CardWithLabel title="使用默认 ListItem">
          <Menu {...args} list={args.list} />
        </CardWithLabel>

        <CardWithLabel title="使用 renderItem 属性渲染自定义 ListItem">
          <Menu
            {...args}
            list={args.list}
            renderItem={(item, index) => (
              <p key={item.title}>
                <span>------</span>
                <strong>{`<${index}>`}</strong>
                <strong>{item.title}</strong>
                <span>------</span>
              </p>
            )}
          />
        </CardWithLabel>
      </>
    );
  },
};
