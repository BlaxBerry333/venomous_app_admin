import type { CustomNodeType } from "~/common/types/dashboard-workflow";
import { getNodeInitialFormValue } from "./_get-node-initial-form-value";

export function createNewNode({
  id: newNodeId,
  position: newNodePosition,
  type,
}: Required<Pick<CustomNodeType, "id" | "position" | "type">>): CustomNodeType {
  const newNode: CustomNodeType = {
    id: newNodeId,
    position: newNodePosition,
    type,
    data: {
      form: {
        isValid: false,
        value: getNodeInitialFormValue(newNodeId, type),
      },
    },
  };

  return newNode;
}
