import type { Meta, StoryObj } from "@storybook/react";

import TextField from "./TextField";

const meta = {
  title: "Components/Base ( MUI ) /ControlledForm/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    label: {
      description: "标签",
      control: "text",
    },
    value: {
      description: "输入值",
      control: "text",
    },
    onChange: {
      description: "切换事件",
      action: "onChange",
    },
    clearable: {
      description: "是否可被清除",
      control: "boolean",
    },
    showClearButton: {
      description: "是否显示清除按钮",
      control: "boolean",
    },
    handleOnClear: {
      description: "清除事件",
      action: "handleOnClear",
    },
  },
  args: {
    label: "label xxx",
    clearable: false,
    showClearButton: false,
    value: undefined,
    onChange: (value) => console.log(value),
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
