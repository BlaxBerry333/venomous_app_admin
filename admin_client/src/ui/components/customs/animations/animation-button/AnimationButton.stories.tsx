import type { Meta, StoryObj } from "@storybook/react";

import ButtonMeta from "~/ui/components/base/button/Button.stories";
import AnimationButton from "./AnimationButton";

const meta = {
  title: "Components/Customs ( 3rd-party ) /AnimationButton",
  component: AnimationButton,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...ButtonMeta.argTypes,
  },
  args: {
    ...ButtonMeta.args,
  },
} satisfies Meta<typeof AnimationButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
