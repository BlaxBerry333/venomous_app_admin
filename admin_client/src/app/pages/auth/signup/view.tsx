import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import { AuthSignupForm } from "~/app/features/auth/auth-signup";
import type { IAuthSignupParams, IAuthSignupResponse } from "~/app/types";
import { toast } from "~/ui/components";
import { setAuthTokensAsStored } from "~/utils/libs/apis/_helpers";
import { useAPIAuthSignup } from "~/utils/libs/apis/_hooks/auth";
import { useRouteNavigate } from "~/utils/libs/router";

const AuthSignupView: NamedExoticComponent = memo(() => {
  const { handleSignup, isSignupLoading } = useAuthSignupView();

  return <AuthSignupForm isLoading={isSignupLoading} onSubmit={handleSignup} />;
});

export default AuthSignupView;

function useAuthSignupView() {
  const { replace } = useRouteNavigate();

  const { mutateAsync, isPending } = useAPIAuthSignup<IAuthSignupResponse, IAuthSignupParams>();

  const handleSignup = useCallback(
    async (formValue: IAuthSignupParams) => {
      mutateAsync(formValue)
        .then(({ access_token, refresh_token }) => {
          setAuthTokensAsStored({
            accessToken: access_token,
            refreshToken: refresh_token,
          });
          toast.success("SIGNUP SUCCESS");
          replace("/dashboard/");
        })
        .catch((error) => {
          const message: string = error.response.data.error || "SIGNUP FAILED";
          toast.error(message);
        });
    },
    [mutateAsync, replace],
  );

  return { handleSignup, isSignupLoading: isPending };
}
