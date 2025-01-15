import type { FC } from "react";
import { memo, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiButton from "@mui/material/Button";
import MuiGrid from "@mui/material/Grid2";
import MuiStack from "@mui/material/Stack";

import { CustomForm, CustomFormField } from "~/common/components/custom/form-fields";
import useTranslation from "~/common/hooks/useTranslation";

const formSchema = z
  .object({
    username: z.string(),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long") // 至少8位
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // 至少一个大写字母
      .regex(/[a-z]/, "Password must contain at least one lowercase letter") // 至少一个小写字母
      .regex(/[0-9]/, "Password must contain at least one number") // 至少一个数字
      .regex(/[@$!%*?&]/, "Password must contain at least one special character"), // 至少一个特殊字符
  })
  .refine((data) => !data.username || data.username.length >= 6, {
    path: ["display"],
    message: "Username must be at least 6 characters long", // 用户名长度不能少于 6 位
  });

export type AuthSignUpFormValueType = z.infer<typeof formSchema>;

const AuthSignUpForm: FC<{
  data: AuthSignUpFormValueType;
  isAccountSignUpLoading: boolean;
  handleAccountSignUp: (formValue: AuthSignUpFormValueType) => Promise<void>;
}> = ({ data, isAccountSignUpLoading, handleAccountSignUp }) => {
  const { t } = useTranslation();

  const form = useForm<AuthSignUpFormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
    mode: "all",
  });

  const { formState, reset } = form;

  // ----------------------------------------------------------------------------------------------------

  const isResetDisabled: boolean = !formState.isDirty;
  const isSubmitDisabled: boolean = !formState.isValid || isAccountSignUpLoading;
  const isSubmitting: boolean = isAccountSignUpLoading || formState.isSubmitting;

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    async (formValue: AuthSignUpFormValueType) => {
      await handleAccountSignUp(formValue);
    },
    [handleAccountSignUp],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomForm<AuthSignUpFormValueType> form={form} onSubmit={onSubmit}>
      <MuiGrid container>
        <MuiGrid size={{ xs: 12 }}>
          <CustomFormField.Text name="username" label={t("auth.user-data.username")} />
        </MuiGrid>
        <MuiGrid size={{ xs: 12 }}>
          <CustomFormField.Text name="email" label={t("auth.user-data.password")} />
        </MuiGrid>
        <MuiGrid size={{ xs: 12 }}>
          <CustomFormField.Password name="password" label={t("auth.user-data.password")} />
        </MuiGrid>
      </MuiGrid>

      <MuiStack direction="column" spacing={1} sx={{ mt: 2 }}>
        <MuiButton color="error" disabled={isResetDisabled} onClick={onReset}>
          {t("common.buttons.reset")}
        </MuiButton>
        <MuiLoadingButton type="submit" disabled={isSubmitDisabled} loading={isSubmitting}>
          {t("common.buttons.signup")}
        </MuiLoadingButton>
      </MuiStack>
    </CustomForm>
  );
};

export default memo(AuthSignUpForm);
