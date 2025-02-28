import type { Meta, StoryObj } from "@storybook/react";

import MaskWithBlocked from "./MaskWithBlocked";

const meta = {
  title: "Components/Base ( MUI ) /MaskWithBlocked",
  component: MaskWithBlocked,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    show: {
      description: "是否显示",
      control: "boolean",
    },
    message: {
      description: "提示信息",
      control: "text",
    },
  },
  args: {
    show: true,
    message: "Access Denied",
  },
} satisfies Meta<typeof MaskWithBlocked>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",

  render: (args) => {
    return (
      <div style={{ position: "relative", width: 300, height: 300, backgroundColor: "pink" }}>
        <pre>
          {`
  style: { 
    position: "relative",
    width: 250, 
    height: 250, 
    backgroundColor: "pink"
  }
          `}
        </pre>
        <MaskWithBlocked {...args} />
      </div>
    );
  },
};
