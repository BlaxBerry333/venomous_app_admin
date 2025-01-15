import type { PropsWithChildren } from "react";
import { memo } from "react";

import { DevTool } from "@hookform/devtools";
import MuiBox from "@mui/material/Box";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";

import { ADMIN_CLIENT_CONFIGS } from "~/configs";

type Props<T extends FieldValues> = {
  /** react-hook-form 的表单实例对象 */
  form: UseFormReturn<T>;
  /** 表单提交的处理函数 */
  onSubmit: (data: T) => void | Promise<void>;
  /** 显示开发工具 */
  showDevTool?: boolean;
};

const CustomForm = <T extends FieldValues>({
  children,
  form,
  onSubmit,
  showDevTool = true,
}: PropsWithChildren<Props<T>>) => {
  return (
    <FormProvider {...form}>
      <MuiBox component="form" onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </MuiBox>

      {ADMIN_CLIENT_CONFIGS.info.envName === "development" && showDevTool && (
        <DevTool control={form.control} />
      )}
    </FormProvider>
  );
};

export default memo(CustomForm) as typeof CustomForm;
