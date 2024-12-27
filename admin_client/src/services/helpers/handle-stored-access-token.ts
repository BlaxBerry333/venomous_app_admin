import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "~/common/utils/handle-web-storage";

const STORE_JWT_TOKEN_KEY = "__ACCESS_TOKEN__" as const;

/**
 * 从本地 LocalStorage 获取缓存的 token
 */
export const getStoredAccessToken = () => {
  return getLocalStorageItem<string>(STORE_JWT_TOKEN_KEY);
};

/**
 * 将 token 缓存到本地 LocalStorage
 */
export const setAccessTokenAsStored = (token: string): void => {
  setLocalStorageItem(STORE_JWT_TOKEN_KEY, token);
};

/**
 * 从本地 LocalStorage 中删除缓存的 token
 */
export const removeStoredAccessToken = (): void => {
  removeLocalStorageItem(STORE_JWT_TOKEN_KEY);
};
