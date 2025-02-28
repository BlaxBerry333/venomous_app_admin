import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { sleep } from "~/utils/process";
import Modal from "./Modal";

const meta = {
  title: "Components/Base ( MUI ) /Modal",
  component: Modal,
  parameters: { layout: "centered" },
  // tags: ["autodocs"],
  argTypes: {
    renderModalTrigger: {
      description: "渲染弹窗触发器",
    },
    escapeKeyDown: {
      description: "是否会自动关闭 ( Esc 按键、点击内容后 )",
      control: "boolean",
    },
    isConfirmLoading: {
      description: "确认按钮是否加载中",
      control: "boolean",
    },
    handleOnCancel: {
      description: "取消回调",
    },
    handleOnConfirm: {
      description: "确认回调",
    },
    cancelText: {
      description: "取消按钮文本",
      control: "text",
    },
    confirmText: {
      description: "确认按钮文本",
      control: "text",
    },
    title: {
      description: "标题",
      control: "text",
    },
    message: {
      description: "消息",
      control: "text",
    },
  },
  args: {
    handleOnCancel: () => console.log("Canceled"),
    handleOnConfirm: async () => console.log("Confirmed"),
    escapeKeyDown: true,
    isConfirmLoading: false,
    cancelText: "取消",
    confirmText: "确认",
    title: "标题",
    message: "消息",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = React.useState(false);
    const handleOnConfirm = async (callback: VoidFunction) => {
      setIsLoading(true);
      await sleep(1000);
      callback();
      args.handleOnConfirm?.();
      setIsLoading(false);
    };

    return (
      <>
        <Modal
          {...args}
          isConfirmLoading={isLoading}
          handleOnConfirm={async (callback) => handleOnConfirm(callback)}
          renderModalTrigger={(params) => <button onClick={params.handleOpen}>默认弹窗</button>}
        />

        <Modal
          {...args}
          isConfirmLoading={isLoading}
          renderModalTrigger={(params) => <button onClick={params.handleOpen}>自定义弹窗</button>}
          renderModalContent={(params) => (
            <div
              style={{
                backgroundColor: "pink",
                height: "100px",
                width: "100%",
                cursor: isLoading ? "wait" : "pointer",
              }}
              onClick={async () => handleOnConfirm(params.handleClose)}
            >
              Click Me to Close
              <p>{isLoading ? "confirming..." : ""}</p>
            </div>
          )}
        />
      </>
    );
  },
};
