import type { NamedExoticComponent } from "react";
import { memo, startTransition, useCallback, useEffect, useState } from "react";

import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import MuiSvgIcon from "@mui/material/SvgIcon";

import LabelWrapper, { type LabelWrapperProps } from "./LabelWrapper";

export type CheckboxProps = Omit<MuiCheckboxProps, "onChange"> &
  LabelWrapperProps & {
    onChange?: (checked: boolean) => void;
  };

const Checkbox: NamedExoticComponent<CheckboxProps> = memo(
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

    const renderCheckboxElement = useCallback(
      (id?: string): JSX.Element => (
        <MuiCheckbox
          id={id}
          color="primary"
          checked={_checked}
          onChange={handleChange}
          sx={{
            "& .MuiSwitch-track": {
              transition: "background-color 0s",
            },
            "& svg.MuiSvgIcon-root": {
              transform: "translate(-1px, 0px)",
            },
            ...sx,
          }}
          icon={
            <MuiSvgIcon
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
              />
            </MuiSvgIcon>
          }
          checkedIcon={
            <MuiSvgIcon
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3zm11.03 6.28l-6.754 6.747a.75.75 0 0 1-1.06 0L6.72 13.28a.75.75 0 0 1 1.06-1.06l2.217 2.216l6.223-6.217a.75.75 0 1 1 1.06 1.062"
              />
            </MuiSvgIcon>
          }
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
          renderElement={(id) => renderCheckboxElement(id)}
        />
      );
    }

    return renderCheckboxElement();
  },
);

export default Checkbox;
