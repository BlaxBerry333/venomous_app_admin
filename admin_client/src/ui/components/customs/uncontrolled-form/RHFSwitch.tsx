import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Switch, type SwitchProps } from "~/ui/components/base";

type RHFSwitchProps = Omit<SwitchProps, "value" | "onChange"> & {
  name: string;
  defaultValue?: boolean;
};

const RHFSwitch: NamedExoticComponent<RHFSwitchProps> = memo(
  ({ name, defaultValue = false, ...props }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <Switch
              inputRef={field.ref}
              checked={Boolean(field.value) || defaultValue}
              onChange={(checked: boolean) => field.onChange(checked)}
              {...props}
            />
          </>
        )}
      />
    );
  },
);

export default RHFSwitch;
