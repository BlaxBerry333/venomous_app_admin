import type { Meta, StoryObj } from "@storybook/react";

import CollapsableWrapper from "./CollapsableWrapper";

const meta = {
  title: "Components/Base ( MUI ) /CollapsableWrapper",
  component: CollapsableWrapper,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    defaultExpanded: {
      description: "是否默认展开",
      control: "boolean",
    },
    hideDefaultExpandIcon: {
      description: "是否隐藏默认展开图标",
      control: "boolean",
    },
    reverseDefaultExpandIcon: {
      description: "是否反转默认展开图标的位置",
      control: "boolean",
    },
    renderCollapsedTrigger: {
      description: "渲染折叠触发器",
    },
    renderCollapsedContent: {
      description: "渲染折叠内容",
    },
  },
  args: {
    defaultExpanded: false,
    hideDefaultExpandIcon: false,
    renderCollapsedTrigger: (params) => {
      return (
        <div
          style={{ width: 200, cursor: "pointer", backgroundColor: "pink" }}
          onClick={params.toggleExpanded}
        >
          <strong>click me</strong>
          <p>{params.isExpanded ? "isOpen" : "isClose"}</p>
        </div>
      );
    },
    renderCollapsedContent: () => {
      return <div style={{ padding: "10px 0" }}>xxxxxxxxx</div>;
    },
  },
} satisfies Meta<typeof CollapsableWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
