import type { CreateFormValueType, DetailFormValueType } from "./form-schema";

const DEFAULT_CREATE_FORM_VALUE: CreateFormValueType = {
  name: "",
  description: "",
};

const DEFAULT_DETAIL_FORM_VALUE: DetailFormValueType = {
  name: "",
  description: "",
  is_active: false,
};

export default {
  DEFAULT_DETAIL_FORM_VALUE,
  DEFAULT_CREATE_FORM_VALUE,
};
