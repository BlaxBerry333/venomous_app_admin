import type { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "~/ui/components";
import VerticalNavMenuInLargeScreen from "./VerticalNavMenuInLargeScreen";

const meta = {
  title: "Layouts/VerticalNavMenuInLargeScreen",
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
        <ListItem
          hasIconPlaceholder
          title="xxxxx"
          subtitle="yyyyy"
          icon={"solar:box-minimalistic-bold-duotone"}
        />
        <div style={{ height: "200vh" }}>xxx</div>
      </VerticalNavMenuInLargeScreen>
    );
  },
};
