import { memo, useLayoutEffect, type NamedExoticComponent, type PropsWithChildren } from "react";

import { getStoredAuthTokens } from "~/utils/libs/apis/_helpers";
import { redirectToLoginPage } from "~/utils/libs/router/_helpers";

const AuthGuard: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  useCheckAdminServerAPIAccessToken();

  return <>{children}</>;
});

export default AuthGuard;

function useCheckAdminServerAPIAccessToken() {
  useLayoutEffect(() => {
    const { accessToken } = getStoredAuthTokens();

    if (!accessToken) {
      redirectToLoginPage({ hasRedirect: true });
      return;
    }
  }, []);
}

// function useAutoCheck({ duration, callback }: { duration: number; callback: VoidFunction }) {
//   useEffect(() => {
//     // 每 duration 秒定期检查
//     // 不需要检查是否过期，请求时若过期会自动刷新
//     const intervalId = setInterval(() => {
//       callback();
//     }, duration);
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [duration, callback]);
// }
