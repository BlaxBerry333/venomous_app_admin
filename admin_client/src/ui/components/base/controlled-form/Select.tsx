import type { NamedExoticComponent } from "react";
import { memo, useEffect, useState } from "react";

import MuiMenuItem from "@mui/material/MenuItem";
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

import { BlankContentImage } from "~/ui/components/design";
import { type ListItemProps } from "../list-item";
import { LoadingProgress, MaskWithLoading } from "../mask";

export type SelectOptionType = ListItemProps<string | number>;

export type SelectProps = Omit<MuiTextFieldProps, "children" | "onChange"> & {
  options: SelectOptionType[];
  onChange?: (option: SelectOptionType | undefined) => void;
  isLoading?: boolean;
};

const Select: NamedExoticComponent<SelectProps> = memo(
  ({
    options,
    defaultValue = options[0]?.value,
    value: propsValue,
    onChange: propsOnChange,
    isLoading = false,
    disabled = false,
    helperText,
    ...props
  }) => {
    const [value, setValue] = useState<string>(String(defaultValue || ""));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as string;
      setValue(value);
      propsOnChange?.(options.find((option) => option.value === value));
    };

    useEffect(() => {
      if (propsValue !== undefined) {
        setValue(String(propsValue));
      }
    }, [propsValue]);

    return (
      <MuiTextField
        select
        size="small"
        variant="outlined"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        slotProps={{
          htmlInput: {
            autoComplete: "off",
            sx: { borderRadius: "8px" },
          },
          input: {
            sx: {
              borderRadius: "8px",
              "& .MuiSelect-icon": {
                display: disabled ? "none" : "block",
              },
            },
          },
          inputLabel: {
            shrink: true,
            sx: { fontWeight: "bold" },
          },
          formHelperText: {
            sx: {
              display: helperText ? "block" : "none",
              m: 0,
              mx: 0.5,
              mb: 1,
            },
          },
          select: {
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: 200,
                  overflowY: "auto",
                  "& li.MuiButtonBase-root": { mb: 0.5 },
                  "& li.MuiButtonBase-root:last-child": { mb: 0 },
                },
              },
            },
          },
        }}
        {...props}
      >
        {options.map((option) => (
          <MuiMenuItem key={option.value} value={option.value} sx={{ px: "12px" }}>
            {option.title}
          </MuiMenuItem>
        ))}

        {(isLoading || !options.length) && (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
            }}
          >
            <MaskWithLoading isLoading={isLoading} progress={LoadingProgress.CIRCULAR} />
            {!options.length && <BlankContentImage />}
          </div>
        )}
      </MuiTextField>
    );
  },
);

export default Select;
