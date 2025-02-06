import type { AxiosError } from "axios";

/**
 * 解析 API 请求失败时的返回值，获取其中的错误信息
 */
export function getParsedAPIErrorResponse(error: AxiosError) {
  const response = error?.response;

  // 不是 axios 错误时
  if (!response) {
    return {
      code: 500,
      message: error.message,
    };
  }

  const errorResponseData = response?.data as {
    message?: string;
    code?: number;
    error?: string;
    data?: unknown;
  };

  if (!errorResponseData?.message) {
    return {
      code: response.status,
      message: errorResponseData.error || "Something went wrong",
    };
  }

  return errorResponseData;
}
