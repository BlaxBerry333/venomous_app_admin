import type { Meta, StoryObj } from "@storybook/react";

import { SUPPORTED_FILE_EXTENSIONS } from "~/utils/custom/file";
import FiletypeImage from "./FiletypeImage";

const meta = {
  title: "Components/Design ( svg、assets ) /FiletypeImage",
  component: FiletypeImage,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    extension: {
      description: "文件类型",
      control: "select",
      options: [...SUPPORTED_FILE_EXTENSIONS],
    },
    width: {
      description: "宽度",
      control: "number",
    },
    height: {
      description: "高度",
      control: "number",
    },
  },
  args: {
    extension: ".pdf",
    width: 40,
    height: 40,
  },
} satisfies Meta<typeof FiletypeImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
