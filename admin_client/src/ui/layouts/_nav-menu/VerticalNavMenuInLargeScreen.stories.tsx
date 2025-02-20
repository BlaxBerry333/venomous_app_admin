import type { Meta, StoryObj } from "@storybook/react";

import VerticalNavMenuInLargeScreen from "./VerticalNavMenuInLargeScreen";

const meta = {
  title: "Common Layouts/NavMenuVertical ( LargeScreen )",
  component: VerticalNavMenuInLargeScreen,
  parameters: { layout: "fullscreen" },
  // tags: ["autodocs"],
} satisfies Meta<typeof VerticalNavMenuInLargeScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: () => {
    return (
      <VerticalNavMenuInLargeScreen>
        xxx
        <div style={{ height: "200vh" }}></div>
      </VerticalNavMenuInLargeScreen>
    );
  },
};
