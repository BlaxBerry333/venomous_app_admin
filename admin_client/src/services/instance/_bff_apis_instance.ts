import axios from "axios";

import { CommonErrorMessages } from "~/common/utils/handle-common-message";
import { redirectToLoginPage } from "~/common/utils/handle-route-redirect";
import { ADMIN_CLIENT_CONFIGS } from "~/configs/_base";

const BFF_API_INSTANCE = axios.create({
  baseURL: ADMIN_CLIENT_CONFIGS.domain.bff,
});

BFF_API_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      throw Promise.reject(CommonErrorMessages.NoInternetConnection);
    }

    // const storedToken = getStoredAccessToken();

    // // 没有本地缓存的 token
    // if (!storedToken) {
    //   // redirectToLoginPage();
    //   return Promise.reject(CommonErrorMessages.NoLocalToken);
    // }

    // // 有本地缓存的 token，但过期了
    // const isTokenExpiresValid = validateTokenExpires(storedToken);
    // if (!isTokenExpiresValid) {
    //   // const newToken = await refreshToken();
    //   // setStoredToken(newToken);
    //   // configs.headers.Authorization = `Bearer ${newToken}`;
    //   // redirectToLoginPage();
    //   return Promise.reject(CommonErrorMessages.LocalTokenExpires);
    // }

    // ok
    // configs.headers.Authorization = `Bearer ${storedToken}`;
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  },
);

BFF_API_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const unauthorized = error?.response?.status === 401;
    if (unauthorized) {
      redirectToLoginPage();
    }
    return Promise.reject(error);
  },
);

export default BFF_API_INSTANCE;
