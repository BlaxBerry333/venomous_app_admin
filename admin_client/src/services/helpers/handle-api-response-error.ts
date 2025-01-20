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

  const responseError = (response?.data as { error: string })?.error;

  // 是 axios 错误，但返回值数据结构中有自定义的属性时
  if (typeof response?.data === "object") {
    return {
      code: response.status,
      message: Object.values(response?.data!)[0],
    };
  }

  // 是 axios 错误，但返回值数据结构中没有自定义的 error 属性时
  if (!responseError) {
    return {
      code: response.status,
      message: error.message,
    };
  }

  return {
    code: response.status,
    message: responseError,
  };
}
