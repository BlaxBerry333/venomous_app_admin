import type { NamedExoticComponent } from "react";
import { memo, useEffect } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Select, type SelectProps } from "~/ui/components/base";

type RHFSelectProps = SelectProps & {
  name: string;
  defaultValue?: string;
};

const RHFSelect: NamedExoticComponent<RHFSelectProps> = memo(
  ({ name, defaultValue = "", options = [], ...props }) => {
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
          <Select
            fullWidth
            inputRef={field.ref}
            options={options}
            value={field.value || defaultValue}
            onChange={(option) => field.onChange(option?.value)}
            error={!!error}
            helperText={error?.message || " "}
            {...props}
          />
        )}
      />
    );
  },
);

export default RHFSelect;
