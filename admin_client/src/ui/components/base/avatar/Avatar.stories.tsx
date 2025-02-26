import type { Meta, StoryObj } from "@storybook/react";

import { BaseColor, BaseSize } from "~/ui/_helpers";
import { BadgePosition } from "../badge";
import BadgeMeta from "../badge/Badge.stories";
import Avatar from "./Avatar";

const meta = {
  title: "Components/Base ( MUI ) /Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    size: {
      description: "尺寸",
      control: "radio",
      options: Object.values(BaseSize),
    },
    showBadge: BadgeMeta.argTypes.showBadge,
    badgeColor: BadgeMeta.argTypes.color,
    badgePosition: BadgeMeta.argTypes.position,
  },
  args: {
    src: "https://avatars.githubusercontent.com/u/166675080?v=4",
    size: BaseSize.MEDIUM,
    showBadge: false,
    badgeColor: BaseColor.PRIMARY,
    badgePosition: BadgePosition.TOP_RIGHT,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
