import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "~/common/router";
import { useUserLogout } from "~/services/apis-hooks/users";

export default function useAccount() {
  const navigate = useNavigate();

  // ----------------------------------------------------------------------------------------------------

  const { mutateAsync: logoutAsync, isPending: isLogoutLoading } = useUserLogout();

  const handleLogout = useCallback(async () => {
    await logoutAsync();
    navigate(ROUTE_PATHS.auth.login, { replace: true });
  }, [logoutAsync, navigate]);

  // ----------------------------------------------------------------------------------------------------

  return {
    handleLogout,
    isLogoutLoading,
  };
}
