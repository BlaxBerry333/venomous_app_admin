import axios from "axios";

import { CommonErrorMessages } from "~/common/utils/handle-common-message";
import { getStoredAccessTokenOfNoteApp } from "../helpers";

const BFF_API_INSTANCE = axios.create({
  baseURL: "/bff",
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

BFF_API_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      throw Promise.reject(CommonErrorMessages.NoInternetConnection);
    }

    // 请求 BFF Notes API
    if (configs.url?.startsWith("/api/notes/api/")) {
      const accessToken = getStoredAccessTokenOfNoteApp();
      if (accessToken) {
        configs.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

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
    // const unauthorized = error?.response?.status === 401;
    // if (unauthorized) {
    //   redirectToLoginPage();
    // }
    return Promise.reject(error);
  },
);

export default BFF_API_INSTANCE;
