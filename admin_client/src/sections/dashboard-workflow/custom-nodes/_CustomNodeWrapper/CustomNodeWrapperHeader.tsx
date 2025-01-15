import type { NamedExoticComponent } from "react";
import type { CustomNodeWrapperProps } from "~/common/types/dashboard-workflow";

import { memo } from "react";

import { Icon } from "@iconify/react";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

import useTranslation from "~/common/hooks/useTranslation";
import useWorkflowNodeStyles from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-styles";

const CustomNodeWrapperHeader: NamedExoticComponent<CustomNodeWrapperProps> = memo(
  (nodeWrapperProps) => {
    const { type } = nodeWrapperProps;
    const { nodeGroupColor } = useWorkflowNodeStyles(nodeWrapperProps);

    const { t } = useTranslation();

    // ----------------------------------------------------------------------------------------------------

    return (
      <MuiBox
        sx={{
          width: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
          color: nodeGroupColor,
        }}
      >
        <Icon icon="clarity:block-solid" width={20} style={{ transform: "translateX(-8px)" }} />

        <MuiTypography variant="caption" noWrap sx={{ flex: 1, fontWeight: 600, ml: -0.5 }}>
          {t(`workflow.workflow-playground.custom-nodes.${type}`)}
        </MuiTypography>
      </MuiBox>
    );
  },
);

export default CustomNodeWrapperHeader;
