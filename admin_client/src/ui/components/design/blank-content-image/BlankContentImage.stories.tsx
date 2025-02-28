import type { Meta, StoryObj } from "@storybook/react";

import BlankContentImage from "./BlankContentImage";

const meta = {
  title: "Components/Design ( svg、assets ) /BlankContentImage",
  component: BlankContentImage,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
} satisfies Meta<typeof BlankContentImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: () => {
    return (
      <div style={{ width: "300px", height: "500px", backgroundColor: "wheat" }}>
        <BlankContentImage />
      </div>
    );
  },
};
