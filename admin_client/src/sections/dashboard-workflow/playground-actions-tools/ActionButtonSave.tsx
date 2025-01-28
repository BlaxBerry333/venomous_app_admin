import type { NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import { lazy, memo, Suspense, useCallback, useMemo } from "react";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import useBoolean from "~/common/hooks/useBoolean";
import useRouteSearchParams from "~/common/hooks/useRouteSearchParams";
import useTranslation from "~/common/hooks/useTranslation";
import type { CustomNodeType } from "~/common/types/dashboard-workflow";
import useWorkflowInstance from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-instance";
import { useUpdateWorkflowPlayground } from "~/services/apis-hooks/workflow";
import { checkIsStartNode, transformWorkflowData } from "../_helpers/functions";

const CustomConfirmDialog = lazy(
  () => import("~/common/components/custom/dialogs/CustomConfirmDialog"),
);

const ActionButtonSave: NamedExoticComponent = memo(() => {
  const { t } = useTranslation();

  const { getElements } = useWorkflowInstance();

  const elements = getElements();

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

  // ----------------------------------------------------------------------------------------------------

  const { workflowId } = useRouteSearchParams<{ workflowId: string }>();

  const { mutateAsync } = useUpdateWorkflowPlayground(workflowId);

  const handleConfirmSave = useCallback(async () => {
    try {
      const formattedElements = transformWorkflowData(elements);
      // console.log({ elements, formattedElements });
      await mutateAsync(formattedElements);
    } catch (error) {
      console.error(error);
    } finally {
      confirmDialog.setFalse();
    }
  }, [elements, confirmDialog, mutateAsync]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <CustomSquareBlock
        color="primary"
        size="medium"
        disabled={isDisableSave}
        onClick={confirmDialog.setTrue}
      >
        <Icon icon="fa-solid:save" width={16} />
      </CustomSquareBlock>

      <Suspense>
        <CustomConfirmDialog
          isOpen={confirmDialog.value}
          onClose={confirmDialog.setFalse}
          onConfirm={handleConfirmSave}
          disabledConfirm={isDisableSave}
          title={t("common.tooltips.confirm-update")}
          content={<>Node: {elements.nodes.length}</>}
        />
      </Suspense>
    </>
  );
});

export default ActionButtonSave;
