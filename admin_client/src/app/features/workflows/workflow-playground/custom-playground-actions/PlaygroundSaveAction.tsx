import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { isEqual } from "lodash-es";

import { useWorkflowOriginalData } from "~/app/features/workflows/workflow-playground/_contexts";
import { useInstance } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { Button, toast } from "~/ui/components";
import { useAPIWorkflowPlaygroundUpdate } from "~/utils/libs/apis/_hooks/workflows";
import { transformElementFromFrontendToBackend } from "../_helpers";

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

    const formattedElement = transformElementFromFrontendToBackend(instanceElement);
    console.log({ originalElement, instanceElement, formattedElement });

    updateAsync(formattedElement)
      .then(() => toast.success("保存成功"))
      .catch((error) => {
        let message: string = "保存失败";
        const responseData = error.response.data;
        if ("element" in responseData) {
          const firstValidationError = responseData.element[0];
          if (firstValidationError) {
            message += `, ${firstValidationError}`;
          }
        }
        toast.error(message);
      });
  }, [getElement, originalElement, updateAsync]);

  return {
    update,
    isUpdating,
  };
}
