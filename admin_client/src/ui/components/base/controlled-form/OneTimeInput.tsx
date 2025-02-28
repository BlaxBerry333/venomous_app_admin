import type { NamedExoticComponent } from "react";
import { memo, useCallback, useDeferredValue, useEffect, useRef, useState } from "react";

import { debounce } from "lodash-es";

import MuiFormHelperText from "@mui/material/FormHelperText";
import { MuiOtpInput, type MuiOtpInputProps } from "mui-one-time-password-input";

export type OneTimeInputProps = MuiOtpInputProps & {
  error?: boolean;
  helperText?: string;
};

const OneTimeInput: NamedExoticComponent<OneTimeInputProps> = memo(
  ({ value = "", onChange, length = 6, TextFieldsProps, error, helperText, ...props }) => {
    const [_inputValue, _setInputValue] = useState<string>("");
    const inputValue = useDeferredValue<string>(_inputValue);
    const setInputValue = useRef(debounce((value: string) => _setInputValue(value), 40));

    useEffect(() => {
      const debounceFunction = setInputValue.current;
      return () => {
        debounceFunction.cancel();
      };
    }, []);

    useEffect(() => {
      _setInputValue(value);
    }, [value]);

    const handleInputChange = useCallback(
      (value: string) => {
        setInputValue.current(value);
        onChange?.(value);
      },
      [onChange],
    );

    return (
      <>
        <MuiOtpInput
          value={inputValue}
          onChange={handleInputChange}
          length={length <= 0 ? 1 : length > 10 ? 10 : length}
          gap={1}
          TextFieldsProps={{
            placeholder: "-",
            error,
            slotProps: {
              htmlInput: {
                autoComplete: "off",
                sx: { borderRadius: "8px" },
              },
              input: {
                autoComplete: "off",
                sx: { borderRadius: "8px" },
              },
              formHelperText: {
                sx: {
                  m: 0,
                  mx: 0.5,
                  mb: 0.5,
                },
              },
            },
            ...TextFieldsProps,
          }}
          {...props}
        />

        <MuiFormHelperText
          error={error}
          sx={{
            display: helperText ? "block" : "none",
            mt: 0,
            mx: 0.5,
            mb: 0.5,
          }}
        >
          {helperText}
        </MuiFormHelperText>
      </>
    );
  },
);

export default OneTimeInput;
