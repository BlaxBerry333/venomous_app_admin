import type { FC, PropsWithChildren } from "react";
import { memo, useEffect } from "react";
import { redirectToLoginPage } from "~/common/utils/handle-route-redirect";
import { getStoredAccessToken, validateTokenExpires } from "~/services/helpers";

const CustomDashboardAuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const storedToken = getStoredAccessToken();

    // 每 30 秒定期检查 access token 是否过期
    const intervalId = setInterval(() => {
      if (storedToken && !validateTokenExpires(storedToken)) {
        redirectToLoginPage();
      }
    }, 1000 * 30);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{children}</>;
};

export default memo(CustomDashboardAuthenticationProvider);
