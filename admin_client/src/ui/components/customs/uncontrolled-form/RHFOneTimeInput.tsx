import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { OneTimeInput, type OneTimeInputProps } from "~/ui/components/base";

type RHFOneTimeProps = OneTimeInputProps & {
  name: string;
  defaultValue?: string;
};

const RHFOneTimeInput: NamedExoticComponent<RHFOneTimeProps> = memo(
  ({ name, defaultValue = "", ...props }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            <OneTimeInput
              value={field.value || defaultValue}
              onChange={(value: string) => field.onChange(value)}
              error={!!error}
              helperText={error?.message || " "}
              {...props}
            />
          </>
        )}
      />
    );
  },
);

export default RHFOneTimeInput;
