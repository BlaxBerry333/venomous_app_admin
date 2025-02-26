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
  },
  args: {
    position: BasePosition.RIGHT_CENTER,
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
          <div>xxx</div>
          <div>xxx</div>
          <div>xxx</div>
        </Popover>
      </>
    );
  },
};
