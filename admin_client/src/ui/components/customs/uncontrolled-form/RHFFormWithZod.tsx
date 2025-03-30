import type { CSSProperties, PropsWithChildren } from "react";
import { memo, useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { RHF } from "~/ui/components";

type RHFFormWithZodProps<S extends ReturnType<typeof z.object>> = PropsWithChildren<{
  zodSchema: S;
  defaultValues: DefaultValues<z.infer<S>>;
  onSubmit: (data: z.infer<S>) => void;
  style?: CSSProperties;
  hideDevTool?: boolean;
  instance?: UseFormReturn<z.TypeOf<S>>;
}>;

/**
 * @example
 * ```tsx
 * const zodSchema = z.object({ xxxx: z.string() })
 * const defaultValues = { xxxx: "" }
 * type FormValueType = z.infer<typeof zodSchema>
 * const onSubmit = (data: FormValueType) => console.log(data)
 * 
 * // 写法一: 组件内部定义formInstance，灵活性较低
 * <RHFFormWithZod
 *   zodSchema={zodSchema}
 *   defaultValues={defaultValues}
 *   onSubmit={onSubmit}
 * >
 *   <RHF.Text name="xxxx" label="xxxx" />
 *   <RHF.Action isLoading={isLoading} />
 * </RHFFormWithZod>
 * 
 * // 写法二: 在外部定义formInstance，灵活性更高
 * const formInstance = useForm<FormValueType>({
    resolver: zodResolver(formSchemas),
    defaultValues,
    mode: "all",
  });
 * <RHFFormWithZod
 *   instance={formInstance}
 *   zodSchema={zodSchema}
 *   defaultValues={defaultValues}
 *   onSubmit={onSubmit}
 * >
 *   <RHF.Text name="xxxx" label="xxxx" />
 *   <RHF.Action isLoading={isLoading} />
 * </RHFFormWithZod>
 */
function RHFFormWithZod<S extends ReturnType<typeof z.object>>({
  children,
  zodSchema,
  defaultValues,
  onSubmit,
  style,
  hideDevTool,
  instance,
}: RHFFormWithZodProps<S>) {
  type FormValueType = z.infer<S>;

  const formInstance = useForm<FormValueType>({
    resolver: zodResolver(zodSchema),
    defaultValues,
    mode: "all",
  });

  const handleFormSubmit = useCallback(
    (data: FormValueType) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  useEffect(() => {
    formInstance.trigger(); // 在初次渲染时自动触发验证
  }, [formInstance]);

  return (
    <RHF.Form<FormValueType>
      form={instance || formInstance}
      onSubmit={handleFormSubmit}
      style={style}
      hideDevTool={hideDevTool}
    >
      {children}
    </RHF.Form>
  );
}

export default memo(RHFFormWithZod) as typeof RHFFormWithZod;
