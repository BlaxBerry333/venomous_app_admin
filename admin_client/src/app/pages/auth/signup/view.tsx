import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { AuthSignupForm } from "~/app/features/auth/_components";
import { toast } from "~/ui/components";
import { setAuthTokensAsStored } from "~/utils/libs/apis/_helpers";
import { useAPIAuthSignup } from "~/utils/libs/apis/_hooks/auth";
import type { IAuthSignupParams } from "~/utils/libs/apis/types/_auth";
import { useTranslation } from "~/utils/libs/i18n";
import { DASHBOARD_PATHS, useRouteNavigate } from "~/utils/libs/router";

const AuthSignupView: NamedExoticComponent = memo(() => {
  const { handleSignup, isSignupLoading } = useAuthSignupView();

  return <AuthSignupForm isLoading={isSignupLoading} onSubmit={handleSignup} />;
});

export default AuthSignupView;

// ----------------------------------------------------------------------------------------------------

function useAuthSignupView() {
  const { t } = useTranslation("auth");
  const { replace } = useRouteNavigate();

  const { mutateAsync, isPending } = useAPIAuthSignup();

  const handleSignup = useCallback(
    async (formValue: IAuthSignupParams) => {
      mutateAsync(formValue)
        .then(({ access_token, refresh_token }) => {
          setAuthTokensAsStored({
            accessToken: access_token,
            refreshToken: refresh_token,
          });
          toast.success(t("alerts.SIGNUP_SUCCESS"));
          replace(DASHBOARD_PATHS.analysis);
        })
        .catch((error) => {
          const message: string = error.response.data.error || t("alerts.SIGNUP_FAILED");
          toast.error(message);
        });
    },
    [mutateAsync, replace, t],
  );

  return {
    handleSignup,
    isSignupLoading: isPending,
  };
}
