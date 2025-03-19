import { WorkflowsFormValue } from "~/app/features/workflows/_types";

type FormValueType = WorkflowsFormValue.ScriptNode;

const DEFAULT_FORM_VALUE: FormValueType = {
  description: "",
  language: "",
  code: "",
};

export default {
  DEFAULT_FORM_VALUE,
};
