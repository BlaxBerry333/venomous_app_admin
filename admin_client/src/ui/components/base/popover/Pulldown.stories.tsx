import type { Meta, StoryObj } from "@storybook/react";

import PopoverMeta from "~/ui/components/base/popover/Popover.stories";

import { Button } from "~/ui/components/base/button";
import Pulldown from "./Pulldown";

const meta = {
  title: "Components/Base ( MUI ) /PopoverForPulldown",
  component: Pulldown,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    escapeKeyDown: {
      ...PopoverMeta.argTypes.escapeKeyDown,
    },
    renderPulldownTrigger: {
      description: "渲染下拉触发器",
    },
    renderPulldownContent: {
      description: "渲染下拉内容",
    },
  },
  args: {
    escapeKeyDown: PopoverMeta.args.escapeKeyDown,
    renderPulldownTrigger: (params) => {
      return (
        <div
          style={{ width: 200, cursor: "pointer", backgroundColor: "pink" }}
          onClick={params.handleOpen}
        >
          <strong>click me</strong>
          <p>{params.isOpen ? "isOpen" : "isClose"}</p>
        </div>
      );
    },
    renderPulldownContent: (params) => {
      return (
        <div style={{ padding: "10px 0" }}>
          <Button onClick={params.handleClose}>Close</Button>
        </div>
      );
    },
  },
} satisfies Meta<typeof Pulldown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
