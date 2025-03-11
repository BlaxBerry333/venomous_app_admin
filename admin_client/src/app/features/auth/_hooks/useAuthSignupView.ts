import { useCallback } from "react";

import type { IAuthSignupParams, IAuthSignupResponse } from "~/app/types/_auth";
import { toast } from "~/ui/components";
import { setAuthTokensAsStored } from "~/utils/libs/apis/_helpers";
import { useAPIAuthSignup } from "~/utils/libs/apis/_hooks/auth";
import { useRouteNavigate } from "~/utils/libs/router";

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

  return {
    handleSignup,
    isSignupLoading: isPending,
  };
}

export default useAuthSignupView;
