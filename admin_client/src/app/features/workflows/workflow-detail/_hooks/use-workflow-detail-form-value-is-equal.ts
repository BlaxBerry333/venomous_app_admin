import { useMemo } from "react";
import { useWatch, type FieldValues, type UseFormReturn } from "react-hook-form";

import { isEqual } from "lodash-es";

type useNodeFormValueIsEqualProps<T extends FieldValues> = {
  defaultValues?: T;
  formInstance: UseFormReturn<T>;
};

/**
 * 检查 Workflow 详情表单值是否与初始值相等
 */
export default function useWorkflowDetailFormValueIsEqual<T extends FieldValues>({
  defaultValues,
  formInstance,
}: useNodeFormValueIsEqualProps<T>) {
  const currentValues = useWatch({ control: formInstance.control });

  const isNothingChanged = useMemo<boolean>(
    () => isEqual(defaultValues, currentValues),
    [defaultValues, currentValues],
  );

  return {
    isNothingChanged,
  };
}
