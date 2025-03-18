import type { NamedExoticComponent } from "react";
import { memo, useCallback, useState } from "react";

import { isEqual } from "lodash-es";

import { useWorkflowOriginalData } from "~/app/features/workflows/_contexts";
import { useInstance } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { Button, toast } from "~/ui/components";
import { sleep } from "~/utils/custom/process";

const PlaygroundSaveAction: NamedExoticComponent = memo(() => {
  const { isSaveLoading, handleSave } = usePlaygroundSaveAction();

  return (
    <Button isLoading={isSaveLoading} onClick={handleSave}>
      保存
    </Button>
  );
});

export default PlaygroundSaveAction;

// ----------------------------------------------------------------------------------------------------

function usePlaygroundSaveAction() {
  const { getElement } = useInstance();
  const { originalElement } = useWorkflowOriginalData();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = useCallback(async () => {
    const instanceElement = getElement();
    const isNothingChanged: boolean = isEqual(instanceElement, originalElement);
    if (isNothingChanged) {
      toast.info("没有任何变化");
      return;
    }
    console.log(instanceElement);
    setIsLoading(true);
    await sleep(1000);
    setIsLoading(false);

    toast.success("保存成功");
  }, [getElement, originalElement]);

  return {
    isSaveLoading: isLoading,
    handleSave,
  };
}
