import type { Meta, StoryObj } from "@storybook/react";

import { BasePosition } from "~/ui/_helpers";
import { Button } from "../button";
import Popover, { usePopover } from "./Popover";

const meta = {
  title: "Components/Base ( MUI ) /Popover",
  component: Popover,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    position: {
      description: "位置",
      control: "select",
      options: Object.values(BasePosition),
    },
    arrow: {
      description: "是否显示箭头",
      control: "boolean",
    },
    escapeKeyDown: {
      description: "是否会自动关闭 ( Esc 按键、点击内容后 )",
      control: "boolean",
    },
    autoWidth: {
      description: "是否自动调整宽度为 Anchor 元素宽度",
      control: "boolean",
    },
  },
  args: {
    position: BasePosition.BOTTOM_CENTER,
    arrow: true,
    escapeKeyDown: false,
    autoWidth: false,
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen, anchorEl, handleClose, handleOpen } = usePopover();
    return (
      <>
        <Button onClick={handleOpen}>open</Button>
        <Popover {...args} {...{ isOpen, anchorEl, handleClose }}>
          <div style={{ height: 200, width: 150 }}>
            <pre style={{ margin: 0 }}>
              {`
 style: {
   height: 200,
   width: 100,
 }
              `}
            </pre>
          </div>
        </Popover>
      </>
    );
  },
};
