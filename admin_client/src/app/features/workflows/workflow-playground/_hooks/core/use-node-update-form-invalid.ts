import { useCallback, useEffect } from "react";

import { debounce } from "lodash-es";
import useNodeUpdate from "./use-node-update";

export default function useNodeUpdateFormInvalid(nodeId: string, isInvalid: boolean = false) {
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
}
