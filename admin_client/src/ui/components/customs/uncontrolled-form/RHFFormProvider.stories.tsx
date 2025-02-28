import type { Meta, StoryObj } from "@storybook/react";

import { useForm } from "react-hook-form";

import { Button } from "~/ui/components/base";
import { Form } from ".";

const meta = {
  title: "Components/Customs ( 3rd-party ) /UncontrolledForm",
  component: Form.Provider,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof Form.Provider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSample: Story = {
  name: "默认样例",

  render: () => {
    type FormDataType = {
      name: string;
      password: string;
      country: string;
      age: number;
      code: string;
      isActive: boolean;
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<FormDataType>();
    const { handleSubmit } = form;
    const onSubmit = handleSubmit((data) => {
      console.log(data);
    });

    return (
      <Form.Provider<FormDataType> form={form} onSubmit={onSubmit}>
        <Form.Text name="name" label="文本" />
        <Form.Password name="password" label="密码/文本" />
        <Form.Number name="age" label="数字" />
        <Form.Switch name="isActive" startLabel="Yes" endLabel="No" />
        <Form.Checkbox name="isActive" startLabel="Yes" endLabel="No" />
        <Form.OneTimeInput name="code" />
        <Form.Select
          name="country"
          label="选项"
          options={[
            { title: "中国", value: "CN" },
            { title: "美国", value: "US" },
            { title: "日本", value: "JP" },
            { title: "法国", value: "FR" },
            { title: "意大利", value: "IT" },
            { title: "英国", value: "GB" },
            { title: "德国", value: "DE" },
          ]}
        />
        <Button type="submit">提交</Button>
      </Form.Provider>
    );
  },
};
