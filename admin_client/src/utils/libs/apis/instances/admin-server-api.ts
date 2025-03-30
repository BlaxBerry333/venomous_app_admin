import axios from "axios";

import { redirectToErrorsPage, redirectToLoginPage } from "~/utils/libs/router/_helpers";
import { getStoredAuthTokens, handleTokenRefresh } from "../_helpers";

const ADMIN_SERVER_API_INSTANCE = axios.create({
  baseURL: "/admin-server-api",
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

ADMIN_SERVER_API_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      redirectToErrorsPage(500);
      return Promise.reject("[ERROR] No Network");
    }

    const { accessToken } = getStoredAuthTokens();

    // 没有本地缓存的 token
    if (!accessToken) {
      redirectToLoginPage();
      return Promise.reject("[ERROR] No Token");
    }

    // 有本地缓存的 token，但过期了
    // 请求拦截器中不做处理，在响应拦截器中会自动刷新 token

    // token 有效
    configs.headers.Authorization = `Bearer ${accessToken}`;
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  },
);

ADMIN_SERVER_API_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const code = error?.response?.status;
    const config = error?.config;

    if (code === 500) {
      return redirectToErrorsPage(500);
    }

    if (code === 401) {
      if (!config._retry) {
        config._retry = true;
        try {
          await handleTokenRefresh({
            interceptorConfigs: config,
            onSuccess: ({ access_token }) => {
              config.headers.Authorization = `Bearer ${access_token}`;
            },
            onError: () => {
              redirectToLoginPage();
            },
          });
          // 使用新的Token重新发送当前请求
          return ADMIN_SERVER_API_INSTANCE(config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      } else {
        // 已重试过仍失败，跳转登录
        redirectToLoginPage();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default ADMIN_SERVER_API_INSTANCE;
