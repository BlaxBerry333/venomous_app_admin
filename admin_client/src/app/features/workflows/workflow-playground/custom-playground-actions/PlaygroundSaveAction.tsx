import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { isEqual } from "lodash-es";

import { useWorkflowOriginalData } from "~/app/features/workflows/_contexts";
import { useInstance } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { Button, toast } from "~/ui/components";
import { useAPIWorkflowPlaygroundUpdate } from "~/utils/libs/apis/_hooks/workflows";

const PlaygroundSaveAction: NamedExoticComponent = memo(() => {
  const { update, isUpdating } = usePlaygroundSaveAction();

  return (
    <Button isLoading={isUpdating} onClick={update}>
      保存
    </Button>
  );
});

export default PlaygroundSaveAction;

// ----------------------------------------------------------------------------------------------------

function usePlaygroundSaveAction() {
  const { getElement } = useInstance();
  const { originalElement } = useWorkflowOriginalData();
  const { mutateAsync: updateAsync, isPending: isUpdating } = useAPIWorkflowPlaygroundUpdate();

  const update = useCallback(async () => {
    const instanceElement = getElement();
    const isNothingChanged: boolean = isEqual(instanceElement, originalElement);
    const firstInvalidNode = instanceElement.nodes.find((n) => n.data.isFormInvalid);

    if (isNothingChanged) {
      toast.info("没有任何变化");
      return;
    }
    if (firstInvalidNode) {
      toast.error(`Node #${firstInvalidNode?.id} 的内容验证失败`);
      return;
    }
    console.log(instanceElement);
    updateAsync(instanceElement)
      .then(() => toast.success("保存成功"))
      .catch(() => toast.error("保存失败"));
  }, [getElement, originalElement, updateAsync]);

  return {
    update,
    isUpdating,
  };
}
