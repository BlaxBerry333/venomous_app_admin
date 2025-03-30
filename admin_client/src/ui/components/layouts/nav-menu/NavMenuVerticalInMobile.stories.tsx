import type { Meta, StoryObj } from "@storybook/react";

import NavMenuVerticalInMobile from "./NavMenuVerticalInMobile";

const meta = {
  title: "Components/Layouts/NavMenu ( Vertical in Mobile )",
  component: NavMenuVerticalInMobile,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
} satisfies Meta<typeof NavMenuVerticalInMobile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: () => {
    return (
      <NavMenuVerticalInMobile>
        aaa
        <div style={{ height: "200vh" }}></div>
      </NavMenuVerticalInMobile>
    );
  },
};
