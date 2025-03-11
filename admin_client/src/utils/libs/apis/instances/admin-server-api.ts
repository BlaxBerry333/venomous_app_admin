import axios from "axios";

import { redirectToErrorsPage, redirectToLoginPage } from "~/utils/libs/router/_helpers";
import {
  getStoredAuthTokens,
  handleTokenRefresh,
  setAuthTokensAsStored,
  validateTokenExpires,
} from "../_helpers";

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
    if (!validateTokenExpires(accessToken)) {
      await handleTokenRefresh({
        interceptorConfigs: configs,
        onSuccess: ({ access_token, refresh_token }) => {
          setAuthTokensAsStored({ accessToken: access_token, refreshToken: refresh_token });
          configs.headers.Authorization = `Bearer ${access_token}`;
          return configs;
        },
        onError: () => {
          redirectToLoginPage();
          return Promise.reject("[ERROR] Token Refresh Failed");
        },
      });
    }

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

    if (code === 401 && !config._retry) {
      config._retry = true;
      await handleTokenRefresh(config);
      return ADMIN_SERVER_API_INSTANCE(config);
    }

    if (code === 500) {
      return redirectToErrorsPage(500);
    }

    return Promise.reject(error);
  },
);

export default ADMIN_SERVER_API_INSTANCE;
