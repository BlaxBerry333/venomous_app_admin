import type { Meta, StoryObj } from "@storybook/react";

import ErrorImageMeta from "~/ui/components/design/error-image/ErrorImage.stories";
import ErrorLayout from "./ErrorLayout";

const meta = {
  title: "App Templates/ErrorLayout",
  component: ErrorLayout,
  parameters: {
    layout: "fullscreen",
  },
  // tags: ["autodocs"],
  argTypes: {
    ...ErrorImageMeta.argTypes,
    title: {
      description: "标题",
      control: "text",
    },
    subtitle: {
      description: "副标题",
      control: "text",
    },
  },
  args: {
    ...ErrorImageMeta.args,
    title: "title xxx",
    subtitle: "subtitle xxx",
  },
} satisfies Meta<typeof ErrorLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
