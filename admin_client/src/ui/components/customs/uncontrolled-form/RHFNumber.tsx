import type { NamedExoticComponent } from "react";
import { memo, useEffect } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { TextField, type TextFieldProps } from "~/ui/components/base";

type RHFNumberProps = Omit<TextFieldProps, "value" | "onChange"> & {
  name: string;
  min?: number;
  max?: number;
  step?: number | string;
  defaultValue?: number;
};

const RHFNumber: NamedExoticComponent<RHFNumberProps> = memo(
  ({ name, min = 0, max, step = 1, defaultValue = 0, ...props }) => {
    const { control, trigger } = useFormContext();

    useEffect(() => {
      trigger();
    }, [trigger]);

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            type="number"
            inputRef={field.ref}
            value={Math.abs(Number(field.value)).toString()}
            onChange={(value: string) => {
              const v = Math.abs(Number(value)).toString();
              if (v === "NaN") field.onChange(min);
              else field.onChange(Number(v));
            }}
            error={!!error}
            helperText={error?.message || " "}
            slotProps={{
              htmlInput: {
                type: "number",
                min,
                max,
                step,
              },
            }}
            {...props}
          />
        )}
      />
    );
  },
);

export default RHFNumber;
