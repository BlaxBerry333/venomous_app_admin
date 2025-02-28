import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Password, type PasswordProps } from "~/ui/components/base";

type RHFPasswordProps = Omit<PasswordProps, "value" | "onChange"> & {
  name: string;
  defaultValue?: string;
};

const RHFPassword: NamedExoticComponent<RHFPasswordProps> = memo(
  ({ name, defaultValue = "", ...props }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <Password
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

export default RHFPassword;
