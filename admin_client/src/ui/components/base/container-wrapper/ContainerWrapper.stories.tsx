import type { Meta, StoryObj } from "@storybook/react";

import ContainerWrapper, { ContainerMaxBreakpoint } from "./ContainerWrapper";

const meta = {
  title: "Base ( MUI ) /ContainerWrapper",
  component: ContainerWrapper,
  parameters: { layout: "fullscreen" },
  // tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      description: "最大宽度断点",
      control: "radio",
      options: Object.values(ContainerMaxBreakpoint),
    },
  },
  args: {
    maxWidth: ContainerMaxBreakpoint.SM,
  },
} satisfies Meta<typeof ContainerWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <ContainerWrapper {...args}>
        <div
          style={{
            backgroundColor: "skyblue",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {`breakpoint: ${args.maxWidth}`}
        </div>
      </ContainerWrapper>
    );
  },
};
