import { mapValues } from "lodash-es";
import type { ObjectKeyof } from "~/common/types/tools";

/**
 * API 接口地址
 */
export const API_ENTRYPOINTS = {
  // auth
  // ----------------------------------------------------------------------------------------------------
  //   auth: {
  //     // 登陆
  //     postAuthSignIn: () => "/api/auth/signin" as const,
  //     // 创建
  //     postAuthSignUp: () => "/api/auth/signup" as const,
  //     // 退出
  //     patchAuthLogout: () => "/api/auth/logout" as const,
  //     // 获取登陆令牌 ( 用于刷新令牌 )
  //     getAuthAccessToken: (email: string) => `/api/auth/${email}/access-token` as const,
  //   },

  // account
  // ----------------------------------------------------------------------------------------------------
  //   account: {
  //     // 获取所有用户的列表 ( 仅限 SuperUser 权限 )
  //     getUserList: () => "/api/user/list" as const,
  //     // 获取用户信息
  //     getUserDetail: (email: string) => `/api/user/${email}` as const,
  //     // 删除用户
  //     deleteUser: (email: string) => `/api/user/${email}` as const,
  //   },

  // workflow
  // ----------------------------------------------------------------------------------------------------
  workflow: {
    // 获取所有 workflow data
    getWorkflowDataList: () => "/api/workflow/data/" as const,
    // 创建 workflow data
    postWorkflowData: () => "/api/workflow/data/" as const,
    // 获取 workflow data
    getWorkflowData: (id: string) => `/api/workflow/data/${id}/` as const,
    // 更新 workflow data
    patchWorkflowData: (id: string) => `/api/workflow/data/${id}/` as const,
    // 删除 workflow data
    deleteWorkflowData: (id: string) => `/api/workflow/data/${id}/` as const,
    // 获取所有 workflow history
    getWorkflowHistoryList: () => "/api/workflow/history/" as const,
    // 创建 workflow history
    postWorkflowHistory: () => "/api/workflow/history/" as const,
    // 获取 workflow history
    getWorkflowHistory: (id: string) => `/api/workflow/history/${id}/` as const,
    // 更新 workflow history
    patchWorkflowHistory: (id: string) => `/api/workflow/history/${id}/` as const,
    // 删除 workflow history
    deleteWorkflowHistory: (id: string) => `/api/workflow/history/${id}/` as const,
  },

  // notes
  // ----------------------------------------------------------------------------------------------------
  notes: {
    // 获取指定种类的 Note 列表
    getNoteList: () => "/bff/note/list" as const,
    // 创建 Note 笔记
    postNoteDetail: () => "/bff/note" as const,
    // 获取 Note 笔记
    getNoteDetail: (id: string) => `/bff/note/${id}` as const,
    // 更新 Note 笔记
    patchNoteDetail: (id: string) => `/bff/note/${id}` as const,
    // 删除 Note 笔记
    deleteDetail: (id: string) => `/bff/note/${id}` as const,
  },
} as const;

/**
 * API 接口名称
 */
export const API_ENTRYPOINTS_NAMES = mapValues(API_ENTRYPOINTS, (v) => {
  return mapValues(v, (_, methodName) => methodName) as { [key: string]: string };
}) as APIEndpointsNamesType;

type APIEndpointsNamesType = {
  [K in ObjectKeyof<typeof API_ENTRYPOINTS>]: ReturnTypeOfFunctions<(typeof API_ENTRYPOINTS)[K]>;
};

type ReturnTypeOfFunctions<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
};
