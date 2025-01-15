import { useMutation, useQuery } from "@tanstack/react-query";

import type { AxiosError } from "axios";
import { API_ENTRYPOINTS } from "../entry-points";
import {
  getStoredAccessToken,
  getStoredRefreshToken,
  removeStoredAccessToken,
  removeStoredRefreshToken,
  setAccessTokenAsStored,
  setRefreshTokenAsStored,
} from "../helpers/handle-stored-token";
import { SERVER_API_INSTANCE, SERVER_AUTH_INSTANCE } from "../instance";
import type {
  GetUserProfileResponse,
  PostUserLoginParameterType,
  PostUserLoginResponse,
  PostUserRefreshAccessTokenResponse,
  PostUserRegisterParameterType,
  PostUserRegisterResponse,
  PostVisitorLoginResponse,
} from "../types/users";

export function useUserRegister() {
  const url = API_ENTRYPOINTS.users.postUserRegister();

  const mutation = useMutation<PostUserRegisterResponse, AxiosError, PostUserRegisterParameterType>(
    {
      mutationKey: [url],
      mutationFn: async (data) => {
        const response = await SERVER_AUTH_INSTANCE.post(url, data);
        return response.data;
      },
      onSuccess: (response) => {
        const { access_token, refresh_token } = response;
        setAccessTokenAsStored(access_token);
        setRefreshTokenAsStored(refresh_token);
      },
    },
  );

  return { ...mutation };
}

export function useUserLogin() {
  const url = API_ENTRYPOINTS.users.postUserLogin();

  const mutation = useMutation<PostUserLoginResponse, AxiosError, PostUserLoginParameterType>({
    mutationKey: [url],
    mutationFn: async (data) => {
      const response = await SERVER_AUTH_INSTANCE.post(url, data);
      return response.data;
    },
    onSuccess: (response) => {
      const { access_token, refresh_token } = response;
      setAccessTokenAsStored(access_token);
      setRefreshTokenAsStored(refresh_token);
    },
  });

  return { ...mutation };
}

export function useUserLogout() {
  const url = API_ENTRYPOINTS.users.postUserLogout();

  const mutation = useMutation<unknown, AxiosError, void>({
    mutationKey: [url],
    mutationFn: async () => {
      const refreshToken = getStoredRefreshToken() || "";
      const accessToken = getStoredAccessToken() || "";

      await SERVER_API_INSTANCE.post(
        url,
        { refresh_token: refreshToken },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    onSettled: () => {
      removeStoredAccessToken();
      removeStoredRefreshToken();
    },
  });

  return { ...mutation };
}

export function useVisitorLogin() {
  const url = API_ENTRYPOINTS.users.postVisitorLogin();

  const mutation = useMutation<PostVisitorLoginResponse, AxiosError, void>({
    mutationKey: [url],
    mutationFn: async () => {
      const response = await SERVER_AUTH_INSTANCE.post(url);
      return response.data;
    },
    onSuccess: (response) => {
      const { access_token, refresh_token } = response;
      setAccessTokenAsStored(access_token);
      setRefreshTokenAsStored(refresh_token);
    },
  });

  return { ...mutation };
}

export async function getUserRefreshAccessToken(): Promise<PostUserRefreshAccessTokenResponse> {
  const url = API_ENTRYPOINTS.users.postUserRefreshAccessToken();
  const refreshToken = getStoredRefreshToken() || "";
  const response = await SERVER_AUTH_INSTANCE.post(url, { refresh_token: refreshToken });
  return response.data;
}

export function useGetUserProfile() {
  const url = API_ENTRYPOINTS.users.getUserProfile();

  const query = useQuery<GetUserProfileResponse, AxiosError>({
    queryKey: [url, "detail"],
    queryFn: async () => {
      const response = await SERVER_API_INSTANCE.get(url);
      return response.data;
    },
  });

  return { ...query };
}

export function useUpdateUserProfile() {
  const url = API_ENTRYPOINTS.users.patchUserProfile();

  const mutate = useMutation({
    mutationKey: [url, "patch"],
    mutationFn: async (data) => {
      const response = await SERVER_API_INSTANCE.patch(url, data);
      return response.data;
    },
  });

  return { ...mutate };
}
