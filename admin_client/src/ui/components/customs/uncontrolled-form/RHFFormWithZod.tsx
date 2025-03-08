import type { CSSProperties, PropsWithChildren } from "react";
import { memo, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { z } from "zod";

import { RHF } from "~/ui/components";

type RHFFormWithZodProps<S extends ReturnType<typeof z.object>> = PropsWithChildren<{
  zodSchema: S;
  defaultValues: DefaultValues<z.infer<S>>;
  onSubmit: (data: z.infer<S>) => void;
  style?: CSSProperties;
}>;

/**
 * @example
 * ```tsx
 * <RHFFormWithZod
 *   zodSchema={z.object({ username: z.string(), email: z.string() })}
 *   defaultValues={{ username: "", email: "" }}
 *   onSubmit={(data) => console.log(data)}
 * >
 *   <RHF.Text name="username" label="Username" />
 *   <RHF.Text name="email" label="Email" />
 *   <RHF.Action isLoading={isLoading} />
 * </>
 */
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
