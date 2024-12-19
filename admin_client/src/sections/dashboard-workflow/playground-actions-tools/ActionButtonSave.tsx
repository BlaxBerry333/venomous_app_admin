import type { NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import { memo, useCallback, useMemo } from "react";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { CustomConfirmDialog } from "~/common/components/custom/dialogs";
import useBoolean from "~/common/hooks/useBoolean";
import type { CustomNodeType } from "~/common/types/dashboard-workflow";
import useWorkflowInstance from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-instance";
import { checkIsStartNode } from "../_helpers/functions";

const ActionButtonSave: NamedExoticComponent = memo(() => {
  const { getElements } = useWorkflowInstance();

  const elements = getElements();

  // ----------------------------------------------------------------------------------------------------

  const invalidNodes = useMemo<Array<CustomNodeType>>(
    () => elements.nodes.filter((node) => !checkIsStartNode(node) && !node.data.form?.isValid),
    [elements.nodes],
  );

  // ----------------------------------------------------------------------------------------------------

  const confirmDialog = useBoolean(false);

  const isDisableSave = useMemo<boolean>(
    () => elements.nodes.length === 0 || invalidNodes.length > 0,
    [elements.nodes, invalidNodes],
  );

  const handleConfirmSave = useCallback(async () => {
    console.log(elements);
    confirmDialog.setFalse();
  }, [elements, confirmDialog]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <CustomSquareBlock
        color="primary"
        style={{ height: 40, width: 40 }}
        onClick={confirmDialog.setTrue}
      >
        <Icon icon="fa-solid:save" width={20} />
      </CustomSquareBlock>

      <CustomConfirmDialog
        isOpen={confirmDialog.value}
        onClose={confirmDialog.setFalse}
        onOpen={handleConfirmSave}
        disabledConfirm={isDisableSave}
        title={"Are you sure to update flow ?"}
        content={<>Node: {elements.nodes.length}</>}
      />
    </>
  );
});

export default ActionButtonSave;
