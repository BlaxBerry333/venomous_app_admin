import type { Meta, StoryObj } from "@storybook/react";

import SettingsDrawer from "./SettingsDrawer";

const meta = {
  title: "Common Layouts/SettingsDrawer",
  component: SettingsDrawer,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    showOptionBlocks: {
      description: "显示选项块",
      control: "object",
    },
  },
} satisfies Meta<typeof SettingsDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  args: {
    showOptionBlocks: {
      themeMode: true,
      themePaletteColorName: true,
      dashboardNavMenuPosition: false,
    },
  },
};
