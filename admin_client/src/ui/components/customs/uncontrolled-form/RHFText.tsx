import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { TextField, type TextFieldProps } from "~/ui/components/base";

type RHFTextProps = Omit<TextFieldProps, "value" | "onChange"> & {
  name: string;
  defaultValue?: string;
};

const RHFText: NamedExoticComponent<RHFTextProps> = memo(
  ({ name, defaultValue = "", ...props }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            inputRef={field.ref}
            value={field.value || defaultValue}
            onChange={(value: string) => field.onChange(value)}
            error={!!error}
            helperText={error?.message || " "}
            {...props}
          />
        )}
      />
    );
  },
);

export default RHFText;
