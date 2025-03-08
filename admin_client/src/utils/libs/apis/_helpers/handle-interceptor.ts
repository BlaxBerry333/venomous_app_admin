import type { InternalAxiosRequestConfig } from "axios";
import { getRefreshAccessToken } from "../_hooks/auth";

let isRefreshing: boolean = false;

let failedQueue: Array<{
  resolve: (value: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}> = [];

export async function handleTokenRefresh({
  interceptorConfigs,
  onSuccess,
  onError,
}: {
  interceptorConfigs: InternalAxiosRequestConfig<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onSuccess: (newToken: { access_token: string; refresh_token: string }) => void;
  onError: (error?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  // 防止多个请求同时刷新 Token
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const newTokens = await getRefreshAccessToken();

    // 刷新 Token 成功
    failedQueue.forEach((promise) => promise.resolve(interceptorConfigs));
    failedQueue = [];

    onSuccess(newTokens);
  } catch (err) {
    // 刷新 Token 失败
    failedQueue.forEach((promise) => promise.reject(err));
    failedQueue = [];

    onError(err);
  } finally {
    isRefreshing = false;
  }
}
