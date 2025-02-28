import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import AvatarMeta from "~/ui/components/base/avatar/Avatar.stories";
import AnimationAvatar from "./AnimationAvatar";

const meta = {
  title: "Components/Customs ( 3rd-party ) /Animations/Avatar",
  component: AnimationAvatar,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...AvatarMeta.argTypes,
  },
  args: {
    ...AvatarMeta.args,
    onClick: fn(),
  },
} satisfies Meta<typeof AnimationAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  args: {
    src: "https://avatars.githubusercontent.com/u/166675080?v=4",
  },
};
