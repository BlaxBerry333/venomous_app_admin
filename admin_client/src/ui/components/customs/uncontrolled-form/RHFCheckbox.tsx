import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Checkbox, type CheckboxProps } from "~/ui/components/base";

type RHFCheckboxProps = Omit<CheckboxProps, "value" | "onChange"> & {
  name: string;
  defaultValue?: boolean;
};

const RHFCheckbox: NamedExoticComponent<RHFCheckboxProps> = memo(
  ({ name, defaultValue = false, ...props }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Checkbox
            inputRef={field.ref}
            checked={Boolean(field.value) || defaultValue}
            onChange={(checked: boolean) => field.onChange(checked)}
            {...props}
          />
        )}
      />
    );
  },
);

export default RHFCheckbox;
