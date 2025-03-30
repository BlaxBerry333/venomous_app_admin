import type { Meta, StoryObj } from "@storybook/react";

import MaskWithLoading, { LoadingProgress } from "./MaskWithLoading";

const meta = {
  title: "Components/Base ( MUI ) /MaskWithLoading",
  component: MaskWithLoading,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    isLoading: {
      description: "是否加载中",
      control: "boolean",
    },
    progress: {
      description: "加载进度条样式",
      control: "radio",
      options: Object.values(LoadingProgress),
    },
  },
  args: {
    isLoading: true,
    progress: LoadingProgress.LINEAR,
  },
} satisfies Meta<typeof MaskWithLoading>;

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
        <MaskWithLoading {...args} />
      </div>
    );
  },
};
