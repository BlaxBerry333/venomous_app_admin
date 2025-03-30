import type { Meta, StoryObj } from "@storybook/react";

import VirtualGrid from "./VirtualGrid";

const meta = {
  title: "Components/Customs ( 3rd-party ) /Virtual/Grid",
  component: VirtualGrid,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    list: {
      description: "格子列表",
    },
    renderGridItem: {
      description: "渲染每个格子的内容",
    },
    gridStyle: {
      description: "整个格子的样式",
    },
    gridItemStyle: {
      description: "每个格子的样式",
    },
    cols: {
      description: "每个格子的列数",
    },
  },
  args: {
    gridStyle: {},
    gridItemStyle: {},
    cols: {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
    renderGridItem: (_, index) => {
      return (
        <div style={{ height: 100, width: "100%", border: "1px solid grey" }}>
          {`Item ${index + 1}`}
        </div>
      );
    },
    list: Array.from({ length: 100 }, (_, index) => index),
  },
} satisfies Meta<typeof VirtualGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <div style={{ height: 500, width: "90vw", border: "1px solid grey" }}>
        <VirtualGrid {...args} />
      </div>
    );
  },
};
