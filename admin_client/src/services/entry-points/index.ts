import { mapValues } from "lodash-es";
import type { ObjectKeyof, SupportedFileTypes } from "~/common/types/tools";

/**
 * API 接口地址
 */
export const API_ENTRYPOINTS = {
  // users ( DRF )
  // ----------------------------------------------------------------------------------------------------
  users: {
    // 创建
    postUserRegister: () => "/api/users/register/" as const,
    // 登陆
    postUserLogin: () => "/api/users/login/" as const,
    // 访客登陆
    postVisitorLogin: () => "/api/users/visitor/login/" as const,
    // 退出
    postUserLogout: () => "/api/users/logout/" as const,
    // 刷新
    postUserRefreshAccessToken: () => "/api/users/refresh-access-token/" as const,
    // 获取用户 ( 自己 ) 的信息
    getUserProfile: () => "/api/users/profile/" as const,
    // 更新用户 ( 自己 ) 的信息
    patchUserProfile: () => "/api/users/profile/" as const,
  },

  // workflow ( DRF )
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
    // 下载 workflow data 的 JSON 文件
    downloadWorkflowData: (id: string) => `/api/workflow/download/${id}/` as const,
    // 下载所有 workflow 的文件
    downloadAllWorkflowData: (fileType: SupportedFileTypes) =>
      `/api/workflow/download/?type=${fileType}` as const,
  },

  // notes ( BFF )
  // ----------------------------------------------------------------------------------------------------
  notes: {
    // 登陆 NoteApp 后台的接口
    postLoginAccount: () => "/api/notes/api/account/login" as const,
    // 获取指定种类的 Note 列表
    getNoteList: () => "/api/notes/api/note/list" as const,
    // 创建 Note 笔记
    postNoteDetail: () => "/api/notes/api/note/create" as const,
    // 获取 Note 笔记
    getNoteDetail: (id: string) => `/api/notes/api/note/${id}` as const,
    // 更新 Note 笔记
    putNoteDetail: (id: string) => `/api/notes/api/note/${id}` as const,
    // 删除 Note 笔记
    deleteDetail: (id: string) => `/api/notes/api/note/${id}` as const,
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
