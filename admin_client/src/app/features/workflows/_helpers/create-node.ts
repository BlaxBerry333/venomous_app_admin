import type { Workflows } from "../_types";
import { createNodeDefaultFormValue } from "./create-node-default-form-value";

export function createNode({
  id,
  type,
  position,
}: Required<Pick<Workflows.Node, "id" | "type" | "position">>): Workflows.Node {
  return {
    id,
    type,
    position,
    selected: true,
    data: {
      isBlocked: false,
      isFormInvalid: true,
      formValue: createNodeDefaultFormValue(type),
    },
  };
}
