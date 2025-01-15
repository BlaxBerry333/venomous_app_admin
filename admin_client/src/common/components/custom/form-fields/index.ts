import FormFieldPassword from "./FormFieldPassword";
import FormFieldSwitch from "./FormFieldSwitch";
import CustomFormFieldText from "./FormFieldText";
import CustomFormFieldTextarea from "./FormFieldTextarea";

export { default as CustomForm } from "./Form";

export const CustomFormField = {
  Text: CustomFormFieldText,
  Textarea: CustomFormFieldTextarea,
  Password: FormFieldPassword,
  Switch: FormFieldSwitch,
};
