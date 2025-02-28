import type { Meta, StoryObj } from "@storybook/react";

import { BaseColor } from "~/ui/_helpers";
import CardWithActions from "./CardWithActions";

const meta = {
  title: "Components/Base ( MUI ) /CardWithActions",
  component: CardWithActions,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    title: {
      description: "标题",
      control: "text",
    },
    subTitle: {
      description: "副标题",
      control: "text",
    },
    isLoading: {
      description: "是否加载中",
      control: "boolean",
    },
    isBlocked: {
      description: "是否禁用",
      control: "boolean",
    },
    isCustomCardContent: {
      description: "是否使用自定义内容",
      control: "boolean",
    },
    actionIsNotAllowed: {
      description: "是否禁用操作按钮",
      control: "boolean",
    },
  },
  args: {
    isLoading: false,
    isBlocked: false,
    isCustomCardContent: false,
    title: "Aaa",
    subTitle: "BbbbbbbbbbBbbbbbbbbb",
    actionIsNotAllowed: false,
  },
} satisfies Meta<typeof CardWithActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  args: {
    actionItemList: [
      {
        title: "Details",
        icon: "solar:info-square-line-duotone",
        color: BaseColor.INHERIT,
        onClick: () => console.log("Details"),
      },
      {
        title: "Delete",
        icon: "solar:trash-bin-trash-bold-duotone",
        color: BaseColor.ERROR,
        onClick: () => console.log("Delete"),
      },
    ],
  },
  render: (args) => {
    return <CardWithActions {...args}>xxxxxx</CardWithActions>;
  },
};
