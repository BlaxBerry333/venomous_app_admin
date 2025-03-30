import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { useFormContext, useFormState } from "react-hook-form";

import MuiStack, { type StackProps as MuiStackProps } from "@mui/material/Stack";

import { Button, ButtonVariant } from "~/ui/components/base";

type RHFFormActionProps = {
  isLoading?: boolean;
  hideResetButton?: boolean;
  disabledSubmit?: boolean;
  resetButtonText?: string;
  submitButtonText?: string;
  onBeforeSubmit?: () => Promise<void>;
  sx?: MuiStackProps["sx"];
};

const RHFFormAction: NamedExoticComponent<RHFFormActionProps> = memo(
  ({
    isLoading: isSubmitting = false,
    hideResetButton = false,
    disabledSubmit = false,
    resetButtonText = "Reset",
    submitButtonText = "Submit",
    onBeforeSubmit,
    sx,
  }) => {
    const { reset } = useFormContext();
    const {
      isDirty: isChanged,
      isValid,
      isSubmitting: isFormSubmitting,
      defaultValues,
    } = useFormState();
    const isLoading: boolean = isSubmitting || isFormSubmitting;

    const handleReset = useCallback(() => {
      reset(defaultValues);
    }, [reset, defaultValues]);

    const handleBeforeSubmit = useCallback(() => {
      onBeforeSubmit?.();
    }, [onBeforeSubmit]);

    return (
      <MuiStack sx={{ flexDirection: { xs: "column", sm: "row" }, mt: 1, ...sx }}>
        {!hideResetButton && (
          <Button
            type="reset"
            variant={ButtonVariant.OUTLINED}
            disabled={!isChanged || isLoading}
            onClick={handleReset}
            sx={{ mr: { xs: 0, sm: 1 }, mb: { xs: 1, sm: 0 } }}
          >
            {resetButtonText}
          </Button>
        )}

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={disabledSubmit || !isValid}
          onClick={handleBeforeSubmit}
        >
          {submitButtonText}
        </Button>
      </MuiStack>
    );
  },
);

export default RHFFormAction;
