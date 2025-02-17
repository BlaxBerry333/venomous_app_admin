import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import Popover, { usePopover } from "./Popover";

const meta = {
  title: "Base ( MUI ) /Popover",
  component: Popover,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
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
          <p>xxx</p>
          <p>xxx</p>
        </Popover>
      </>
    );
  },
};
