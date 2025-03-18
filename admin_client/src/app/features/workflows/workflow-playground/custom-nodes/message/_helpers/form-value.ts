import { WorkflowsFormValue } from "~/app/features/workflows/_types";

type FormValueType = WorkflowsFormValue.MessageNode;

export const DEFAULT_FORM_VALUE: FormValueType = {
  message: "",
  description: "",
};
