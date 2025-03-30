import axios from "axios";
import { redirectToErrorsPage } from "~/utils/libs/router/_helpers";

const ADMIN_SERVER_AUTH_INSTANCE = axios.create({
  baseURL: "/admin-server-auth",
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

ADMIN_SERVER_AUTH_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      redirectToErrorsPage(500);
      return Promise.reject("[ERROR] No Network");
    }

    return configs;
  },
  (error) => {
    return Promise.reject(error);
  },
);

ADMIN_SERVER_AUTH_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default ADMIN_SERVER_AUTH_INSTANCE;
