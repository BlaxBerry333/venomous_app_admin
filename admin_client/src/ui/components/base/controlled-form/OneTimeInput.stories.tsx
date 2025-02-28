import type { Meta, StoryObj } from "@storybook/react";

import OneTimeInput from "./OneTimeInput";

const meta = {
  title: "Components/Base ( MUI ) /ControlledForm/OneTimeInput",
  component: OneTimeInput,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    length: {
      description: "长度",
      control: {
        type: "number",
        min: 1,
        max: 10,
      },
    },
    value: {
      description: "值",
      control: "text",
    },
    onChange: {
      description: "切换事件",
      action: "onChange",
    },
  },
  args: {
    length: 6,
    value: "",
    onChange: (value) => console.log(value),
  },
} satisfies Meta<typeof OneTimeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
