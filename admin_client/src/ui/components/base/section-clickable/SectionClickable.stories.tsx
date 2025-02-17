import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SectionWithLabel } from "../section-with-label";
import SectionClickable from "./SectionClickable";

const meta = {
  title: "Base ( MUI ) /SectionClickable",
  component: SectionClickable,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof SectionClickable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    return (
      <>
        <SectionClickable {...args}>
          <strong>点击此处可看到范围</strong>
        </SectionClickable>
        <br />

        <SectionWithLabel title="wrapperSx 与 sx 影响的元素不同">
          <SectionClickable
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
          </SectionClickable>
          <br />

          <SectionClickable wrapperSx={{ border: 1 }} sx={{ p: 4 }}>
            <pre>
              {`
{
  wrapperSx={{ border: 1 }}
  sx={{ p: 4 }}
}
            `}
            </pre>
          </SectionClickable>
        </SectionWithLabel>
      </>
    );
  },
};
