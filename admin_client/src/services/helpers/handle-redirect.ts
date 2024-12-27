import { ROUTE_PATHS } from "~/common/router";

/**
 * 强制跳转到登录页面
 */
export const redirectToLoginPage = (): void => {
  window.location.replace(ROUTE_PATHS.auth.login);
};

/**
 * 强制跳转到 404 页面
 */
export const redirectTo404Page = (): void => {
  window.location.replace(ROUTE_PATHS.error[404]);
};
