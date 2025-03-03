import type { CSSProperties, PropsWithChildren } from "react";
import { memo } from "react";

import { DevTool as RHFDevTool } from "@hookform/devtools";
import {
  FormProvider as RHFProvider,
  type FieldValues as RHFFieldValues,
  type UseFormReturn as RHFUseFormReturn,
} from "react-hook-form";

type BaseFormValue = Record<string, unknown>;

type RHFFormProps<T extends RHFFieldValues> = PropsWithChildren<{
  form: undefined | RHFUseFormReturn<T>;
  onSubmit: undefined | ((data: T) => void);
  style?: CSSProperties;
}>;

function RHFForm<T extends BaseFormValue>({ children, form, onSubmit, style }: RHFFormProps<T>) {
  if (!form) {
    return null;
  }

  return (
    <RHFProvider {...form}>
      {/* Devtools */}
      {process.env.NODE_ENV !== "production" && (
        <RHFDevTool control={form.control} placement="bottom-right" />
      )}

      <form
        autoComplete="off"
        onSubmit={form?.handleSubmit((data) => onSubmit?.(data))}
        style={style}
      >
        {children}
      </form>
    </RHFProvider>
  );
}

export default memo(RHFForm) as typeof RHFForm;
