import type { CSSProperties, PropsWithChildren } from "react";
import { memo, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { z } from "zod";

import { RHF } from "~/ui/components";

/**
 * 基于现有的数据类型创建 Zod Schema 以避免数据结构不一致
 *
 * @example
 * ```ts
 * type APIParamsType = {
 *   username: string;
 *   password: string;
 * };
 *
 * const formSchemas = createZodSchema<APIParamsType>()(
 *   z.object({
 *     username: z.string().min(4, "Username must be at least 4 characters long"),
 *     password: z.string().min(4, "Password must be at least 4 characters long"),
 *   }),
 * );
 * ```
 */
export function createZodSchema<T>() {
  return <SchemaType extends z.ZodType<T>>(schema: SchemaType) => schema;
}

type RHFFormWithZodProps<S extends ReturnType<typeof z.object>> = PropsWithChildren<{
  zodSchema: S;
  defaultValues: DefaultValues<z.infer<S>>;
  onSubmit: (data: z.infer<S>) => void;
  style?: CSSProperties;
}>;

function RHFFormWithZod<S extends ReturnType<typeof z.object>>({
  children,
  zodSchema,
  defaultValues,
  onSubmit,
  style,
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

  return (
    <RHF.Form<FormValueType> form={formInstance} onSubmit={handleFormSubmit} style={style}>
      {children}
    </RHF.Form>
  );
}

export default memo(RHFFormWithZod) as typeof RHFFormWithZod;
