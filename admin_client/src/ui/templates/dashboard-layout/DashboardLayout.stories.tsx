import type { Meta, StoryObj } from "@storybook/react";

import DashboardLayout from "./DashboardLayout";

const meta = {
  title: "App Templates/DashboardLayout",
  component: DashboardLayout,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof DashboardLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => (
    <DashboardLayout {...args}>
      <div style={{ height: "500px" }}>AAA</div>
      <div style={{ height: "500px" }}>BBB</div>
      <div style={{ height: "500px" }}>CCC</div>
    </DashboardLayout>
  ),
};
