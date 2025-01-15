import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayoutPageContainer } from "~/common/components/layouts/AuthLayout";
import useTranslation from "~/common/hooks/useTranslation";
import { ROUTE_PATHS } from "~/common/router";

import AuthSignUpForm, {
  type AuthSignUpFormValueType,
} from "~/sections/auth-signup/AuthSignUpForm";
import { useUserRegister } from "~/services/apis-hooks/users";

export default function AuthSignUpPageView() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  // ----------------------------------------------------------------------------------------------------

  const { mutateAsync: accountSignupAsync, isPending: isAccountSignUpLoading } = useUserRegister();

  const handleAccountLogin = useCallback(
    async (formValue: AuthSignUpFormValueType) => {
      try {
        await accountSignupAsync(formValue);
        navigate(ROUTE_PATHS.dashboard.root, { replace: true });
      } catch (error) {
        console.log(error);
      }
    },
    [accountSignupAsync, navigate],
  );

  return (
    <AuthLayoutPageContainer
      title={t("auth.auth-signup.title")}
      subtitle={t("auth.auth-signup.navigate-to-login")}
      subtitleLink={ROUTE_PATHS.auth.login}
      form={
        <AuthSignUpForm
          data={{ username: "", email: "", password: "" }}
          isAccountSignUpLoading={isAccountSignUpLoading}
          handleAccountSignUp={handleAccountLogin}
        />
      }
    />
  );
}
