import type { Meta, StoryObj } from "@storybook/react";

import HorizontalNavMenuInLargeScreen from "./HorizontalNavMenuInLargeScreen";

const meta = {
  title: "Common Layouts/NavMenuHorizontal ( LargeScreen )",
  component: HorizontalNavMenuInLargeScreen,
  parameters: { layout: "fullscreen" },
  // tags: ["autodocs"],
} satisfies Meta<typeof HorizontalNavMenuInLargeScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: () => {
    return (
      <div>
        <HorizontalNavMenuInLargeScreen>
          xxx
          <div style={{ width: "200vw" }}></div>
        </HorizontalNavMenuInLargeScreen>
      </div>
    );
  },
};
