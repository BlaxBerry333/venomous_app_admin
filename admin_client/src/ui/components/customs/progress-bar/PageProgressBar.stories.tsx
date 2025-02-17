import type { Meta, StoryObj } from "@storybook/react";

import { BrowserRouter } from "react-router-dom";

import Typography from "~/ui/components/base/typographies/Typography";
import PageProgressBar from "./PageProgressBar";

const meta = {
  title: "Customs/PageProgressBar",
  component: PageProgressBar,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
        <Typography>刷新页面以查看页面顶部的进度条</Typography>
      </BrowserRouter>
    ),
  ],
  // tags: ["autodocs"],
} satisfies Meta<typeof PageProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
};
