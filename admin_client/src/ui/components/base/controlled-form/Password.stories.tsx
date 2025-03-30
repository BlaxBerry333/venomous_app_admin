import type { Meta, StoryObj } from "@storybook/react";

import Password from "./Password";
import TextFieldMeta from "./TextField.stories";

const meta = {
  title: "Components/Base ( MUI ) /ControlledForm/Password",
  component: Password,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...TextFieldMeta.argTypes,
  },
  args: {
    ...TextFieldMeta.args,
  },
} satisfies Meta<typeof Password>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
