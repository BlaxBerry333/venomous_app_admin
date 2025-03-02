import type { NamedExoticComponent } from "react";
import { memo, useCallback, useEffect, useState } from "react";

import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

import { BaseColor, BaseSize } from "~/ui/_helpers";
import { IconButton } from "~/ui/components/base/iconbutton";

export type TextFieldProps = Omit<MuiTextFieldProps, "select" | "value" | "onChange"> & {
  clearable?: boolean;
  showClearButton?: boolean;
  handleOnClear?: VoidFunction;
  endElement?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
};

const TextField: NamedExoticComponent<TextFieldProps> = memo(
  ({
    error,
    helperText,
    slotProps,
    clearable,
    showClearButton,
    handleOnClear,
    endElement,
    value = "",
    onChange,
    ...props
  }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = useCallback(
      (value: string) => {
        setInputValue(value);
        onChange(value);
      },
      [onChange],
    );

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <MuiTextField
        type="text"
        size="small"
        variant="outlined"
        error={error}
        helperText={helperText}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        slotProps={{
          htmlInput: {
            autoComplete: "off",
            ...slotProps?.htmlInput,
            sx: { borderRadius: "8px" },
          },
          input: {
            ...slotProps?.input,
            sx: { borderRadius: "8px", pr: !endElement && clearable ? 0 : "14px" },
            endAdornment: (
              <>
                {clearable && (
                  <IconButton
                    icon="solar:close-circle-line-duotone"
                    size={BaseSize.SMALL}
                    color={BaseColor.INHERIT}
                    sx={{ visibility: showClearButton ? "visible" : "hidden" }}
                    onClick={() => {
                      setInputValue("");
                      handleOnClear?.();
                    }}
                  />
                )}
                {endElement}
              </>
            ),
          },
          inputLabel: {
            ...slotProps?.inputLabel,
            shrink: true,
            sx: { fontWeight: "bold" },
          },
          formHelperText: {
            ...slotProps?.formHelperText,
            sx: {
              display: helperText ? "block" : "none",
              m: 0,
              mx: 0.5,
              mb: 0.5,
            },
          },
        }}
        {...props}
      />
    );
  },
);

export default TextField;
