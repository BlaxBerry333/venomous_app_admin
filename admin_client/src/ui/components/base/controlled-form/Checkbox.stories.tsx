import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";

const meta = {
  title: "Components/Base ( MUI ) /ControlledForm/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    checked: {
      description: "是否选中",
      control: "boolean",
    },
    onChange: {
      description: "切换事件",
      action: "onChange",
    },
    wrapperDirection: {
      description: "使用默认 Label 时包裹元素方向",
      control: "radio",
      options: ["row", "column"],
    },
    startLabel: {
      description: "开始 Label",
      control: "text",
    },
    endLabel: {
      description: "结束 Label",
      control: "text",
    },
  },
  args: {
    checked: false,
    onChange: (checked) => console.log(checked),
    wrapperDirection: "row",
    startLabel: "开始",
    endLabel: "结束",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
