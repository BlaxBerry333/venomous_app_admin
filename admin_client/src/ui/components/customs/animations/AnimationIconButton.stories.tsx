import type { Meta, StoryObj } from "@storybook/react";

import IconButtonMeta from "~/ui/components/base/iconbutton/IconButton.stories";
import AnimationIconButton from "./AnimationIconButton";

const meta = {
  title: "Components/Customs ( 3rd-party ) /Animations/IconButton",
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
