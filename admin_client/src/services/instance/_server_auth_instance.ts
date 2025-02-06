import axios from "axios";

import { CommonErrorMessages } from "~/common/utils/handle-common-message";

const SERVER_AUTH_INSTANCE = axios.create({
  baseURL: "/drf",
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

SERVER_AUTH_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      throw Promise.reject(CommonErrorMessages.NoInternetConnection);
    }

    return configs;
  },
  (error) => {
    return Promise.reject(error);
  },
);

SERVER_AUTH_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default SERVER_AUTH_INSTANCE;
