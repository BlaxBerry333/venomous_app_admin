import { WorkflowsFormValue } from "~/app/features/workflows/_types";
import type { SelectOptionType } from "~/ui/components";

type FormValueType = WorkflowsFormValue.ScriptNode;

const DEFAULT_FORM_VALUE: FormValueType = {
  description: "",
  language: "",
  code: "",
};

const DEFAULT_LANGUAG_OPTIONS: SelectOptionType[] = [
  { value: "javascript", title: "JavaScript" },
  { value: "python", title: "Python" },
];

export default {
  DEFAULT_FORM_VALUE,
  DEFAULT_LANGUAG_OPTIONS,
};
