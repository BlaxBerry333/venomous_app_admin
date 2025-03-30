import type { NamedExoticComponent } from "react";
import { memo, useEffect } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Autocomplete, type AutocompleteProps } from "~/ui/components/base";

type RHFAutocompleteProps = AutocompleteProps & {
  name: string;
  defaultValue?: string;
};

const RHFAutocomplete: NamedExoticComponent<RHFAutocompleteProps> = memo(
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
          <Autocomplete
            options={options}
            fullWidth
            inputRef={field.ref}
            value={field.value || defaultValue}
            onChange={(option) => field.onChange(option?.value)}
            handleOnClear={() => field.onChange("")}
            error={!!error}
            helperText={error?.message || " "}
            {...props}
          />
        )}
      />
    );
  },
);

export default RHFAutocomplete;
