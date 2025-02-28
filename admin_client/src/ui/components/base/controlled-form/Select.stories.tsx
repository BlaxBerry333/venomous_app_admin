import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta = {
  title: "Components/Base ( MUI ) /ControlledForm/Select",
  component: Select,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    label: {
      description: "标签",
      control: "text",
    },
    options: {
      description: "选项",
    },
    value: {
      description: "选中值",
      control: "text",
    },
    onChange: {
      description: "切换事件",
      action: "onChange",
    },
  },
  args: {
    label: "label xxx",
    options: [
      { title: "中国", value: "CN" },
      { title: "美国", value: "US" },
      { title: "日本", value: "JP" },
      { title: "法国", value: "FR" },
      { title: "意大利", value: "IT" },
      { title: "英国", value: "GB" },
      { title: "德国", value: "DE" },
    ],
    value: undefined,
    onChange: (option) => console.log(option),
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
