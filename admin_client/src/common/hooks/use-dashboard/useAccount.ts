import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "~/router";
import useBoolean from "../useBoolean";

export default function useAccount() {
  const navigate = useNavigate();

  // ----------------------------------------------------------------------------------------------------

  const {
    value: isLogoutLoading,
    setTrue: setLogoutBeginning,
    setFalse: setLogoutFinished,
  } = useBoolean(false);

  const handleLogout = useCallback(async () => {
    setLogoutBeginning();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLogoutFinished();
    navigate(ROUTE_PATHS.auth.login, { replace: true });
  }, [navigate, setLogoutBeginning, setLogoutFinished]);

  // ----------------------------------------------------------------------------------------------------

  return {
    handleLogout,
    isLogoutLoading,
  };
}
