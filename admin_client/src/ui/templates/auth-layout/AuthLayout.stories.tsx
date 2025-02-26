import type { Meta, StoryObj } from "@storybook/react";

import AuthLayout from "./AuthLayout";

const meta = {
  title: "App Templates/AuthLayout",
  component: AuthLayout,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof AuthLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => (
    <AuthLayout {...args}>
      <div style={{ height: "500px" }}>AAA</div>
      <div style={{ height: "500px" }}>BBB</div>
      <div style={{ height: "500px" }}>CCC</div>
    </AuthLayout>
  ),
};
