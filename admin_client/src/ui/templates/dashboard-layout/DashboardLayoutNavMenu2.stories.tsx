import type { Meta, StoryObj } from "@storybook/react";

import DashboardLayoutNavMenu from "./DashboardLayoutNavMenu";

const meta = {
  title: "App Templates/DashboardLayout/NavMenu.ParentIconOnly",
  component: DashboardLayoutNavMenu.ParentIconOnly,
  parameters: {
    layout: "centered",
    controls: { disable: true },
    actions: { disable: true },
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof DashboardLayoutNavMenu.ParentIconOnly>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
