import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import CardClickable from "./CardClickable";

const meta = {
  title: "Components/Base ( MUI ) /CardClickable",
  component: CardClickable,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CardClickable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <>
        <CardClickable {...args}>
          <strong>点击此处可看到范围</strong>
        </CardClickable>
        <br />

        <CardClickable
          {...args}
          wrapperSx={{ p: 4, backgroundColor: "skyblue" }}
          sx={{ backgroundColor: "pink" }}
        >
          <pre>
            {`
{
  wrapperSx={{ p: 4, backgroundColor: "skyblue" }}
  sx={{ backgroundColor: "pink" }}
}
            `}
          </pre>
        </CardClickable>
        <br />

        <CardClickable {...args} wrapperSx={{ border: 1 }} sx={{ p: 4 }}>
          <pre>
            {`
{
  wrapperSx={{ border: 1 }}
  sx={{ p: 4 }}
}
            `}
          </pre>
        </CardClickable>
      </>
    );
  },
};
