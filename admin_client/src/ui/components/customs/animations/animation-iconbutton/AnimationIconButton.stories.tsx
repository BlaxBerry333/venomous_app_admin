import type { Meta, StoryObj } from "@storybook/react";

import IconButtonMeta from "~/ui/components/base/iconbutton/IconButton.stories";
import AnimationIconButton from "./AnimationIconButton";

const meta = {
  title: "Extra (3rd-party ) /AnimationIconButton",
  component: AnimationIconButton,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...IconButtonMeta.argTypes,
  },
  args: {
    ...IconButtonMeta.args,
  },
} satisfies Meta<typeof AnimationIconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
