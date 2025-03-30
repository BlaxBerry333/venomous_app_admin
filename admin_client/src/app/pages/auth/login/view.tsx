import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { AuthLoginForm } from "~/app/features/auth/_components";
import { toast } from "~/ui/components";
import { setAuthTokensAsStored } from "~/utils/libs/apis/_helpers";
import { useAPIAuthLogin } from "~/utils/libs/apis/_hooks/auth";
import type { IAuthLoginParams } from "~/utils/libs/apis/types/_auth";
import { useTranslation } from "~/utils/libs/i18n";
import { DASHBOARD_PATHS, useRouteNavigate, useRouteSearchParams } from "~/utils/libs/router";

const AuthLoginView: NamedExoticComponent = memo(() => {
  const { handleLogin, isLoginLoading } = useAuthLoginView();

  return <AuthLoginForm isLoading={isLoginLoading} onSubmit={handleLogin} />;
});

export default AuthLoginView;

// ----------------------------------------------------------------------------------------------------

function useAuthLoginView() {
  const { t } = useTranslation("auth");
  const { replace } = useRouteNavigate();
  const searchParams = useRouteSearchParams<{ redirect: string }>();

  const { mutateAsync, isPending } = useAPIAuthLogin();

  const handleLogin = useCallback(
    async (formValue: IAuthLoginParams) => {
      mutateAsync(formValue)
        .then(({ access_token, refresh_token }) => {
          setAuthTokensAsStored({
            accessToken: access_token,
            refreshToken: refresh_token,
          });
          // token 过期等原因导致的挑战到登陆页的场合，重定向回指定页面
          if (searchParams.redirect) {
            toast.success(t("alerts.WELCOME_BACK"));
            return replace(searchParams.redirect);
          }
          // 初次登录
          toast.success(t("alerts.LOGIN_SUCCESS"));
          replace(DASHBOARD_PATHS.analysis);
        })
        .catch((error) => {
          const message: string = error.response.data.error || t("alerts.LOGIN_FAILED");
          toast.error(message);
        });
    },
    [mutateAsync, replace, searchParams.redirect, t],
  );

  return {
    handleLogin,
    isLoginLoading: isPending,
  };
}
