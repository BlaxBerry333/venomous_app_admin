import RHFAutocomplete from "./RHFAutocomplete";
import RHFCheckbox from "./RHFCheckbox";
import RHFForm from "./RHFForm";
import RHFFormAction from "./RHFFormAction";
import RHFFormWithZod from "./RHFFormWithZod";
import RHFNumber from "./RHFNumber";
import RHFOneTimeInput from "./RHFOneTimeInput";
import RHFPassword from "./RHFPassword";
import RHFSelect from "./RHFSelect";
import RHFSwitch from "./RHFSwitch";
import RHFText from "./RHFText";

export * from "./_hooks";

export const RHF = {
  // Forms
  Form: RHFForm,
  FormWithZod: RHFFormWithZod,
  Action: RHFFormAction,

  // Fields
  Autocomplete: RHFAutocomplete,
  Checkbox: RHFCheckbox,
  Number: RHFNumber,
  OneTimeInput: RHFOneTimeInput,
  Password: RHFPassword,
  Select: RHFSelect,
  Switch: RHFSwitch,
  Text: RHFText,
};
