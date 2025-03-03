import type { Meta, StoryObj } from "@storybook/react";

import { useForm } from "react-hook-form";

import { Button } from "~/ui/components/base";
import { RHF } from ".";

const meta = {
  title: "Components/Customs ( 3rd-party ) /UncontrolledForm",
  component: RHF.Form,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  argTypes: {
    form: {
      description: "表单实例对象",
    },
    onSubmit: {
      description: "提交处理函数",
    },
  },
  args: {
    form: undefined,
    onSubmit: undefined,
  },
} satisfies Meta<typeof RHF.Form>;

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
    const onSubmit = (data: FormDataType) => {
      console.log(data);
    };

    return (
      <RHF.Form<FormDataType> form={form} onSubmit={onSubmit}>
        <RHF.Text name="name" label="文本" />
        <RHF.Password name="password" label="密码/文本" />
        <RHF.Number name="age" label="数字" />
        <RHF.Switch name="isActive" startLabel="Yes" endLabel="No" />
        <RHF.Checkbox name="isActive" startLabel="Yes" endLabel="No" />
        <RHF.OneTimeInput name="code" />
        <RHF.Select
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
      </RHF.Form>
    );
  },
};
