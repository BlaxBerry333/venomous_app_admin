import type { NamedExoticComponent } from "react";
import { memo, useEffect } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Select, type SelectProps } from "~/ui/components/base";

type RHFTextProps = SelectProps & {
  name: string;
  defaultValue?: string;
};

const RHFSelect: NamedExoticComponent<RHFTextProps> = memo(
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
            options={options}
            fullWidth
            inputRef={field.ref}
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
