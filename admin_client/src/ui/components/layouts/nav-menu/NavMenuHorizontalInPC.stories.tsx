import type { Meta, StoryObj } from "@storybook/react";

import NavMenuHorizontalInPC from "./NavMenuHorizontalInPC";

const meta = {
  title: "Components/Layouts/NavMenu ( Horizontal in PC )",
  component: NavMenuHorizontalInPC,
  parameters: { layout: "fullscreen" },
  // tags: ["autodocs"],
} satisfies Meta<typeof NavMenuHorizontalInPC>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: () => {
    return (
      <div>
        <NavMenuHorizontalInPC>
          xxx
          <div style={{ width: "200vw" }}></div>
        </NavMenuHorizontalInPC>
      </div>
    );
  },
};
