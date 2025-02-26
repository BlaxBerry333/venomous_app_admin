import type { Meta, StoryObj } from "@storybook/react";

import VerticalNavMenuInLargeScreen from "./NavMenuVerticalInPC";

const meta = {
  title: "Components/Layouts/NavMenu ( Vertical in PC )",
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
