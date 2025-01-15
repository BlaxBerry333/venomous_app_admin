import type { FC } from "react";
import { memo } from "react";

import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  MuiTextFieldProps?: Omit<MuiTextFieldProps, "label" | "rows">;
  rows?: MuiTextFieldProps["rows"];
  name: string;
  label?: MuiTextFieldProps["label"];
  defaultValue?: string;
  hideHelperText?: boolean;
};

const FormFieldTextarea: FC<Props> = ({
  MuiTextFieldProps,
  rows = 4,
  name,
  label,
  defaultValue = "",
  hideHelperText = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  const fieldErrorText = hideHelperText
    ? undefined
    : fieldError
      ? fieldError.message?.toString()
      : " ";

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <MuiTextField
          multiline
          rows={rows}
          value={value}
          inputRef={ref}
          onChange={onChange}
          onBlur={onBlur}
          label={label || name}
          error={!!fieldError}
          helperText={fieldErrorText}
          slotProps={{ input: { sx: { pr: 0, pb: 0 } } }}
          {...MuiTextFieldProps}
        />
      )}
    />
  );
};

export default memo(FormFieldTextarea);
