import type { Meta, StoryObj } from "@storybook/react";

import { toast } from "sonner";

import { Button } from "~/ui/components";
import Snackbar, { SnackbarPosition } from "./Snackbar";

const meta = {
  title: "Components/Customs ( 3rd-party ) /Snackbar",
  component: Snackbar,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      description: "位置",
      options: Object.values(SnackbarPosition),
    },
  },
  args: {
    position: SnackbarPosition.BOTTOM_RIGHT,
  },
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <>
        <Snackbar {...args} />
        <Button onClick={() => toast.success("success")}>success</Button>
        <Button onClick={() => toast.error("error")}>error</Button>
        <Button onClick={() => toast.warning("warning")}>warning</Button>
        <Button onClick={() => toast.info("info")}>info</Button>
        <Button onClick={() => toast.loading("loading")}>loading</Button>
      </>
    );
  },
};
