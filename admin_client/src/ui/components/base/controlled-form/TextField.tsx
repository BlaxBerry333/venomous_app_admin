import type { NamedExoticComponent } from "react";
import { memo, useCallback, useDeferredValue, useEffect, useRef, useState } from "react";

import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

import { debounce } from "lodash-es";
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
    const [_inputValue, _setInputValue] = useState<string>("");
    const inputValue = useDeferredValue<string>(_inputValue);
    const setInputValue = useRef(debounce((value: string) => _setInputValue(value), 40));

    useEffect(() => {
      const debounceFunction = setInputValue.current;
      return () => {
        debounceFunction.cancel();
      };
    }, []);

    const handleInputChange = useCallback(
      (value: string) => {
        setInputValue.current(value);
        onChange(value);
      },
      [onChange],
    );

    useEffect(() => {
      setInputValue.current(value);
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
                      setInputValue.current("");
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
