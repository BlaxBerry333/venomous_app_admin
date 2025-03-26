import { useCallback } from "react";

import type { IAuthSignupParams } from "~/app/types/_auth";
import { toast } from "~/ui/components";
import { setAuthTokensAsStored } from "~/utils/libs/apis/_helpers";
import { useAPIAuthSignup } from "~/utils/libs/apis/_hooks/auth";
import { DASHBOARD_PATHS, useRouteNavigate } from "~/utils/libs/router";

function useAuthSignupView() {
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
          toast.success("SIGNUP SUCCESS");
          replace(DASHBOARD_PATHS.analysis);
        })
        .catch((error) => {
          const message: string = error.response.data.error || "SIGNUP FAILED";
          toast.error(message);
        });
    },
    [mutateAsync, replace],
  );

  return {
    handleSignup,
    isSignupLoading: isPending,
  };
}

export default useAuthSignupView;
