import { ROUTE_PATHS } from "~/common/router";

/**
 * 强制跳转到登录页面
 */
export const redirectToLoginPage = (params?: { hasRedirect?: boolean }): void => {
  const redirectUrl: string = params?.hasRedirect ? `?redirect=${window.location.pathname}` : "";
  window.location.replace(ROUTE_PATHS.auth.login + redirectUrl);
};

/**
 * 强制跳转到 404 页面
 */
export const redirectTo404Page = (): void => {
  window.location.replace(ROUTE_PATHS.error[404]);
};
