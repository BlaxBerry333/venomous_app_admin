import { Workflows } from "~/app/features/workflows/_types";
import { FETCH_NODE_FORM } from "../custom-nodes/fetch/_helpers";
import { MESSAGE_NODE_FORM } from "../custom-nodes/message/_helpers";
import { SCRIPT_NODE_FORM } from "../custom-nodes/script/_helpers";

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
