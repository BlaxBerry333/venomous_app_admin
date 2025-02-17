import type { Meta, StoryObj } from "@storybook/react";

import { ButtonColor } from "../button";
import { IconButton } from "../iconbutton";
import { SectionWithLabel } from "../section-with-label";
import ListWrapper from "./ListWrapper";

const meta = {
  title: "Base ( MUI ) /ListWrapper",
  component: ListWrapper,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    list: {
      description: "列表数据",
      control: "object",
    },
    renderItem: {
      description: "渲染自定义 ListItem",
      control: "object",
    },
  },
  args: {
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
      <>
        <SectionWithLabel title="使用默认 ListItem">
          <ListWrapper {...args} list={args.list} />
        </SectionWithLabel>

        <SectionWithLabel title="使用 renderItem 属性渲染自定义 ListItem">
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
        </SectionWithLabel>
      </>
    );
  },
};
