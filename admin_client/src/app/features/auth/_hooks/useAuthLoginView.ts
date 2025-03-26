import { useCallback } from "react";

import type { IAuthLoginParams } from "~/app/types/_auth";
import { toast } from "~/ui/components";
import { setAuthTokensAsStored } from "~/utils/libs/apis/_helpers";
import { useAPIAuthLogin } from "~/utils/libs/apis/_hooks/auth";
import { DASHBOARD_PATHS, useRouteNavigate, useRouteSearchParams } from "~/utils/libs/router";

function useAuthLoginView() {
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
            toast.success("LOGIN SUCCESS");
            return replace(searchParams.redirect);
          }
          // 初次登录
          toast.success("LOGIN SUCCESS");
          replace(DASHBOARD_PATHS.analysis);
        })
        .catch((error) => {
          const message: string = error.response.data.error || "LOGIN FAILED";
          toast.error(message);
        });
    },
    [mutateAsync, replace, searchParams.redirect],
  );

  return {
    handleLogin,
    isLoginLoading: isPending,
  };
}

export default useAuthLoginView;
