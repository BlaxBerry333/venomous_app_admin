import type { NamedExoticComponent } from "react";
import { memo, startTransition, useCallback, useEffect, useState } from "react";

import MuiSwitch, { type SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

import LabelWrapper, { type LabelWrapperProps } from "./LabelWrapper";

export type SwitchProps = Omit<MuiSwitchProps, "onChange"> &
  LabelWrapperProps & {
    onChange?: (checked: boolean) => void;
  };

const Switch: NamedExoticComponent<SwitchProps> = memo(
  ({ wrapperDirection = "row", startLabel, endLabel, sx, checked, onChange, ...props }) => {
    const [_checked, setChecked] = useState(true);
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        startTransition(() => {
          setChecked(isChecked);
          onChange?.(isChecked);
        });
      },
      [onChange],
    );

    useEffect(() => {
      if (checked !== undefined) {
        startTransition(() => {
          setChecked(checked);
        });
      }
      return () => {
        startTransition(() => {
          setChecked(false);
        });
      };
    }, [checked]);

    // ----------------------------------------------------------------------------------------------------

    const renderSwitchElement = useCallback(
      (id?: string): JSX.Element => (
        <MuiSwitch
          id={id}
          color="primary"
          checked={_checked}
          onChange={handleChange}
          sx={{
            "& .MuiSwitch-track": {
              transition: "background-color 0s",
            },
            ...sx,
          }}
          {...props}
        />
      ),
      [_checked, handleChange, props, sx],
    );

    if (startLabel || endLabel) {
      return (
        <LabelWrapper
          wrapperDirection={wrapperDirection}
          startLabel={startLabel}
          endLabel={endLabel}
          renderElement={(id) => renderSwitchElement(id)}
        />
      );
    }

    return renderSwitchElement();
  },
);

export default Switch;
