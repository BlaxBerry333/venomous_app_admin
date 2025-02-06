import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "~/common/utils/handle-web-storage";

const STORE_JWT_TOKEN_KEY = "__ACCESS_TOKEN__" as const;
const STORE_REFRESH_TOKEN_KEY = "__REFRESH_TOKEN__" as const;

/**
 * 从本地 LocalStorage 获取缓存的 access token
 */
export const getStoredAccessToken = () => {
  return getLocalStorageItem<string>(STORE_JWT_TOKEN_KEY);
};

/**
 * 从本地 LocalStorage 获取缓存的 refresh token
 */
export const getStoredRefreshToken = () => {
  return getLocalStorageItem<string>(STORE_REFRESH_TOKEN_KEY);
};

/**
 * 将 access token 缓存到本地 LocalStorage
 */
export const setAccessTokenAsStored = (token: string): void => {
  setLocalStorageItem(STORE_JWT_TOKEN_KEY, token);
};

/**
 * 将 refresh token 缓存到本地 LocalStorage
 */
export const setRefreshTokenAsStored = (token: string): void => {
  setLocalStorageItem(STORE_REFRESH_TOKEN_KEY, token);
};

/**
 * 从本地 LocalStorage 中删除缓存的 access token
 */
export const removeStoredAccessToken = (): void => {
  removeLocalStorageItem(STORE_JWT_TOKEN_KEY);
};

/**
 * 从本地 LocalStorage 中删除缓存的 refresh token
 */
export const removeStoredRefreshToken = (): void => {
  removeLocalStorageItem(STORE_REFRESH_TOKEN_KEY);
};

// ----------------------------------------------------------------------------------------------------

const STORE_ADMIN_USER_DISPLAYNAME_KEY = "__ACCESS_TOKEN_OF_NOTEAPP__" as const;

/**
 * 从本地 LocalStorage 获取缓存的 access token
 */
export const getStoredAccessTokenOfNoteApp = () => {
  return getLocalStorageItem<string>(STORE_ADMIN_USER_DISPLAYNAME_KEY);
};

/**
 * 将 access token 缓存到本地 LocalStorage
 */
export const setAccessTokenAsStoredOfNoteApp = (token: string): void => {
  setLocalStorageItem(STORE_ADMIN_USER_DISPLAYNAME_KEY, token);
};

/**
 * 从本地 LocalStorage 中删除缓存的 access token
 */
export const removeStoredAccessTokenOfNoteApp = (): void => {
  removeLocalStorageItem(STORE_ADMIN_USER_DISPLAYNAME_KEY);
};
