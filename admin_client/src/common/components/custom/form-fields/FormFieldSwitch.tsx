import type { FC } from "react";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import MuiFormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch, { type SwitchProps as MuiSwitchProps } from "@mui/material/Switch";
import MuiTypography from "@mui/material/Typography";

type Props = {
  MuiSwitchProps?: Omit<MuiSwitchProps, "label">;
  name: string;
  label?: string;
  defaultValue?: boolean;
  hideHelperText?: boolean;
};

const FormFieldSwitch: FC<Props> = ({ MuiSwitchProps, name, label, defaultValue = "" }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <MuiFormControlLabel
          label={<MuiTypography variant="body2">{label}</MuiTypography>}
          control={
            <MuiSwitch
              checked={Boolean(value)}
              inputRef={ref}
              onChange={onChange}
              onBlur={onBlur}
              {...MuiSwitchProps}
            />
          }
        />
      )}
    />
  );
};

export default memo(FormFieldSwitch);
