import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import type {
  IAuthLoginParams,
  IAuthLoginResponse,
  IAuthSignupParams,
  IAuthSignupResponse,
} from "~/app/types/_auth";
import { getStoredAuthTokens, removeStoredAuthTokens } from "../_helpers";
import { AUTH_ENTRYPOINTS } from "../entrypoints/auth";
import { ADMIN_SERVER_AUTH_INSTANCE } from "../instances";

export async function getRefreshAccessToken() {
  const { refreshToken } = getStoredAuthTokens();
  if (!refreshToken) {
    throw new Error("[ERROR] No Refresh Token");
  }
  const url = AUTH_ENTRYPOINTS.refreshAccessToken.url;
  const response = await ADMIN_SERVER_AUTH_INSTANCE.post(url, { refresh_token: refreshToken });
  return response.data;
}

export function useAPIAuthSignup<T = IAuthSignupResponse, P = IAuthSignupParams>() {
  const url = AUTH_ENTRYPOINTS.signup.url;
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async (params) => {
      const { data } = await ADMIN_SERVER_AUTH_INSTANCE.post(url, params);
      return data;
    },
  });
}

export function useAPIAuthLogin<T = IAuthLoginResponse, P = IAuthLoginParams>() {
  const url = AUTH_ENTRYPOINTS.login.url;
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async (params) => {
      const { data } = await ADMIN_SERVER_AUTH_INSTANCE.post(url, params);
      return data;
    },
  });
}

export function useAPIAuthLogout() {
  const url = AUTH_ENTRYPOINTS.logout.url;

  const mutation = useMutation<void, AxiosError, void>({
    mutationKey: [url],
    mutationFn: async () => {
      await ADMIN_SERVER_AUTH_INSTANCE.post(url);
    },
    onSettled: () => {
      removeStoredAuthTokens();
    },
  });

  return { ...mutation };
}
