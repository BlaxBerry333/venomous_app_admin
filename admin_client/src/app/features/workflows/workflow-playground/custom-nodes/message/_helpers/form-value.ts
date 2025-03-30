import { WorkflowsFormValue } from "~/app/features/workflows/_types";

type FormValueType = WorkflowsFormValue.MessageNode;

const DEFAULT_FORM_VALUE: FormValueType = {
  message: "",
  description: "",
};

export default {
  DEFAULT_FORM_VALUE,
};
