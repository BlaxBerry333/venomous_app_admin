import type { SelectOptionType } from "~/ui/components";
import { IWorkflowDataType } from "~/utils/libs/apis/types/_workflow";
import type { CreateFormValueType, DetailFormValueType } from "./form-schema";

const DEFAULT_CREATE_FORM_VALUE: CreateFormValueType = {
  type: IWorkflowDataType.Logic,
  name: "",
  description: "",
};

const DEFAULT_DETAIL_FORM_VALUE: DetailFormValueType = {
  type: IWorkflowDataType.Logic,
  name: "",
  description: "",
  isActive: false,
};

const TYPE_SELECT_OPTIONS: SelectOptionType[] = [
  { title: `${IWorkflowDataType.Logic} ( 逻辑图 )`, value: IWorkflowDataType.Logic },
  { title: `${IWorkflowDataType.Draft} ( 草稿图 )`, value: IWorkflowDataType.Draft },
];

export default {
  DEFAULT_DETAIL_FORM_VALUE,
  DEFAULT_CREATE_FORM_VALUE,
  TYPE_SELECT_OPTIONS,
};
