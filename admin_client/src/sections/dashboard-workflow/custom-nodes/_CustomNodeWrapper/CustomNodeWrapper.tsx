import type { NamedExoticComponent } from "react";
import type { CustomNodeWrapperProps } from "~/common/types/dashboard-workflow";

import { memo, useCallback } from "react";

import MuiCard from "@mui/material/Card";
import MuiPaper from "@mui/material/Paper";
import MuiTypography from "@mui/material/Typography";

import useWorkflowNodeStyles from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-styles";
import { useWorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";
import CustomNodeWrapperConnectionHandlers from "./CustomNodeWrapperConnectionHandlers";
import CustomNodeWrapperFormWidgetContent from "./CustomNodeWrapperFormWidgetContent";
import CustomNodeWrapperHeader from "./CustomNodeWrapperHeader";

const CustomNodeWrapper: NamedExoticComponent<CustomNodeWrapperProps> = memo((nodeWrapperProps) => {
  const { children, data, id } = nodeWrapperProps;

  // ----------------------------------------------------------------------------------------------------

  const { commonNodeWrapperStyles, multipleNodeHandlerWrapperStyles } =
    useWorkflowNodeStyles(nodeWrapperProps);

  const { specificNodeFormWidget } = useWorkflowWidgetStatusContext();

  const handleShowNodeFormOnWidget = useCallback((): void => {
    specificNodeFormWidget.setSpecificNodeId(id);
  }, [specificNodeFormWidget, id]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <MuiCard component="div" sx={commonNodeWrapperStyles} onClick={handleShowNodeFormOnWidget}>
        <CustomNodeWrapperHeader {...nodeWrapperProps} />

        <MuiTypography component="div" variant="subtitle2" noWrap>
          {data.form?.value?.title || `#${id}`}
        </MuiTypography>

        {children}

        <CustomNodeWrapperFormWidgetContent {...nodeWrapperProps} />

        <CustomNodeWrapperConnectionHandlers.Source {...nodeWrapperProps} />
        <CustomNodeWrapperConnectionHandlers.Target {...nodeWrapperProps} />
      </MuiCard>

      <MuiPaper sx={multipleNodeHandlerWrapperStyles} onClick={handleShowNodeFormOnWidget}>
        <CustomNodeWrapperConnectionHandlers.MultipleSource {...nodeWrapperProps} />
      </MuiPaper>
    </>
  );
});

export default CustomNodeWrapper;
