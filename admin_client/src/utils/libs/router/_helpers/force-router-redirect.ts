/**
 * 强制跳转到登录页面
 */
export const redirectToLoginPage = (params?: { hasRedirect?: boolean }): void => {
  const redirectUrl: string = params?.hasRedirect
    ? `?redirect=${window.location.pathname + window.location.search}`
    : "";

  return window.location.replace("/auth/login" + redirectUrl);
};

/**
 * 强制跳转到错误页面
 */
export const redirectToErrorsPage = (errorCode: number): void => {
  switch (errorCode) {
    case 403:
      return window.location.replace("/errors/403");
    case 500:
      return window.location.replace("/errors/500");
    case 404:
    default:
      return window.location.replace("/errors/404");
  }
};
