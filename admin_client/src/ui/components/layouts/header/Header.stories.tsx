import type { Meta, StoryObj } from "@storybook/react";

import { UI_CONFIGS } from "~/ui/_configs";
import { Button } from "~/ui/components";
import { Logo } from "../logo";
import Header, { HeaderDesign } from "./Header";

const meta = {
  title: "Components/Layouts/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  // tags: ["autodocs"],
  argTypes: {
    height: {
      description: "高度",
      control: "number",
    },
    design: {
      description: "样式",
      control: "radio",
      options: Object.values(HeaderDesign),
    },
    hideOnScroll: {
      description: "滚动隐藏",
      control: "boolean",
    },
  },
  args: {
    height: UI_CONFIGS.size.HEADER_HEIGHT,
    design: HeaderDesign.SHADOW,
    hideOnScroll: false,
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <>
        <Header {...args} renderLogo={<Logo />} renderActions={<Button>xxx</Button>} />
        <div style={{ height: "500px" }}>AAA</div>
        <div style={{ height: "500px" }}>BBB</div>
        <div style={{ height: "500px" }}>CCC</div>
      </>
    );
  },
};
