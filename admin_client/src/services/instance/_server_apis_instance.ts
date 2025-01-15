import axios from "axios";

import { CommonErrorMessages } from "~/common/utils/handle-common-message";
import { redirectToLoginPage } from "~/common/utils/handle-route-redirect";
import { getUserRefreshAccessToken } from "../apis-hooks/users";
import { validateTokenExpires } from "../helpers/handle-jwt-token";
import {
  getStoredAccessToken,
  setAccessTokenAsStored,
  setRefreshTokenAsStored,
} from "../helpers/handle-stored-token";

const SERVER_API_INSTANCE = axios.create({
  baseURL: "/",
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

SERVER_API_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      throw Promise.reject(CommonErrorMessages.NoInternetConnection);
    }

    const storedToken = getStoredAccessToken();

    // 没有本地缓存的 token
    if (!storedToken) {
      redirectToLoginPage();
      return Promise.reject(CommonErrorMessages.NoLocalToken);
    }
    // 有本地缓存的 token，但过期了
    const isTokenExpiresValid = validateTokenExpires(storedToken!);
    if (!isTokenExpiresValid) {
      // redirectToLoginPage();
      const newToken = await getUserRefreshAccessToken();
      setAccessTokenAsStored(newToken.access_token);
      setRefreshTokenAsStored(newToken.refresh_token);
      configs.headers.Authorization = `Bearer ${newToken.access_token}`;
      return Promise.reject(CommonErrorMessages.LocalTokenExpires);
    }

    // ok
    configs.headers.Authorization = `Bearer ${storedToken}`;
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  },
);

SERVER_API_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // const unauthorized = error?.response?.status === 401;
    // if (unauthorized) {
    //   redirectToLoginPage();
    // }
    return Promise.reject(error);
  },
);

export default SERVER_API_INSTANCE;
