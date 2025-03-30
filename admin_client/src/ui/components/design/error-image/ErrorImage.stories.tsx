import type { Meta, StoryObj } from "@storybook/react";

import ErrorImage, { ErrorCode } from "./ErrorImage";

const meta = {
  title: "Components/Design ( svg、assets ) /ErrorImage",
  component: ErrorImage,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    errorCode: {
      description: "错误码",
      control: "radio",
      options: [ErrorCode.NOT_FOUND, ErrorCode.FORBIDDEN, ErrorCode.SERVER_ERROR],
    },
  },
  args: {
    errorCode: ErrorCode.NOT_FOUND,
  },
} satisfies Meta<typeof ErrorImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
