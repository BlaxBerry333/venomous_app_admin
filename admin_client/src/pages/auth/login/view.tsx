import type { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "~/common/components/custom/snackbar";
import { AuthLayoutPageContainer } from "~/common/components/layouts/AuthLayout";
import useRouteSearchParams from "~/common/hooks/useRouteSearchParams";
import useTranslation from "~/common/hooks/useTranslation";
import { ROUTE_PATHS } from "~/common/router";
import AuthLoginForm, { type AuthLoginFormValueType } from "~/sections/auth-login/AuthLoginForm";
import { useUserLogin, useVisitorLogin } from "~/services/apis-hooks/users";
import { getParsedAPIErrorResponse } from "~/services/helpers";

export default function AuthLoginPageView() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const searchParams = useRouteSearchParams<{ redirect: string }>();

  // ----------------------------------------------------------------------------------------------------

  const { mutateAsync: accountLoginAsync, isPending: isAccountLoginLoading } = useUserLogin();

  const handleAccountLogin = useCallback(
    async (formValue: AuthLoginFormValueType) => {
      try {
        await accountLoginAsync(formValue);

        // token 过期等原因导致的挑战到登陆页的场合，重定向回指定页面
        if (searchParams.redirect) {
          toast.success(t("common.snackbar.login-welcome-back"));
          navigate(searchParams.redirect, { replace: true });
          return;
        }
        // 初次登录
        toast.success(t("common.snackbar.login-success"));
        navigate(ROUTE_PATHS.dashboard.root, { replace: true });
      } catch (error) {
        const { code, message } = getParsedAPIErrorResponse(error as AxiosError);
        toast.error(`${code}: ${message}`);
      }
    },
    [accountLoginAsync, navigate, t, searchParams.redirect],
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
