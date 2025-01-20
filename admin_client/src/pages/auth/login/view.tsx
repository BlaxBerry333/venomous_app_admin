import type { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "~/common/components/custom/snackbar";
import { AuthLayoutPageContainer } from "~/common/components/layouts/AuthLayout";
import useTranslation from "~/common/hooks/useTranslation";
import { ROUTE_PATHS } from "~/common/router";
import AuthLoginForm, { type AuthLoginFormValueType } from "~/sections/auth-login/AuthLoginForm";
import { useUserLogin, useVisitorLogin } from "~/services/apis-hooks/users";
import { getParsedAPIErrorResponse } from "~/services/helpers";

export default function AuthLoginPageView() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  // ----------------------------------------------------------------------------------------------------

  const { mutateAsync: accountLoginAsync, isPending: isAccountLoginLoading } = useUserLogin();

  const handleAccountLogin = useCallback(
    async (formValue: AuthLoginFormValueType) => {
      try {
        await accountLoginAsync(formValue);
        toast.success(t("common.snackbar.login-success"));
        navigate(ROUTE_PATHS.dashboard.root, { replace: true });
      } catch (error) {
        const { code, message } = getParsedAPIErrorResponse(error as AxiosError);
        toast.error(`${code}: ${message}`);
      }
    },
    [accountLoginAsync, navigate, t],
  );

  // ----------------------------------------------------------------------------------------------------

  const { mutateAsync: visitorLoginAsync, isPending: isVisitorLoginLoading } = useVisitorLogin();

  const handleVisitorLogin = useCallback(async () => {
    try {
      await visitorLoginAsync();
      navigate(ROUTE_PATHS.dashboard.root, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }, [visitorLoginAsync, navigate]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <AuthLayoutPageContainer
      title={t("auth.auth-login.title")}
      subtitle={t("auth.auth-login.navigate-to-signup")}
      subtitleLink={ROUTE_PATHS.auth.signUp}
      form={
        <AuthLoginForm
          data={{ username: "admin", password: "" }}
          isAccountLoginLoading={isAccountLoginLoading}
          isVisitorLoginLoading={isVisitorLoginLoading}
          handleAccountLogin={handleAccountLogin}
          handleVisitorLogin={handleVisitorLogin}
        />
      }
    />
  );
}
