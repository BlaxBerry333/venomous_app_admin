import { useCallback, useEffect } from "react";

import { debounce } from "lodash-es";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { useDosomethingWhenCloseProtalElement } from "~/app/features/workflows/workflow-playground/custom-nodes-detail";
import useNodeUpdate from "./use-node-update";

type useNodeFormValueValidationProps<T extends FieldValues> = {
  nodeId: string;
  formInstance: UseFormReturn<T>;
  defaultValues?: T;
};

/**
 * 用于验证 Node 表单值，并自动更新`node.data.isFormInvalid`
 */
export default function useNodeFormValueValidation<T extends FieldValues>({
  nodeId,
  defaultValues,
  formInstance,
}: useNodeFormValueValidationProps<T>) {
  const isInvalid: boolean = !formInstance.formState.isValid;

  const { updateSpecificNodeData } = useNodeUpdate();

  // 手动避免 React Hook Form 表单初始化时的短暂的未验证状态导致的闪烁
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((id: string, invalid: boolean) => {
      updateSpecificNodeData(id, { isFormInvalid: invalid });
    }, 200),
    [updateSpecificNodeData],
  );

  useEffect(() => {
    debouncedUpdate(nodeId, isInvalid);
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate, nodeId, isInvalid]);

  // ----------------------------------------------------------------------------------------------------

  // 监听自定义事件以触发表单值的重置，从而避免组件卸载后`node.data.isFormInvalid`状态的残留
  useDosomethingWhenCloseProtalElement({ func: () => formInstance.reset(defaultValues) });
}
