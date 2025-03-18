import type { InternalAxiosRequestConfig } from "axios";
import { getRefreshAccessToken } from "../_hooks/auth";
import { ADMIN_SERVER_API_INSTANCE } from "../instances";
import { setAuthTokensAsStored } from "./token-storage";

let isRefreshing: boolean = false;

let failedQueue: Array<{
  resolve: (value: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  config: InternalAxiosRequestConfig<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
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
      failedQueue.push({ resolve, reject, config: interceptorConfigs });
    });
  }

  isRefreshing = true;

  try {
    const newTokens = await getRefreshAccessToken();
    setAuthTokensAsStored({
      accessToken: newTokens.access_token,
      refreshToken: newTokens.refresh_token,
    });

    // 处理队列中的所有请求，更新它们的配置
    failedQueue.forEach(({ resolve, config }) => {
      // 创建新配置，避免修改原始对象
      const retryConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newTokens.access_token}`,
        },
        _retry: true, // 标记已重试
      };
      resolve(ADMIN_SERVER_API_INSTANCE(retryConfig));
    });
    failedQueue = []; // 清空队列

    onSuccess(newTokens);
  } catch (err) {
    // 刷新失败，拒绝所有队列请求
    failedQueue.forEach(({ reject }) => reject(err));
    failedQueue = [];

    onError(err);
  } finally {
    isRefreshing = false;
  }
}
