import type { NamedExoticComponent, PropsWithChildren } from "react";
import type {
  CustomNodeDataFormValueType,
  CustomNodeWrapperProps,
} from "~/common/types/dashboard-workflow";

import { memo, useCallback } from "react";
import { createPortal } from "react-dom";

import { Icon } from "@iconify/react";
import MuiBox from "@mui/material/Box";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";

import useWorkflowNodeDataUpdate from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-data-update";
import useWorkflowNodeStyles from "~/sections/dashboard-workflow/_hooks/_core/use-workflow-node-styles";
import { useWorkflowWidgetStatusContext } from "~/sections/dashboard-workflow/_hooks/use-workflow-custom-context";
import { WORKFLOW_NODE_FORM_INFORMATION_ID } from "~/sections/dashboard-workflow/playground-modals/WorkflowNodeFormInformation";

const CustomNodeWrapperFormWidgetContent: NamedExoticComponent<
  PropsWithChildren<CustomNodeWrapperProps>
> = memo((nodeWrapperProps) => {
  const { specificNodeFormWidget } = useWorkflowWidgetStatusContext();

  if (specificNodeFormWidget.specificNodeId !== nodeWrapperProps.id) {
    return null;
  }

  return (
    <>
      {createPortal(
        (<FormContent {...nodeWrapperProps} />) as JSX.Element,
        document.getElementById(WORKFLOW_NODE_FORM_INFORMATION_ID)!,
        nodeWrapperProps.id,
      )}
    </>
  );
});

const FormContent: NamedExoticComponent<CustomNodeWrapperProps> = memo((nodeWrapperProps) => {
  const { id, renderNodeFormComponent } = nodeWrapperProps;

  const { nodeGroupColor } = useWorkflowNodeStyles(nodeWrapperProps);

  const { updateSpecificNodeFormValue } = useWorkflowNodeDataUpdate();

  const { specificNodeFormWidget } = useWorkflowWidgetStatusContext();

  const updateNodeFormValue = useCallback(
    async (formValue: CustomNodeDataFormValueType) => {
      updateSpecificNodeFormValue(id, formValue as Required<CustomNodeDataFormValueType>);
      await new Promise((resolve) => setTimeout(resolve, 250));
      specificNodeFormWidget.clearSpecificNodeId();
    },
    [id, updateSpecificNodeFormValue, specificNodeFormWidget],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiBox sx={{ display: "flex", flexDirection: "column" }}>
      <MuiTypography
        variant="caption"
        noWrap
        sx={{ fontWeight: 600, color: nodeGroupColor, px: 1.5 }}
      >
        <Icon icon="clarity:block-solid" width={24} style={{ marginRight: 4, marginBottom: -5 }} />
        {`#${id}`}
      </MuiTypography>
      <MuiDivider />
      <MuiBox
        sx={{
          typography: "body2",
          height: 600,
          px: 1.5,
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {/* 渲染节点表单内容 */}
        {renderNodeFormComponent &&
          typeof renderNodeFormComponent === "function" &&
          renderNodeFormComponent({
            handleFormSubmit: updateNodeFormValue,
            handleFormCancel: specificNodeFormWidget.clearSpecificNodeId,
          })}

        {/* 当前节点没有表单内容可供渲染时 */}
        {!renderNodeFormComponent && (
          <MuiBox
            sx={{
              height: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon icon="tabler:mood-empty" width={40} />
            <MuiTypography variant="subtitle1" sx={{ mt: 1 }}>
              {"This node has no form data."}
            </MuiTypography>
          </MuiBox>
        )}
      </MuiBox>
    </MuiBox>
  );
});

export default CustomNodeWrapperFormWidgetContent;
