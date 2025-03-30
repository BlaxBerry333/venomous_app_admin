import {
  getSessionStorageItem,
  removeSessionStorageItem,
  setSessionStorageItem,
} from "~/utils/custom/storage";

const STORE_JWT_TOKEN_KEY = "__ACCESS_TOKEN__" as const;
const STORE_REFRESH_TOKEN_KEY = "__REFRESH_TOKEN__" as const;

type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

/**
 * 从本地 LocalStorage 获取缓存的 tokens
 */
export const getStoredAuthTokens = (): AuthTokens => {
  return {
    accessToken: getSessionStorageItem(STORE_JWT_TOKEN_KEY),
    refreshToken: getSessionStorageItem(STORE_REFRESH_TOKEN_KEY),
  };
};

/**
 * 将 tokens 缓存到本地 LocalStorage
 */
export const setAuthTokensAsStored = (tokens: AuthTokens): void => {
  setSessionStorageItem(STORE_JWT_TOKEN_KEY, tokens.accessToken);
  setSessionStorageItem(STORE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

/**
 * 从本地 LocalStorage 中删除缓存的 tokens
 */
export const removeStoredAuthTokens = (): void => {
  removeSessionStorageItem(STORE_JWT_TOKEN_KEY);
  removeSessionStorageItem(STORE_REFRESH_TOKEN_KEY);
};
