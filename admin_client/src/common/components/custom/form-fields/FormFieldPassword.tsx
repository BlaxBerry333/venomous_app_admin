import type { FC } from "react";
import { memo, useCallback, useState } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Icon } from "@iconify/react";

import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

import MuiIconButton from "@mui/material/IconButton";
import MuiInputAdornment from "@mui/material/InputAdornment";

type Props = {
  MuiTextFieldProps?: Omit<MuiTextFieldProps, "label">;
  name: string;
  label?: MuiTextFieldProps["label"];
  defaultValue?: string;
  hideHelperText?: boolean;
};

const FormFieldPassword: FC<Props> = ({
  MuiTextFieldProps,
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

  // ----------------------------------------------------------------------------------------------------

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    [setShowPassword],
  );

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const handleMouseUpPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <MuiTextField
          value={value}
          inputRef={ref}
          onChange={onChange}
          onBlur={onBlur}
          label={label || name}
          error={!!fieldError}
          helperText={fieldErrorText}
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <MuiInputAdornment position="end">
                  <MuiIconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    color="primary"
                  >
                    <Icon
                      icon={
                        showPassword ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"
                      }
                    />
                  </MuiIconButton>
                </MuiInputAdornment>
              ),
            },
          }}
          {...MuiTextFieldProps}
        />
      )}
    />
  );
};

export default memo(FormFieldPassword);
