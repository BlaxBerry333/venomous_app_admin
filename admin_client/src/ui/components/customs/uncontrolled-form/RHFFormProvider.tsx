import { memo, type PropsWithChildren } from "react";

import { DevTool as RHFDevTool } from "@hookform/devtools";
import {
  FormProvider as RHFProvider,
  type FieldValues as RHFFieldValues,
  type UseFormReturn as RHFUseFormReturn,
} from "react-hook-form";

type BaseFormValue = Record<string, unknown>;

type RHFFormProviderProps<T extends RHFFieldValues> = PropsWithChildren<{
  form?: RHFUseFormReturn<T>;
  onSubmit?: () => void;
}>;

function RHFFormProvider<T extends BaseFormValue>({
  children,
  form,
  onSubmit,
}: RHFFormProviderProps<T>) {
  if (!form) {
    return null;
  }

  return (
    <RHFProvider {...form}>
      <RHFDevTool control={form.control} />

      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFProvider>
  );
}

export default memo(RHFFormProvider) as typeof RHFFormProvider;
