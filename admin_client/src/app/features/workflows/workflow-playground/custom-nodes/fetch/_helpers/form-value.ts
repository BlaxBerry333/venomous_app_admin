import { WorkflowsFormValue } from "~/app/features/workflows/_types";

type FormValueType = WorkflowsFormValue.FetchNode;
type FormValueItemType = FormValueType["items"][0];
type ItemMethodOptionType = WorkflowsFormValue.CommonItemType<WorkflowsFormValue.FetchNodeMethod>;

export const DEFAULT_FORM_VALUE_ITEM: FormValueItemType = {
  method: WorkflowsFormValue.FetchNodeMethod.GET,
  url: "",
};

export const DEFAULT_FORM_VALUE: FormValueType = {
  description: "",
  items: [DEFAULT_FORM_VALUE_ITEM],
};

export const DEFAULT_METHOD_OPTIONS: ItemMethodOptionType[] = [
  { value: WorkflowsFormValue.FetchNodeMethod.GET, label: "GET" },
  { value: WorkflowsFormValue.FetchNodeMethod.POST, label: "POST" },
  { value: WorkflowsFormValue.FetchNodeMethod.PUT, label: "PUT" },
  { value: WorkflowsFormValue.FetchNodeMethod.DELETE, label: "DELETE" },
];
