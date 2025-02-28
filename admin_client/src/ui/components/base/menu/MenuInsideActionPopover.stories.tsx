import type { Meta, StoryObj } from "@storybook/react";

import MenuMeta from "~/ui/components/base/menu/Menu.stories";
import PopoverMeta from "~/ui/components/base/popover/Popover.stories";

import MenuInsideActionPopover from "./MenuInsideActionPopover";

const meta = {
  title: "Components/Base ( MUI ) /MenuInsideActionPopover",
  component: MenuInsideActionPopover,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    actionIsNotAllowed: {
      description: "是否禁用操作",
      control: "boolean",
    },
    actionItemList: {
      description: "操作列表",
    },
    children: {
      description: "自定义内容",
      control: "text",
    },
    popoverEscapeKeyDown: {
      ...PopoverMeta.argTypes.escapeKeyDown,
    },
    popoverPosition: {
      ...PopoverMeta.argTypes.position,
    },
    popoverArrow: {
      ...PopoverMeta.argTypes.arrow,
    },
    popoverAutoWidth: {
      ...PopoverMeta.argTypes.autoWidth,
    },
    listItemSize: {
      ...MenuMeta.argTypes.listItemSize,
    },
  },
  args: {
    actionIsNotAllowed: false,
    actionItemList: MenuMeta.args.list,
    children: "",
    popoverEscapeKeyDown: PopoverMeta.args.escapeKeyDown,
    popoverPosition: PopoverMeta.args.position,
    popoverArrow: PopoverMeta.args.arrow,
    popoverAutoWidth: PopoverMeta.args.autoWidth,
    listItemSize: MenuMeta.args.listItemSize,
  },
} satisfies Meta<typeof MenuInsideActionPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
