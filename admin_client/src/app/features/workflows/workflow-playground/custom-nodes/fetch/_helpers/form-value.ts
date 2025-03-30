import { WorkflowsFormValue } from "~/app/features/workflows/_types";
import type { SelectOptionType } from "~/ui/components";

type FormValueType = WorkflowsFormValue.FetchNode;
type FormValueItemType = FormValueType["items"][0];

const DEFAULT_FORM_VALUE_ITEM: FormValueItemType = {
  method: WorkflowsFormValue.FetchNodeMethod.GET,
  url: "",
};

const DEFAULT_FORM_VALUE: FormValueType = {
  description: "",
  items: [DEFAULT_FORM_VALUE_ITEM],
};

const DEFAULT_METHOD_OPTIONS: SelectOptionType[] = [
  { value: WorkflowsFormValue.FetchNodeMethod.GET, title: "GET" },
  { value: WorkflowsFormValue.FetchNodeMethod.POST, title: "POST" },
  { value: WorkflowsFormValue.FetchNodeMethod.PUT, title: "PUT" },
  { value: WorkflowsFormValue.FetchNodeMethod.DELETE, title: "DELETE" },
];

export default {
  DEFAULT_FORM_VALUE_ITEM,
  DEFAULT_FORM_VALUE,
  DEFAULT_METHOD_OPTIONS,
};
