import type { NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import MuiCard from "@mui/material/Card";
import MuiStack from "@mui/material/Stack";
import { memo } from "react";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { useWorkflowActionHistoryStoreUndoRedo } from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-action-history-store";

const ActionButtonUndoRedo: NamedExoticComponent = memo(() => {
  const { undo, redo, canUndo, canRedo } = useWorkflowActionHistoryStoreUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiCard sx={{ py: 0.5, px: 0.5 }}>
      <MuiStack spacing={0}>
        <CustomSquareBlock
          variant="text"
          color="inherit"
          disabled={!canUndo}
          onClick={() => undo()}
        >
          <Icon icon="solar:undo-left-round-bold-duotone" width={20} />
        </CustomSquareBlock>

        <CustomSquareBlock
          variant="text"
          color="inherit"
          disabled={!canRedo}
          onClick={() => redo()}
        >
          <Icon icon="solar:undo-right-round-bold-duotone" width={20} />
        </CustomSquareBlock>

        <CustomSquareBlock variant="text" disabled onClick={() => {}}>
          <Icon icon="solar:history-2-bold-duotone" width={20} />
        </CustomSquareBlock>
      </MuiStack>
    </MuiCard>
  );
});

export default ActionButtonUndoRedo;
