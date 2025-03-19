import { Workflows } from "../_types";
import { FETCH_NODE_FORM } from "../workflow-playground/custom-nodes/fetch/_helpers";
import { MESSAGE_NODE_FORM } from "../workflow-playground/custom-nodes/message/_helpers";
import { SCRIPT_NODE_FORM } from "../workflow-playground/custom-nodes/script/_helpers";

export function createNodeDefaultFormValue(nodeType: Workflows.NodeType) {
  switch (nodeType) {
    case Workflows.NodeType.fetch:
      return FETCH_NODE_FORM.DEFAULT_FORM_VALUE;

    case Workflows.NodeType.script:
      return SCRIPT_NODE_FORM.DEFAULT_FORM_VALUE;

    case Workflows.NodeType.message:
    default:
      return MESSAGE_NODE_FORM.DEFAULT_FORM_VALUE;
  }
}
