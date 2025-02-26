import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import Popover, { usePopover } from "./Popover";

const meta = {
  title: "Components/Base ( MUI ) /Popover",
  component: Popover,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    anchorOrigin: {
      description: "锚点位置",
      control: "object",
    },
    transformOrigin: {
      description: "变换位置",
      control: "object",
    },
  },
  args: {
    anchorOrigin: { vertical: "center", horizontal: "right" },
    transformOrigin: { vertical: "center", horizontal: "left" },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const popover = usePopover();
    return (
      <>
        <Button onClick={popover.handleOpen}>open</Button>
        <Popover
          isOpen={popover.isOpen}
          anchorEl={popover.anchorEl}
          handleClose={popover.handleClose}
          {...args}
        >
          <div>xxx</div>
          <div>xxx</div>
          <div>xxx</div>
        </Popover>
      </>
    );
  },
};
