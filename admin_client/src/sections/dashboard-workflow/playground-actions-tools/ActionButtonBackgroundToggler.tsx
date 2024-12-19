import { type NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import { memo } from "react";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { useWorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";

const ActionButtonBackgroundToggler: NamedExoticComponent = memo(() => {
  const { canvasBackground } = useWorkflowWidgetStatusContext();

  const isGridLayout: boolean = canvasBackground.isGridLayout;

  return (
    <CustomSquareBlock
      style={{ height: 40, width: 40 }}
      onClick={canvasBackground.toggleIsGridLayout}
    >
      <Icon
        icon={isGridLayout ? "material-symbols-light:grid-off" : "material-symbols-light:grid-on"}
        width={20}
      />
    </CustomSquareBlock>
  );
});

export default ActionButtonBackgroundToggler;
