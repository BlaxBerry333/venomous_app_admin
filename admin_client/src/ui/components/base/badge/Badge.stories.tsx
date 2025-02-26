import type { Meta, StoryObj } from "@storybook/react";

import MuiStack from "@mui/material/Stack";

import { Button } from "../button";
import { IconButton } from "../iconbutton";
import Badge from "./Badge";

const meta = {
  title: "Components/Base ( MUI ) /Badge",
  component: Badge,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    showBadge: {
      description: "是否显示",
      control: "boolean",
    },
  },
  args: {
    showBadge: true,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <MuiStack spacing={2}>
        <div>
          <Badge {...args}>
            <Button>xxx</Button>
          </Badge>
        </div>

        <div>
          <Badge {...args}>
            <IconButton icon={"solar:box-minimalistic-bold-duotone"} />
          </Badge>
        </div>

        <div>
          <Badge {...args}>
            <div style={{ height: "100px", width: "100px", backgroundColor: "pink" }} />
          </Badge>
        </div>
      </MuiStack>
    );
  },
};
