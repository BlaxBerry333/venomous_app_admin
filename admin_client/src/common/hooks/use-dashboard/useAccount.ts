import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "~/common/components/custom/snackbar";
import { ROUTE_PATHS } from "~/common/router";
import { useUserLogout } from "~/services/apis-hooks/users";
import useTranslation from "../useTranslation";

export default function useAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ----------------------------------------------------------------------------------------------------

  const { mutateAsync: logoutAsync, isPending: isLogoutLoading } = useUserLogout();

  const handleLogout = useCallback(async () => {
    await logoutAsync();
    toast.success(t("common.snackbar.logout-success"));
    navigate(ROUTE_PATHS.auth.login, { replace: true });
  }, [logoutAsync, navigate, t]);

  // ----------------------------------------------------------------------------------------------------

  return {
    handleLogout,
    isLogoutLoading,
  };
}
