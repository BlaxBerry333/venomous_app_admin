import type { FC } from "react";
import { memo, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiButton from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import MuiGrid from "@mui/material/Grid2";
import MuiStack from "@mui/material/Stack";

import { CustomForm, CustomFormField } from "~/common/components/custom/form-fields";
import useTranslation from "~/common/hooks/useTranslation";

const formSchema = z.object({
  // email: z.string().email("Please enter a valid email address"),
  username: z.string().min(4, "Username must be at least 4 characters long"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

export type AuthLoginFormValueType = z.infer<typeof formSchema>;

const AuthLoginForm: FC<{
  data: AuthLoginFormValueType;
  isAccountLoginLoading: boolean;
  isVisitorLoginLoading: boolean;
  handleAccountLogin: (formValue: AuthLoginFormValueType) => Promise<void>;
  handleVisitorLogin: () => Promise<void>;
}> = ({
  data,
  isAccountLoginLoading,
  isVisitorLoginLoading,
  handleAccountLogin,
  handleVisitorLogin,
}) => {
  const { t } = useTranslation();

  const form = useForm<AuthLoginFormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
    mode: "all",
  });

  const { formState, reset } = form;

  // ----------------------------------------------------------------------------------------------------

  const isResetDisabled: boolean = !formState.isDirty;
  const isSubmitDisabled: boolean = !formState.isValid;
  const isSubmitting: boolean = isAccountLoginLoading || formState.isSubmitting;

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    async (formValue: AuthLoginFormValueType) => {
      await handleAccountLogin(formValue);
    },
    [handleAccountLogin],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomForm<AuthLoginFormValueType> form={form} onSubmit={onSubmit}>
      <MuiGrid container>
        <MuiGrid size={{ xs: 12 }}>
          <CustomFormField.Text name="username" label={t("auth.user-data.username")} />
        </MuiGrid>
        <MuiGrid size={{ xs: 12 }}>
          <CustomFormField.Text name="password" label={t("auth.user-data.password")} />
        </MuiGrid>
      </MuiGrid>

      <MuiStack direction="column" spacing={1} sx={{ mt: 2 }}>
        <MuiButton color="error" disabled={isResetDisabled} onClick={onReset}>
          {t("common.buttons.reset")}
        </MuiButton>
        <MuiLoadingButton type="submit" disabled={isSubmitDisabled} loading={isSubmitting}>
          {t("common.buttons.login")}
        </MuiLoadingButton>

        <MuiDivider>{"OR"}</MuiDivider>

        <MuiLoadingButton
          color="inherit"
          onClick={handleVisitorLogin}
          loading={isVisitorLoginLoading}
          disabled
        >
          {t("auth.auth-login.visitor-login")}
        </MuiLoadingButton>
      </MuiStack>
    </CustomForm>
  );
};

export default memo(AuthLoginForm);
