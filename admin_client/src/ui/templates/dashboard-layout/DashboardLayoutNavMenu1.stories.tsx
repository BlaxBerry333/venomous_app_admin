import type { Meta, StoryObj } from "@storybook/react";

import DashboardLayoutNavMenu from "./DashboardLayoutNavMenu";

const meta = {
  title: "App Templates/DashboardLayout/NavMenu.ParentCollapsable",
  component: DashboardLayoutNavMenu.ParentCollapsable,
  parameters: {
    layout: "centered",
    controls: { disable: true },
    actions: { disable: true },
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof DashboardLayoutNavMenu.ParentCollapsable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <div style={{ height: "60vh", width: 200 }}>
        <DashboardLayoutNavMenu.ParentCollapsable {...args} />
      </div>
    );
  },
};
