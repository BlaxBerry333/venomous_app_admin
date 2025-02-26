import type { NamedExoticComponent } from "react";
import { memo, startTransition, useCallback, useEffect, useState } from "react";

import MuiSwitch, { type SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

const Switch: NamedExoticComponent<MuiSwitchProps> = memo(({ sx, checked, onChange, ...props }) => {
  const [_checked, setChecked] = useState(true);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked: boolean = e.target.checked;
      startTransition(() => {
        setChecked(isChecked);
        onChange?.(e, isChecked);
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

  return (
    <MuiSwitch
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
  );
});

export default Switch;
