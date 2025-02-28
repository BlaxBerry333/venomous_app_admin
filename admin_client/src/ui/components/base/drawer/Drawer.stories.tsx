import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button } from "../button";
import Drawer, { DrawerPosition } from "./Drawer";

const meta = {
  title: "Components/Base ( MUI ) /Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: "是否打开",
      control: "boolean",
    },
    width: {
      description: "宽度",
      control: "number",
    },
    position: {
      description: "位置",
      control: "select",
      options: Object.values(DrawerPosition),
    },
  },
  args: {
    isOpen: false,
    width: 200,
    position: DrawerPosition.LEFT,
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = React.useState(args.isOpen);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div>Drawer Content</div>
        </Drawer>
      </>
    );
  },
};
