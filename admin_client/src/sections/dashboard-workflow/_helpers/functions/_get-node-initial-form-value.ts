import type {
  CustomNodeDataFormValueType,
  CustomNodeType,
} from "~/common/types/dashboard-workflow";
import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";

export function getNodeInitialFormValue(
  nodeId: CustomNodeType["id"],
  nodeType: CustomNodeTypeName,
): CustomNodeDataFormValueType {
  switch (nodeType) {
    case CustomNodeTypeName.message:
      return {
        title: "",
      };
    case CustomNodeTypeName.resizable:
      return {
        title: "",
      };
    case CustomNodeTypeName.condition:
      return {
        title: "",
      };
    case CustomNodeTypeName.code:
      return {
        title: "",
      };

    case CustomNodeTypeName.start:
    case CustomNodeTypeName.blank:
    default:
      return { title: `#${nodeId}` };
  }
}
