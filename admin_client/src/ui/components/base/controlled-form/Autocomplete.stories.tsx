import type { Meta, StoryObj } from "@storybook/react";

import Autocomplete from "./Autocomplete";
import SelectMeta from "./Select.stories";

const meta = {
  title: "Components/Base ( MUI ) /ControlledForm/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    ...SelectMeta.argTypes,
  },
  args: {
    ...SelectMeta.args,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
