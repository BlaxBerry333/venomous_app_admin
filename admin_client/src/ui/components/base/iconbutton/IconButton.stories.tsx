import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import buttonMeta from "~/ui/components/base/button/Button.stories";
import iconMeta from "~/ui/components/customs/icons/Icon.stories";
import IconButton from "./IconButton";

const meta = {
  title: "Base ( MUI ) /IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...iconMeta.argTypes,
    size: buttonMeta.argTypes.size,
  },
  args: {
    onClick: fn(),
    ...iconMeta.args,
    size: buttonMeta.args.size,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
