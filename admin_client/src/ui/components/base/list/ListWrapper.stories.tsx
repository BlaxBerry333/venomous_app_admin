import type { Meta, StoryObj } from "@storybook/react";

import { BaseColor } from "~/ui/_helpers";
import { CardWithLabel } from "../card";
import { IconButton } from "../iconbutton";
import { ListItemSize } from "../list-item/ListItem";
import ListWrapper from "./ListWrapper";

const meta = {
  title: "Components/Base ( MUI ) /ListWrapper",
  component: ListWrapper,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    list: {
      description: "列表数据",
      control: "object",
    },
    listItemSize: {
      description: "列表项尺寸",
      control: "select",
      options: Object.values(ListItemSize),
    },
    renderItem: {
      description: "渲染自定义 ListItem",
      control: "object",
    },
  },
  args: {
    listItemSize: ListItemSize.LARGE,
    list: [],
  },
} satisfies Meta<typeof ListWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  args: {
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
  render: (args) => {
    return (
      <>
        <CardWithLabel title="使用默认 ListItem">
          <ListWrapper {...args} list={args.list} />
        </CardWithLabel>

        <CardWithLabel title="使用 renderItem 属性渲染自定义 ListItem">
          <ListWrapper
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
